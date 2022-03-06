import { startOfHour } from "date-fns";
import {injectable, inject} from 'tsyringe';

import Prayer from "@modules/prayers/infra/typeorm/entities/Prayer";
import IPrayersRepository from '@modules/prayers/repositories/IPrayersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id:string;
}
@injectable()
class ListPrayerservice {
  constructor(
    @inject('PrayersRepository')
    private prayersRepository:IPrayersRepository,

    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
    )
    {}

 public async execute({user_id}: IRequest):Promise<Prayer[]> {
  let prayer = null;
   //let prayer = await this.cacheProvider.recover<Prayer[]>(`prayers:${user_id}`);

   if(!prayer){
    prayer = await this.prayersRepository.findAllPrayers({
      except_user_id:user_id,
    });

    //await this.cacheProvider.save(`prayers:${user_id}`,prayer);
   }


  return prayer;
 }
}
export default ListPrayerservice;
