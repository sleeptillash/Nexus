# Real-Time Chat Application

## Overview

This is a real-time chat application built with React and Socket.io. The app allows users to engage in real-time conversations with features such as group chats, notifications, and more.
<br><br/>



https://github.com/user-attachments/assets/6c7c3147-dba7-48d8-91d4-6448cfeb70a2



## Features
- **Real-time Messaging**: Instant messaging using Socket.io.
- **User Authentication**: Secure user login and registration.
- **Group Chats**: Create and manage group conversations.
- **Notifications**: Real-time notifications for new messages.
- **Responsive Design**: Fully responsive layout.
- **RESTful API**: Backend communication with Axios.

## Technologies Used
- **Frontend**:
  - [React](https://reactjs.org/)
  - [Axios](https://axios-http.com/)
  - [Socket.io](https://socket.io/)

- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MongoDB Atlas](https://www.mongodb.com/atlas)
  - [Socket.io](https://socket.io/)

## Steps To Recreate

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   
2. Install dependencies: (run in root folder) 
   ```bash
   npm run build
   
3. Create a .env file in the root directory and add the following variables:
   PORT=5000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret

5. run the server:
   ```bash
   cd backend
   npm start

   cd frontend
   npm start
   
6. Usage:
    - Register a new account or login with an existing account.
    - Start a new chat or join an existing group chat.
    - Enjoy real-time messaging with notifications.


