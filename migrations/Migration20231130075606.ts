import { Migration } from '@mikro-orm/migrations';

export class Migration20231130075606 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Roles" ("id" serial primary key, "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "name" varchar(255) not null);');

    this.addSql('create table "Users" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null default now(), "updatedAt" timestamptz(0) not null default now(), "deletedAt" timestamptz(0) null default null, "firstName" varchar(255) not null, "lastName" varchar(255) null, "email" varchar(255) not null, "password" varchar(255) not null, "roleId" int not null, constraint "Users_pkey" primary key ("id"));');
    this.addSql('alter table "Users" add constraint "Users_deletedAt_email_unique" unique ("deletedAt", "email");');

    this.addSql('alter table "Users" add constraint "Users_roleId_foreign" foreign key ("roleId") references "Roles" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "Users" drop constraint "Users_roleId_foreign";');

    this.addSql('drop table if exists "Roles" cascade;');

    this.addSql('drop table if exists "Users" cascade;');
  }

}
