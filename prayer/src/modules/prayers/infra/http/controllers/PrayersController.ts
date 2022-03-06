import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreatePrayerService from '@modules/prayers/services/CreatePrayerService';
import ListPrayersService from '@modules/prayers/services/ListPrayersService';
import Prayer from '../../typeorm/entities/Prayer';
import { instanceToInstance } from 'class-transformer';
export default class PrayersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id, prayer_description, date } = request.body;

      const parsedDate = parseISO(date);
      const prayersRepository = await getCustomRepository(PrayersRepository);

      const createPrayer = container.resolve(CreatePrayerService);

      const prayer = await createPrayer.execute({ user_id, prayer_description, date: parsedDate });

      return response.json(prayer);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

  }
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listPrayers = container.resolve(ListPrayersService);

    const prayers = await listPrayers.execute({
      user_id,
    });

    return response.json(instanceToInstance(prayers))
  }

}
