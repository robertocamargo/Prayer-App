import { Router } from 'express';
import prayersRouter from '@modules/prayers/infra/http/routes/prayers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import prayersprayedRouter from "@modules/prayers/infra/http/routes/prayersprayed.routes";

const routes = Router();

routes.use('/prayers',prayersRouter)
routes.use('/users',usersRouter)
routes.use('/sessions',sessionsRouter)
routes.use('/password',passwordRouter)
routes.use('/profile',profileRouter)
routes.use('/prayersprayed',prayersprayedRouter)

export default routes;
