import { getRepository } from 'typeorm';
import PrayersPrayed from '../infra/typeorm/entities/PrayersPrayed';
interface Request{
  user_id: string;
  prayer_id:string;
}

class CreatePrayersPrayed{
  public async execute({user_id, prayer_id}:Request): Promise<void>{
    const prayersPrayedRepository = getRepository(PrayersPrayed);
    const checkPrayersPrayedExists = await prayersPrayedRepository.findOne({
      where:{ user_id,prayer_id}
    });


    if(!checkPrayersPrayedExists){
     let createPPed = prayersPrayedRepository.create({
        user_id,
        prayer_id
      });
      await prayersPrayedRepository.save(createPPed);

    }else{
      prayersPrayedRepository.delete({
        user_id,
        prayer_id
      });
      //await prayersPrayedRepository.
    }

  }
}

export default CreatePrayersPrayed;
