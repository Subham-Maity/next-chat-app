# NextJS ChatApp 🗣️

Chat-app is a **realtime chat application** that lets you talk to anyone in the world. Create and join chat rooms, send messages, and have fun. All you need is a web browser and an internet connection. How cool is that? 😎

This readme file will guide you through chat-app, the technologies behind it, and how you can help make it better. Let's get started!

---

## Getting Started 🚀

To run chat-app on your local machine, you need to have [Node.js](https://nodejs.org/en/) installed. Node.js is a JavaScript runtime that allows you to run JavaScript code on the server side.

You also need to install the dependencies for both the backend and the frontend servers. You can use either `npm` or `yarn` as your package manager.

First, clone this repository to your local machine:

```bash
git clone https://github.com/Subham-Maity/next-mern-chat.git
```

Then, navigate to the backend folder and install the dependencies:

```bash
cd backend
npm install

# or

yarn install
```

Next, start the backend server:

```bash
npm run dev

# or

yarn dev
```

The backend server will run on port 5002 by default. You can change this in the `backend/config/default.ts` file.

Now, open another terminal window and navigate to the frontend folder. Install the dependencies and start the frontend server:
> Make sure server should be running on port 5002 before starting frontend server

```bash
cd frontend
npm install

# or

yarn install

npm run dev

# or

yarn dev
```

The frontend server will run on port 3000 by default. You can change this in the `fontend/config/default.ts` file.

That's it! You can now open your browser and go to `http://localhost:3000` to see chat-app in action. 🎉

---

## Built With 🛠️

Chat-app is built with some of the most popular and powerful technologies in web development. Here are some of them:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [Socket.io](https://socket.io/) - Realtime application framework
- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale

These technologies allow me to create a fast, scalable, and user-friendly chat application that works across different devices and browsers.

---

## Backend 🧠

The backend server is responsible for handling the socket connections and emitting events to the frontend. It is built using Node.js, Express, and Socket.io.

### [Events](./frontend/config/events.ts) ⚡

The backend server uses Socket.io to communicate with the frontend using events. Here are some of the events that are used in chat-app:

#### `join` 🔗

Emitted when a user joins a room.

##### Payload 📦

```typescript
{
 roomId: string;
}
```

#### `send message` 💬

Emitted when a user sends a new message.

##### Payload 📦

```typescript
{
 time: string;
 roomId: string;
 message: string;
}
```

#### `create new room` 🏠

Emitted when a user creates a new room.

##### Payload 📦

```typescript
{
 roomName: string;
}
```
---

## How to Contribute 💪

If you like chat-app and want to contribute to its development, you are more than welcome! Here are some ways you can help:

- Report any bugs or issues you find on the [issues page](https://github.com/Subham-Maity/next-mern-chat.git/issues).
- Suggest new features or improvements on the [issues page](https://github.com/Subham-Maity/next-mern-chat.git/issues).
- Fork this repository and submit pull requests with your code changes.
- Share chat-app with your friends and spread the word.

Any feedback or support is greatly appreciated. Thank you for your interest in chat-app! ❤️

---

## Learn More 📚

If you want to learn more about the technologies I used to build chat-app, here are some useful resources:

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express Documentation](https://expressjs.com/en/4x/api.html)
- [Socket.io Documentation](https://socket.io/docs/v4)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

You can also check out some of my other projects on my [GitHub profile](https://github.com/Subham-Maity).

---

## Give a Star ⭐

If you like chat-app and find it useful, please consider giving it a star on GitHub. It would mean a lot to me and motivate me to keep working on it. Thank you! 😊
