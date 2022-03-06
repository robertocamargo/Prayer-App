import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePrayers1633024348945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'prayers',
                columns: [
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary:true,
                        generationStrategy:'uuid',
                        default:'uuid_generate_v4()',
                    },
                    {
                      name:'user_id',
                      type:'uuid',
                    },
                    {
                        name:'prayer_description',
                        type:'varchar',
                        isNullable:false,
                    },
                    {
                      name:'anonymous',
                      type:'boolean',
                      default:false
                    },
                    {
                        name:'date',
                        type:'timestamp with time zone',
                        isNullable:false
                    },
                    {
                      name:'created_at',
                      type:'timestamp',
                      default:'now()',
                    },
                    {
                      name:'updated_at',
                      type:'timestamp',
                      default:'now()',
                    }

                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('prayers');
    }

}
