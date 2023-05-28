# NextJS ChatApp 🗣️

This is a chat application built with `NextJS`, `Socket.io`, and `Typescript`. It allows users to create and join chat rooms, send messages, and set timers for conversations. It has a user-friendly and good-looking UI that enhances the chat experience. This project is an improved version of my previous `Demo chat app with basic timer functionality using html and nodejs`, which you can check out [**here**](https://github.com/Subham-Maity/basic-chatapp). I used `Typescript` to make the code more readable, understandable, and easy to implement new features in the future.


![5](https://github.com/Subham-Maity/next-mern-chat/assets/97989643/fbf7c8cd-a902-48b4-a532-415d357049b4)
![7](https://github.com/Subham-Maity/next-mern-chat/assets/97989643/bba4aab9-3a58-4481-a78c-b940ccad1757)


---
## How to run the project locally 📝

To run chat-app on your local machine, you need to have [Node.js](https://nodejs.org/en/) installed. Node.js is a JavaScript runtime that allows you to run JavaScript code on the server side.

You also need to install the dependencies for both the backend and the frontend servers. You can use either `npm` or `yarn` as your package manager.

First, clone this repository to your local machine:

```bash
git clone https://github.com/Subham-Maity/next-mern-chat.git
```

Then, navigate to the root folder and run the following command:

```bash
npm run dev

# or

yarn dev
```

This will install the dependencies and start both the servers in parallel using `concurrently`.

The backend server will run on port 5002 by default. You can change this in the `backend/config/default.ts` file.

The frontend server will run on port 3000 by default. You can change this in the `frontend/config/default.ts` file.

That's it! You can now open your browser and go to `http://localhost:3000` to see chat-app in action. 🎉

### Alternatively, 

   you can also run the servers separately by following these steps:

- Navigate to the backend folder and install the dependencies:

```bash
cd backend
npm install

# or

yarn install
```

- Start the backend server:

```bash
npm run dev

# or

yarn dev
```

- Open another terminal window and navigate to the frontend folder. Install the dependencies and start the frontend server:
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






https://github.com/Subham-Maity/next-mern-chat/assets/97989643/abb58584-e819-4976-8ca8-a57396807cdd




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


The chat application uses Socket.io to communicate between the frontend and the backend using events. Events are messages that are emitted or received by the server or the client. Here are some of the events that are used in this application:

#### `connection` 🔗

This event is emitted by the server when a new client connects to it. It also sets up listeners for other events from the client.

#### `CLIENT.CREATE_ROOM` 🏠

This event is emitted by the client when it wants to create a new room. The server will create the room and emit a `SERVER.ROOMS` event with the updated list of rooms.

##### Payload 📦

```typescript
{
  roomName: string;
}
```

#### `CLIENT.JOIN_ROOM` 🔗

This event is emitted by the client when it wants to join an existing room. The server will add the client to the room and emit a `SERVER.JOINED_ROOM` event with the room details.

##### Payload 📦

```typescript
{
  roomId: string;
}
```

#### `CLIENT.SEND_ROOM_MESSAGE` 💬

This event is emitted by the client when it wants to send a new message to a room. The server will broadcast the message to all clients in the room and emit a `SERVER.ROOM_MESSAGE` event with the message details.

##### Payload 📦

```typescript
{
  time: string;
  roomId: string;
  message: string;
}
```

#### `CLIENT.SET_TIMER` ⏰

This event is emitted by the client when it wants to set a timer for a room. The server will start a countdown and emit a `SERVER.TIMER_SET` event with the timer details.

##### Payload 📦

```typescript
{
  time: number;
}
```

#### `CLIENT.REQUEST_TIMER` ⏰

This event is emitted by the client when it wants to request the current timer for a room. The server will emit a `SERVER.TIMER_UPDATE` event with the timer details.

##### Payload 📦

```typescript
{
  roomId: string;
}
```

#### `disconnect` ❌

This event is emitted by the client when it disconnects from the server. The server will remove the client from any rooms and emit a `SERVER.CONVERSATION_ENDED` event if the room becomes empty.

##### Payload 📦

```typescript
{
  roomId: string;
}
```

#### `SERVER.ROOMS` 🏠

This event is emitted by the server when there is a change in the list of rooms. It sends an array of rooms with their names and ids.

##### Payload 📦

```typescript
[
  {
    id: string;
    name: string;
  },
  ...
]
```

#### `SERVER.JOINED_ROOM` 🔗

This event is emitted by the server when a client joins a room. It sends an object with the room id, name, and an array of messages.

##### Payload 📦

```typescript
{
  id: string;
  name: string;
  messages: [
    {
      time: string;
      message: string;
    },
    ...
  ]
}
```

#### `SERVER.ROOM_MESSAGE` 💬

This event is emitted by the server when a new message is sent to a room. It sends an object with the room id, time, and message.

##### Payload 📦

```typescript
{
  roomId: string;
  time: string;
  message: string;
}
```

#### `SERVER.TIMER_SET` ⏰

This event is emitted by the server when a timer is set for a room. It sends an object with the room id and time.

##### Payload 📦

```typescript
{
  roomId: string;
  time: number;
}
```

#### `SERVER.TIMER_UPDATE` ⏰

This event is emitted by the server when there is an update on the timer for a room. It sends an object with the room id and time.

##### Payload 📦

```typescript
{
  roomId: string;
  time: number;
}
```

#### `SERVER.CONVERSATION_ENDED` ❌

This event is emitted by the server when a conversation ends in a room. It sends an object with the room id.

##### Payload 📦

```typescript
{
  roomId: string;
}
```



---

## How to Contribute 💪

If you like chat-app and want to contribute to its development, you are more than welcome! Here are some ways you can help:

- Report any bugs or issues you find on the [issues page](https://github.com/Subham-Maity/next-mern-chat/issues).
- Suggest new features or improvements on the [issues page](https://github.com/Subham-Maity/next-mern-chat/issues).
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

### Give a Star ⭐

If you like chat-app and find it useful, please consider giving it a star on GitHub. It would mean a lot to me and motivate me to keep working on it. Thank you! 😊
