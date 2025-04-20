# LinkUp

## Real-Time Video Conferencing Application With WebRTC

**LinkUp** is a functional real-time video conferencing application that utilizes WebRTC technology, enabling peer-to-peer communication with features such as video, audio, and text chat.

## Features

- **Peer-to-Peer Video and Audio Communication**
  - Implemented real-time video and audio streaming between two or more users using WebRTC.
- **Text Chat Integration**
  - Included a chat window for users to exchange text messages alongside the video call.
- **Mute/Unmute and Camera Toggle**
  - Allows users to control their audio and video streams during the call.

## Technologies Used

- **WebRTC** - Real-time communication API for peer-to-peer audio, video, and data streaming.
- **JavaScript** - Used for client-side functionality.
- **Node.js & Express.js** - Backend server to handle signaling.
- **Socket.io** - WebSocket-based communication for signaling.
- **HTML & CSS** - UI design and layout.

## Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Steps to Run the Application

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/LinkUp.git
   cd LinkUp
   ```

2. **Install dependencies:**
   ```sh
   npm init
   npm install express socket.io
   
   ```

3. **Start the server:**
   ```sh
   npm start
   ```

4. **Open the application in your browser:**
   - Visit `http://localhost:3000`

## Usage

- Open the application in a browser.
- Share the unique meeting link with another user.
- Start a video call with real-time audio, video, and text chat features.

## Functionalities

🎥 Peer-to-peer Video Calling – Real-time video communication between users using WebRTC.

📝 Real-time Text Messaging – Send and receive instant messages during video calls.

🔴 Call Recording – Record ongoing video calls for later playback or storage.

🎛️ Media Controls – Mute/unmute microphone and enable/disable camera during calls.

🖥️ Screen Sharing – Share your screen with other participants in real time.

👥 Group Video Conferencing – Connect multiple users in a single video call with seamless switching and layout.

📁 File Sharing – Transfer files securely between participants during a call.
