import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import route from './src/routes';
import * as db from './src/configs/connectDB';
dotenv.config();

db.connect();

const app = express();
const port = process.env.PORT;
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(authorizationJWT);
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
