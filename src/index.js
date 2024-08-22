import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { APIs_V1 } from './routes/v1/index';
import errorHandler from './middlewares/errorHandlingMiddleWare';
import * as db from './configs/connectDB';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as redis from '~/configs/connectRD';

dotenv.config();

redis.connectRedis();
db.connect();

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    origin: process.env.WEBSOCKET_URL,
    transports: ['websocket'],
});

app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use('/api/v1', APIs_V1);

app.use(errorHandler);

httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
