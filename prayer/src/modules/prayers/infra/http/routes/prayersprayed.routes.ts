import { request, response, Router } from 'express';
import CreatePrayersPrayed from '@modules/prayers/services/CreatePrayersPrayed';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
const prayersprayedRouter = Router();

prayersprayedRouter.use(ensureAuthenticated);

prayersprayedRouter.post('/',async(request,response) =>{

  try{
    const {user_id, prayer_id} = request.body;

    const createPrayesPrayed = new CreatePrayersPrayed();

    const result = await createPrayesPrayed.execute({
      user_id,
      prayer_id
    })

    return response.send();
  }catch (err){
    return response.status(400).json({error:err.message})
  }
})
export default prayersprayedRouter;
