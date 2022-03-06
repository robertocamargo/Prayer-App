import FakePrayersRepository from '../repositories/fakes/FakePrayersRepository';
import CreatePrayerService from "./CreatePrayerService";

import ListPrayersService from "./ListPrayersService";

import AppError from '@shared/errors/AppError';
let fakePrayersRepository: FakePrayersRepository;
let listPrayersService: ListPrayersService;
let createPrayer: CreatePrayerService;

describe('ListPrayers', () => {
  beforeEach(() => {
    fakePrayersRepository = new FakePrayersRepository();
    createPrayer = new CreatePrayerService(fakePrayersRepository);
    listPrayersService = new ListPrayersService(fakePrayersRepository);


  });
  it('should be able to list the prayers', async () => {
    const prayer1 = await createPrayer.execute({
      date: new Date(),
      user_id: '12344',
      prayer_description: 'Orar por fulano 1',
    });
    const prayer2 = await createPrayer.execute({
      date: new Date(),
      user_id: '12345',
      prayer_description: 'Orar por fulano 2 ',
    });
    const prayer3 = await createPrayer.execute({
      date: new Date(),
      user_id: '12344',
      prayer_description: 'Orar por fulano 3',
    });
    const prayers = await listPrayersService.execute({
      user_id:'12344',
    });
    expect(prayers).toEqual([prayer2]);
    //expect(prayers).toContain([prayer2]);
  });

});
