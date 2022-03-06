import {Request, Response} from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsContoller {
  public async create(request:Request, response:Response): Promise<Response>{
    try {
      const { email, password } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
      email,
      password
      });

      return response.json({user:instanceToInstance(user),token});
    } catch (err) {
      return response.status(400).json({ error: err.message});
    }
  }
}
