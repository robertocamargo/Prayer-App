import { startOfHour } from "date-fns";
import {injectable, inject} from 'tsyringe';

import Prayer from "@modules/prayers/infra/typeorm/entities/Prayer";
import IPrayersRepository from '../repositories/IPrayersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id:string;
  prayer_description :string;
  date: Date;
}
@injectable()
class CreatePrayerService {
  constructor(
    @inject('PrayersRepository')
    private prayersRepository:IPrayersRepository,
    
    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
    ) 
    {}
 public async execute({user_id, prayer_description, date}: IRequest):Promise<Prayer> {

  const prayerDate = startOfHour(date);

  const prayer = await this.prayersRepository.create({
    user_id,
    prayer_description,
    date:prayerDate
  });

  await this.cacheProvider.invalidate(`prayers:${user_id}`);

  return prayer;
 }
}
export default CreatePrayerService;
