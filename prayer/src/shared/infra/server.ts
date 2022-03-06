import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import cors from 'cors';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';


import '@shared/infra/typeorm';
import '@shared/container';
import { celebrate } from 'celebrate';
import rateLimiter from './http/middlewares/rateLimiter';

const app = express();
app.use(cors({
  //origin:'http://localhost:3333',
}));
app.use(rateLimiter);
//app.use(celebrate);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);


app.listen(3333, () => {
  console.log(' Server Running on port 3333');
})
