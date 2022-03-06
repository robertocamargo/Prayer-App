import {MigrationInterface, QueryRunner,Table,TableForeignKey} from "typeorm";

export class PrayersPrayed1645299565396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'prayersprayed',
            columns: [
                {
                    name:'user_id',
                    type:'uuid',
                    isPrimary:true,
                },
                {
                  name:'prayer_id',
                  type:'uuid',
                  isPrimary:true,
                },
            ],
        }),
      );

      await queryRunner.createForeignKey('prayersprayed',new TableForeignKey({
        name:'User_fk',
        columnNames:['user_id'],
        referencedColumnNames:['id'],
        referencedTableName:'users',
        onDelete:'SET NULL',
        onUpdate:'CASCADE',
      }),
      );

      await queryRunner.createForeignKey('prayersprayed',new TableForeignKey({
        name:'Prayer_fk',
        columnNames:['prayer_id'],
        referencedColumnNames:['id'],
        referencedTableName:'prayers',
        onDelete:'SET NULL',
        onUpdate:'CASCADE',
      }),
      );

      }




    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('prayersprayed','User_fk');
      await queryRunner.dropForeignKey('prayersprayed','Prayer_fk');
      await queryRunner.dropTable('prayersprayed');
    }

}
