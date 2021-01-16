"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210114233533 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210114233533 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('create table "contact" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "contact_name" text not null);');
            this.addSql('create table "note" ("id_note" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "key" text not null, "value" text not null, "contact_id" int4 not null);');
            this.addSql('alter table "note" add constraint "note_contact_id_foreign" foreign key ("contact_id") references "contact" ("id") on update cascade;');
        });
    }
}
exports.Migration20210114233533 = Migration20210114233533;
//# sourceMappingURL=Migration20210114233533.js.map