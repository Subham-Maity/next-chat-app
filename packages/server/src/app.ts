import config from "config";
import configs from '../config/default';
import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import {version} from "../package.json";
import logger from "./utils/logger";
import socket from "./socket";
import mongoose from 'mongoose';
import cors from 'cors';
import messageRouter from '../../server/src/routes/message.route';
import roomRouter from '../../server/src/routes/room.route';
import userRouter from '../../server/src/routes/user.route';



const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express()
app.use(cors());
app.use(express.json());
app.use(messageRouter);
app.use(roomRouter);
app.use(userRouter);

mongoose.connect(configs.db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    },
});

app.get("/", (_, res) => {
    res.send(`Server is up and running version:${version} 🚀`);
});

httpServer.listen(port, host, () => {
    logger.info(
        `🚀 Server version:${version} is listening on ${host}:${port} 🚀`
    );
    logger.info(`http://${host}:${port}`);

    socket({io});
});
