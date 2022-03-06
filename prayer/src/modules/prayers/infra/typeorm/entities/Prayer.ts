import { Entity, Column,JoinTable,
  PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import PrayersPrayed from '@modules/prayers/infra/typeorm/entities/PrayersPrayed'

@Entity('prayers')
class Prayer {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @ManyToOne(()=> PrayersPrayed,{eager:true})
  @JoinColumn({name:'id',referencedColumnName:'prayer_id'})
  prayersprayed: PrayersPrayed;

  @Column()
  user_id: string;

  @ManyToOne(()=> User,{eager:true})
  @JoinColumn({name:'user_id'})
  user: User;

/*
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
*/
  @Column()
  prayer_description: string;

  @Column()
  anonymous: boolean;

  @Column('time with time zone')
  date: Date;

 @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Prayer;
