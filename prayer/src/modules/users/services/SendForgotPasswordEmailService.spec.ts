import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepostitory from '../repositories/fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepostitory: FakeUserTokensRepostitory;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepostitory = new FakeUserTokensRepostitory();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepostitory);
  });
  it('should be able to recover the password using the email', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'joao',
      email: 'joao@oi.com',
      password: '1234'
    });

    await sendForgotPasswordEmail.execute({
      email: 'joao@oi.com',
    });
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'joao@oi.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepostitory, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'joao',
      email: 'joao@oi.com',
      password: '1234'
    });

    await sendForgotPasswordEmail.execute({
      email: 'joao@oi.com',
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
