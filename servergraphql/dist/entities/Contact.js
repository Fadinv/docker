"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const Note_1 = require("./Note");
let Contact = class Contact {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.notes = new core_1.Collection(this);
        this.notes = new core_1.Collection(this);
    }
};
__decorate([
    type_graphql_1.Field(),
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Contact.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    core_1.Property({ type: 'date' }),
    __metadata("design:type", Object)
], Contact.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    core_1.Property({ type: 'date', onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Contact.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    core_1.Property({ type: 'text' }),
    __metadata("design:type", String)
], Contact.prototype, "contactName", void 0);
__decorate([
    type_graphql_1.Field(() => [Note_1.Note]),
    core_1.OneToMany(() => Note_1.Note, note => note.contact, { nullable: true }),
    __metadata("design:type", core_1.Collection)
], Contact.prototype, "notes", void 0);
Contact = __decorate([
    type_graphql_1.ObjectType(),
    core_1.Entity(),
    __metadata("design:paramtypes", [])
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map