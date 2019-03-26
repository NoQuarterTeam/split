import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateInviteEmailConstraint1553625498660
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "UQ_658d8246180c0345d32a100544e" UNIQUE ("email")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "UQ_658d8246180c0345d32a100544e"`,
    )
  }
}
