import { MigrationInterface, QueryRunner } from "typeorm"

export class AddCurrencyToHouse1565730169871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "house" ADD "currency" character varying`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "house" DROP COLUMN "currency"`)
  }
}
