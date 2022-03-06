import Prayer from '../infra/typeorm/entities/Prayer';
import ICreatePrayerDTO from '../dtos/ICreatePrayerDTO';
import IFindPrayersDTO from '../dtos/IFindPrayersDTO';

export default interface IPrayersRepository {
  create(data: ICreatePrayerDTO): Promise<Prayer>;
  findAllPrayers(data:IFindPrayersDTO): Promise<Prayer[]>;
}
