import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class AlterUseridForeingKey1633115359121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createForeignKey('prayers',new TableForeignKey({
        name:'PrayerUser_fk',
        columnNames:['user_id'],
        referencedColumnNames:['id'],
        referencedTableName:'users',
        onDelete:'SET NULL',
        onUpdate:'CASCADE',
      }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('prayers','PrayerUser_fk');
    }

}
