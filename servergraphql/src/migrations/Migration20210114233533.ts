import { Migration } from '@mikro-orm/migrations';

export class Migration20210114233533 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "contact" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "contact_name" text not null);');

    this.addSql('create table "note" ("id_note" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "key" text not null, "value" text not null, "contact_id" int4 not null);');

    this.addSql('alter table "note" add constraint "note_contact_id_foreign" foreign key ("contact_id") references "contact" ("id") on update cascade;');
  }

}
