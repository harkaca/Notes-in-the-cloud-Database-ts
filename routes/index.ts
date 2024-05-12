import { Application, Router } from 'express';

import userController from './usercontroller';
import noteController from './notecontroller';

const router = Router();

export const connect = (app: Application, path: string): void => {
    router.use('/users', userController);
    router.use('/notes', noteController);

    app.use(path, router);
}