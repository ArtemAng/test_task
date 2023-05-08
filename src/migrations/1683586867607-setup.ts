import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1683586867607 implements MigrationInterface {
    name = 'Setup1683586867607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" text NOT NULL,
                "first_name" text NOT NULL,
                "last_name" text NOT NULL,
                "image" text NOT NULL,
                "pdf" bytea NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
