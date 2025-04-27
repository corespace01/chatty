# Real-Time Chat Application

## Description

This project is a **real-time chat application** built with a Node.js backend, MongoDB database, and Socket.IO for real-time bi-directional communication. It allows users to register, log in securely, and exchange instant messages in a seamless, interactive environment. The app ensures that all messages are persisted in the database, maintaining both real-time delivery and historical access.

---

## Features

- **User Authentication**: Secure user registration and login using JWT tokens.
- **Real-Time Messaging**: Instant message sending and receiving using WebSocket (Socket.IO).
- **Message Persistence**: All sent and received messages are stored in MongoDB.
- **Socket Connection Handling**: Online users are tracked using socket IDs.
- **Secure Password Management**: Passwords are hashed before being stored.
- **API Endpoints**: REST APIs for user management and fetching past messages.
- **Error Handling**: Structured error responses and server-side validations.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, TailwindCSS, DaisyUI (Component Library), Axios (API Communication)
- **Real-Time Communication**: Socket.IO
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcrypt.js
- **Environment Management**: dotenv
- **Other Tools**: Postman (for API testing), Nodemon (for development)

---

## Installation and Setup

Follow these steps to set up the project locally:

1. Clone the repository
 ```
 git clone https://github.com/your-username/your-repo-name.git
 cd your-repo-name
 ```

2. Install Dependencies
  ```
  npm install
  ```

3. Run the application
  ```
  npm run dev
  ```

4. Access the application
  ```
  Open your browser and go to http://localhost:3000.
  ```

---

## Future Improvements

- **Group Chats**: Extend messaging functionality to support group conversations.
- **Typing Indicators**: Show real-time "User is typing..." indicators.
- **Admin Dashboard**: Manage users and monitor chats.
- **File Sharing**: Allow sharing images, documents, and media files.

---

## Contributions
Feel free to contribute to this project by submitting issues or pull requests.
