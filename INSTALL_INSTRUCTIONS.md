# Real-time Chat System Installation Instructions

To implement the real-time chat system, you need to install the WebSocket library and update the server.

## Step 1: Install WebSocket Library

Run the following command in your project directory:

```bash
npm install ws
```

## Step 2: Update server.js

Modify the server.js file to include the chat server functionality as shown in the updated_server.js file.

## Step 3: Restart the server

After making these changes, restart your server:

```bash
npm start
```

or for development:

```bash
npm run dev
```

## How the Real-time Chat Works

1. The chat system uses WebSocket technology for real-time communication
2. When a user opens the chat widget, it connects to the WebSocket server
3. Support agents can connect to the same server to receive and respond to user messages
4. Messages are sent in real-time between users and agents
5. The system handles multiple concurrent chats and queues messages when agents are busy