import { getRepository, Repository, Not } from 'typeorm';
import Prayer from "../entities/Prayer";
import ICreatePrayerDTO from '@modules/prayers/dtos/ICreatePrayerDTO';
import IFindPrayersDTO from '@modules/prayers/dtos/IFindPrayersDTO';
import IPrayersRepository from "@modules/prayers/repositories/IPrayersRepository";


class PrayersRepository implements IPrayersRepository {
  private ormRepository: Repository<Prayer>;
  constructor() {
    this.ormRepository = getRepository(Prayer);
  }
  public async create({ user_id, prayer_description, date }: ICreatePrayerDTO): Promise<Prayer> {
    const prayer = this.ormRepository.create({ user_id, prayer_description, date });
    await this.ormRepository.save(prayer);
    return prayer;
  }
  public async findAllPrayers({except_user_id}: IFindPrayersDTO): Promise<Prayer[]> {
    let prayers: Prayer[];

    if (except_user_id) {
      prayers = await this.ormRepository.find({
        where: {
          user_id: Not(except_user_id),
        },
        order:{
          date:'ASC'
        }
      })
    } else {
      prayers = await this.ormRepository.find();
    }

    return prayers;
  }
}
export default PrayersRepository;
