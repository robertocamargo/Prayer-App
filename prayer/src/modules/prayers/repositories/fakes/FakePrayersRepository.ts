
import Prayer from "../../infra/typeorm/entities/Prayer";
import ICreatePrayerDTO from '@modules/prayers/dtos/ICreatePrayerDTO';
import IFindPrayersDTO from '@modules/prayers/dtos/IFindPrayersDTO';
import { v4 as uuid_v4 } from "uuid";

import IPrayersRepository from "@modules/prayers/repositories/IPrayersRepository";


class PrayersRepository implements IPrayersRepository {
  private prayers: Prayer[] = [];

  public async create({ user_id, prayer_description, date }: ICreatePrayerDTO): Promise<Prayer> {
    const prayer = new Prayer();
    // ou Object.assign(prayer,{id:uuid(),date,user_id});
    // ou as 3 linhas abaixo
    prayer.id = uuid_v4();
    prayer.date = date;
    prayer.prayer_description = prayer_description;
    prayer.user_id = user_id;
    this.prayers.push(prayer);
    return prayer;

  }
  public async findAllPrayers({except_user_id}:IFindPrayersDTO): Promise<Prayer[]>{
    let prayers = this.prayers;
    if(except_user_id){
      prayers = this.prayers.filter(prayer => prayer.user_id !== except_user_id);
    }
    return prayers;
  }
}
export default PrayersRepository;
