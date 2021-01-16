import 'reflect-metadata'
import {Collection, Entity, OneToMany, PrimaryKey, Property} from '@mikro-orm/core'
import {Field, ObjectType} from 'type-graphql'
import {Note} from './Note'

@ObjectType()
@Entity()
export class Contact {

    @Field()
    @PrimaryKey()
    id!: number

    @Field(() => String)
    @Property({type: 'date'})
    createdAt = new Date()

    @Field(() => String)
    @Property({type: 'date', onUpdate: () => new Date()})
    updatedAt = new Date()

    @Field(() => String, {nullable: true})
    @Property({type: 'text'})
    contactName!: string

    @Field(() => [Note])
    @OneToMany(() => Note, note => note.contact, {nullable: true})
    notes?: Collection<Note | undefined> = new Collection<Note | undefined>(this)

    constructor() {
        this.notes = new Collection<Note | undefined>(this)
    }
}