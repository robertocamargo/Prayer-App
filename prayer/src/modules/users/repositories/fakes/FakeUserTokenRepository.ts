import { v4 as uuid_v4 } from "uuid";
import UserToken from '../../infra/typeorm/entities/UserToken';

import IUserTokenRepository from "@modules/users/repositories/IUserTokensRepository";
import { uuid } from "uuidv4";


class FakeUserTokensRepostitory implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.userTokens.push(userToken);

    return userToken;
  }
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(findToken => findToken.token === token);
    return userToken;
  }
}
export default FakeUserTokensRepostitory;
