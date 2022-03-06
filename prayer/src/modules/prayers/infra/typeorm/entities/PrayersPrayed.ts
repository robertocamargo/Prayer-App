import { Entity, PrimaryColumn,ManyToOne, JoinColumn } from 'typeorm';

import Prayer from '@modules/prayers/infra/typeorm/entities/Prayer';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('prayersprayed')
class PrayersPrayed {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  prayer_id: string;

}

export default PrayersPrayed;
