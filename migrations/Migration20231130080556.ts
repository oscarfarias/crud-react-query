import { Migration } from '@mikro-orm/migrations'

export class Migration20231130080556 extends Migration {
  async up(): Promise<void> {
    this.addSql(`insert into "Roles" ("name") values ('admin'),('user');`)
  }
  async down(): Promise<void> {
    this.addSql(`delete from "Roles" where "name" in ('admin','user');`)
  }
}
