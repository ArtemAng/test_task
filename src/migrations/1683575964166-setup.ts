import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1683575964166 implements MigrationInterface {
    name = 'Setup1683575964166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" text NOT NULL,
                "first_name" text NOT NULL,
                "last_name" text NOT NULL,
                "image" text NOT NULL,
                "pdf" bytea NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_7a4fd2a547828e5efe420e50d1c" UNIQUE ("first_name"),
                CONSTRAINT "UQ_6937e802be2946855a3ad0e6bef" UNIQUE ("last_name"),
                CONSTRAINT "UQ_3bd3f2e16165d1dac3e8e132863" UNIQUE ("image"),
                CONSTRAINT "UQ_7c6fdcbe8ef7812f60f652f215e" UNIQUE ("pdf"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
