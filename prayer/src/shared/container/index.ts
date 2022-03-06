import {container} from 'tsyringe';
import '@modules/users/providers';
import './providers/StorageProvider/index';
import './providers/CacheProvider';

import IPrayersRepository from '@modules/prayers/repositories/IPrayersRepository'
import PrayersRepository from '@modules/prayers/infra/typeorm/repositories/PrayersRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<IPrayersRepository>('PrayersRepository',PrayersRepository);
container.registerSingleton<IUsersRepository>('UsersRepository',UsersRepository);

container.registerSingleton<IUserTokensRepository>('UserTokenRepository',UserTokenRepository,
);
