import { MigrationInterface, QueryRunner } from "typeorm"

export class ChangeHouseToGroup1569504185209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameTable("house", "group")
    await queryRunner.renameColumn("cost", "houseId", "groupId")
    await queryRunner.renameColumn("invite", "houseId", "groupId")
    await queryRunner.renameColumn("user", "houseId", "groupId")
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameTable("group", "house")
    await queryRunner.renameColumn("cost", "groupId", "houseId")
    await queryRunner.renameColumn("invite", "groupId", "houseId")
    await queryRunner.renameColumn("user", "groupId", "houseId")
  }
}
