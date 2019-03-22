import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateInvite1553276293383 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "invite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "houseId" uuid, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "invite" ADD CONSTRAINT "FK_c462fc375c4f7e472f12c952cab" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "invite" DROP CONSTRAINT "FK_c462fc375c4f7e472f12c952cab"`,
    )
    await queryRunner.query(`DROP TABLE "invite"`)
  }
}
