import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

import IMailProvider from '../MailProvider/models/IMailProvider';
import EtherealMailProvider from '../MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from '../MailTemplateProviders/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '../MailTemplateProviders/implementations/HandlebarsMailTemplateProvider';


container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);
container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider),);

