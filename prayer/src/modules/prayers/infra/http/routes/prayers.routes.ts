import { response, Router } from 'express';
import Prayer from '@modules/prayers/infra/typeorm/entities/Prayer';
import PrayersController from '../controllers/PrayersController';


import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const prayersRouter = Router();
const prayersController = new PrayersController();

prayersRouter.use(ensureAuthenticated);

prayersRouter.post('/',prayersController.create);
prayersRouter.get('/',prayersController.index);

export default prayersRouter;
