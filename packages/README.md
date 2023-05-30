Folder Structure Plan
```bash
next-mern-chat
├── packages
│   ├── client
│   │    ├── app
│   │    │   ├── config
│   │    │   │    ├── default.ts // Modify this file to add the base URL for axios requests
│   │    │   │    └── events.ts
│   │    │   ├── containers
│   │    │   │     ├── Messages.tsx // Modify this file to use axios to fetch and send messages
│   │    │   │     ├── Rooms.tsx // Modify this file to use axios to fetch and create rooms
│   │    │   │     └── Sender.tsx // Modify this file to use axios to create users
│   │    │   ├── context
│   │    │   │     └── socket.context.tsx
│   │    │   ├── favicon.ico
│   │    │   ├── globals.css
│   │    │   ├── layout.tsx
│   │    │   └── page.tsx
│   │    ├── .eslintrc.json
│   │    ├── .gitignore
│   │    ├── README.md
│   │    ├── next.config.js
│   │    ├── package-lock.json
│   │    ├── package.json // Modify this file to install axios as a dependency
│   │    ├── postcss.config.js
│   │    ├── tailwind.config.js
│   │    └── tsconfig.json
│   └── server
│        ├── config
|        |    └── default.ts // Modify this file to read the connection string from the .env file
|        ├── models
|        |    ├── message.model.ts
|        |    ├── room.model.ts
|        |    └── user.model.ts
|        ├── services
|        |    ├── message.service.ts
|        |    ├── room.service.ts
|        |    └── user.service.ts
|        ├── src
|        |    ├── controllers // Add this folder to store the functions for handling HTTP requests and responses using Express
|        |    |     ├── message.controller.ts // Add this file to define the functions for message routes
|        |    |     ├── room.controller.ts // Add this file to define the functions for room routes
|        |    |     └── user.controller.ts // Add this file to define the functions for user routes
|        |    ├── routes // Add this folder to store the Express routers for different endpoints
|        |    |    ├── message.route.ts // Add this file to define the endpoints for message data
|        |    |    ├── room.route.ts // Add this file to define the endpoints for room data
|        |    |    └── user.route.ts // Add this file to define the endpoints for user data
|        |    ├── utils
|        |    |    └── logger.ts
|        |    ├── app.ts // Modify this file to use the routers and handle errors
|        |    └── socket.ts // Modify this file to use the models and services for MongoDB data and handle timer logic
|        ├── .env // Add this file to store the environment variables such as connection string and port number
|        ├── .gitignore // Modify this file to ignore the .env file from version control
|        ├── nodemon.json
|        ├── package-lock.json
|        ├── package.json // Modify this file to install mongoose, cors, json parse, dotenv, and types as dependencies or devDependencies
|        └── tsconfig.json
├── .gitignore
├── README.md
├── lerna.json
├── package-lock.json
└── package.json
```
