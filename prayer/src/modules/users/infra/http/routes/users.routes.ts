import { response, Router } from 'express';

import UsersControler from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';


import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersControler();
const userAvatarControler = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/',usersController.create);

usersRouter.patch('/avatar',ensureAuthenticated, upload.single('avatar'), userAvatarControler.update )

export default usersRouter;
