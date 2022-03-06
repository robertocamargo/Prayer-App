import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepostitory from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashprovider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from "./ResetPasswordService";
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepostitory: FakeUserTokensRepostitory;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashprovider;
describe('RessetPasswordService', () => {
  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepostitory = new FakeUserTokensRepostitory();
    fakeHashProvider = new FakeHashprovider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepostitory,
      fakeHashProvider);
  });
  it('should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'joao',
      email: 'joao@oi.com',
      password: '1234'
    });

    const userToken = await fakeUserTokensRepostitory.generate(user.id);

    const genereteHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token: userToken.token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(genereteHash).toBeCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });
  it('shoud not be able to reset the password with non-existing token', async () => {
    await expect(resetPassword.execute({
      token: 'teste',
      password: '111',
    })).rejects.toBeInstanceOf(AppError);
  });
  it('shoud not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepostitory.generate('non-existing-user');

    await expect(resetPassword.execute({
      token: token,
      password: '111',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to reset the password if passed more than 2 hours', async () => {

    const user = await fakeUsersRepository.create({
      name: 'joao',
      email: 'joao@oi.com',
      password: '1234'
    });

    const { token } = await fakeUserTokensRepostitory.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    })

    await expect(resetPassword.execute({
      password: '123123',
      token: token,
    })).rejects.toBeInstanceOf(AppError);

  });
});
