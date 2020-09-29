import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

import heroRouter from './routes/hero';

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const DBASE = process.env.DBASE;

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

app.use(cors());
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
  })
);

app.use('/hero', heroRouter);

mongoose.connect(`${DBASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => console.log(`app is listening on the port ${PORT}`));
