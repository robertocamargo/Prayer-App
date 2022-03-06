import FakePrayersRepository from '../repositories/fakes/FakePrayersRepository';
import CreatePrayerService from "./CreatePrayerService";
let fakePrayersRepository: FakePrayersRepository;
let createPrayer: CreatePrayerService;

describe('CreatePrayer', () => {
  beforeEach(()=>{
    fakePrayersRepository = new FakePrayersRepository();
    createPrayer = new CreatePrayerService(fakePrayersRepository);
  });
  it('should be able to create a new prayer', async () => {

    const prayer = await createPrayer.execute({
      date: new Date(),
      user_id: '12344',
      prayer_description: 'Orar por fulano',
    });
    expect(prayer).toHaveProperty('id');
  });
});
