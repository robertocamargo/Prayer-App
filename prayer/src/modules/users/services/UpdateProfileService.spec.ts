import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from "./UpdateProfileService";

import AppError from '@shared/errors/AppError';
let fakeUsersRepository:FakeUsersRepository;
let fakeHashProvider:FakeHashProvider;
let updateProfile:UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository,fakeHashProvider);

  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name:'João',
      email:'joao@oi.com',
      password:'123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id:user.id,
      name:'João 2',
      email:'joao2@oi.com',
    });
    expect(updatedUser.name).toBe('João 2');
    expect(updatedUser.email).toBe('joao2@oi.com');
  });

  it('should not be able to update an non-existing user', async () => {
    expect(updateProfile.execute({
      user_id:'...',
      name:'Test',
      email:'test@oi.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an existing email address', async () => {
    await fakeUsersRepository.create({
      name:'João',
      email:'joao@oi.com',
      password:'123456',
    });
   const user =  await fakeUsersRepository.create({
      name:'João',
      email:'joao2@oi.com',
      password:'123456',
    });

    await expect(updateProfile.execute({
      user_id:user.id,
      name:'João 2',
      email:'joao@oi.com',
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name:'João',
      email:'joao@oi.com',
      password:'123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id:user.id,
      name:'João 2',
      email:'joao2@oi.com',
      old_password:'123456',
      password:'1231234',
    });
    expect(updatedUser.password).toBe('1231234');
  });
  it('should not be able to update the password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      name:'João',
      email:'joao@oi.com',
      password:'123456',
    });

    expect(updateProfile.execute({
      user_id:user.id,
      name:'João 2',
      email:'joao2@oi.com',
      old_password:'123456',
      password:'123123',
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password without correct old_password', async () => {
    const user = await fakeUsersRepository.create({
      name:'João',
      email:'joao@oi.com',
      password:'123456',
    });

    expect(updateProfile.execute({
      user_id:user.id,
      name:'João 2',
      email:'joao2@oi.com',
      password:'123123',
      old_password:'1',
    })).rejects.toBeInstanceOf(AppError);
  });
});
