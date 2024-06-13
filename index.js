import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { APIs_V1 } from './src/routes/v1';
import errorHandler from './src/middlewares/errorHandlingMiddleWare';
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
app.use('/api/v1', APIs_V1);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
