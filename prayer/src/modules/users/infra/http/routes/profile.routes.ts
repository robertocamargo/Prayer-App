import { response, Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/',profileController.show);
profileRouter.put('/',profileController.update);


export default profileRouter;
