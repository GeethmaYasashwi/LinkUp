const express = require("express");
const path = require("path");
var app = express();

var server=app.listen(3000,function(){
    console.log("Listening on port 3000");
});
const fs = require('fs');
const fileUpload = require("express-fileupload");
const io= require("socket.io")(server);

app.use(express.static(path.join(__dirname,"")));

var userConnections =[];

io.on("connection",(socket)=>{
    console.log("socket id is ",socket.id);
    socket.on("userconnect",(data)=>{
        console.log("userconnect",data.displayName,data.meetingid)
        var other_users=userConnections.filter(
            (p) => p.meeting_id==data.meetingid
        );
        userConnections.push({
            connectionId:socket.id,
            user_id:data.displayName,
            meeting_id:data.meetingid,

        });

        var userCount=userConnections.length;
        console.log(userCount);

        other_users.forEach((v)=>{
            socket.to(v.connectionId).emit("inform_others_about_me",{
                other_user_id:data.displayName,
                connId:socket.id,
                userNumber:userCount,
            })
        })
        socket.emit("inform_me_about_other_users",other_users);
    });
    socket.on("SDPProcess",(data)=>{
        socket.to(data.to_connid).emit("SDPProcess",{
            message:data.message,
            from_connid:socket.id,
        })
    })
    //messaging
    socket.on("sendMessage",(msg)=>{
        console.log(msg);
        var mUser = userConnections.find((p)=>p.connectionId==socket.id);
        if(mUser){
            var meetingid = mUser.meeting_id;
            var from = mUser.user_id;
            var list = userConnections.filter((p)=>p.meeting_id == meetingid);
            list.forEach((v)=>{
                socket.to(v.connectionId).emit("showChatMessage",{
                    from:from,
                    message:msg,
                });
            });
        }
    });

    //file transfer
    socket.on("fileTransferToOther",(msg)=>{
        console.log(msg);
        var mUser = userConnections.find((p)=>p.connectionId==socket.id);
        if(mUser){
            var meetingid = mUser.meeting_id;
            var from = mUser.user_id;
            var list = userConnections.filter((p)=>p.meeting_id == meetingid);
            list.forEach((v)=>{
                socket.to(v.connectionId).emit("showFileMessage",{
                    username:msg.user_id,
                    meetingid:msg.meeting_id,
                    filePath:msg.attachFilePath,
                    fileName:msg.attachFileName,
                });
            });
        }
    });
    

    //Dosconnect user
    socket.on("disconnect",function(){
        console.log("User got disconnected");
        var disUser = userConnections.find((p) => p.connectionId == socket.id);
        if(disUser){
            var meetingid = disUser.meeting_id;
            userConnections=userConnections.filter((p)=>p.connectionId != socket.id);
            var list = userConnections.filter((p)=>p.meeting_id==meetingid)
            list.forEach((v)=>{
                var userNumberAfUserLeave=userConnections.length;
                socket.to(v.connectionId).emit("inform_others_about_disconnected_user",{
                    connId: socket.id,
                    uNumber:userNumberAfUserLeave
                });
            });
        }
    });
});
app.use(fileUpload());
app.post("/attachimg",function(req,res){
    var data = req.body;
    var imageFile= req.files.zipfile;
    console.log(imageFile);
    var dir="public/attachment/"+data.meeting_id+"/";
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    imageFile.mv("public/attachment/" + data.meeting_id + "/" + imageFile.name,

    function(error){
        if (error) {
            console.log("Couldn't upload the image file");
            console.log(error);
        } else {
            console.log("Image file succesfully uploaded.");
        }
    })
})
