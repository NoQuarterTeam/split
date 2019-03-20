import { MigrationInterface, QueryRunner } from "typeorm"

export class AddTimestampsToHouse1553099088219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "house" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "house" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "house" DROP COLUMN "updatedAt"`)
    await queryRunner.query(`ALTER TABLE "house" DROP COLUMN "createdAt"`)
  }
}
