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
exports.Note = void 0;
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const Contact_1 = require("./Contact");
let Note = class Note {
    constructor(contact) {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.contact = contact;
    }
};
__decorate([
    type_graphql_1.Field(),
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Note.prototype, "idNote", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    core_1.Property({ type: 'date' }),
    __metadata("design:type", Object)
], Note.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    core_1.Property({ type: 'date', onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Note.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    core_1.Property({ type: 'text' }),
    __metadata("design:type", String)
], Note.prototype, "key", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    core_1.Property({ type: 'text' }),
    __metadata("design:type", String)
], Note.prototype, "value", void 0);
__decorate([
    type_graphql_1.Field(() => Contact_1.Contact),
    core_1.ManyToOne(() => Contact_1.Contact),
    __metadata("design:type", Contact_1.Contact)
], Note.prototype, "contact", void 0);
Note = __decorate([
    type_graphql_1.ObjectType(),
    core_1.Entity(),
    __metadata("design:paramtypes", [Contact_1.Contact])
], Note);
exports.Note = Note;
//# sourceMappingURL=Note.js.map