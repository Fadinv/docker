import 'reflect-metadata'
import {Entity, ManyToOne, PrimaryKey, Property} from '@mikro-orm/core'
import {Field, ObjectType} from 'type-graphql'
import {Contact} from './Contact'

@ObjectType()
@Entity()
export class Note {

    @Field()
    @PrimaryKey()
    idNote!: number

    @Field(() => String)
    @Property({type: 'date'})
    createdAt = new Date()

    @Field(() => String)
    @Property({type: 'date', onUpdate: () => new Date()})
    updatedAt = new Date()

    @Field(() => String, {nullable: true})
    @Property({type: 'text'})
    key!: string

    @Field(() => String, {nullable: true})
    @Property({type: 'text'})
    value!: string

    @Field(() => Contact)
    @ManyToOne(() => Contact)
    contact!: Contact

    constructor(contact: Contact) {
        this.contact = contact
    }
}