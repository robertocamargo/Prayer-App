import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from "./ShowProfileService";

import AppError from '@shared/errors/AppError';
let fakeUsersRepository:FakeUsersRepository;
let showProfile:ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);

  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name:'João',
      email:'joao@oi.com',
      password:'123456',
    });

    const profile = await showProfile.execute({
      user_id:user.id,
    });
    expect(profile.name).toBe('João');
    expect(profile.email).toBe('joao@oi.com');

  });

  it('should not be able to show an non-existing user', async () => {
    expect(showProfile.execute({
      user_id:'...',
    })).rejects.toBeInstanceOf(AppError);
  });
});
