import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';

import { connect as connectAPI } from './routes';

dotenv.config();

const app = express();

app.use(express.json());

connectAPI(app, '/api');

app.listen(process.env.PORT, async () => {
    await connect(process.env.DB_CONNECTION_STRING as string)

    console.log('The server and dataabse are connected.')
});

