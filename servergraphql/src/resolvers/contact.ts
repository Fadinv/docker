import {Arg, Ctx, Mutation, Query, Resolver} from 'type-graphql'
import {Contact} from '../entities/Contact'
import {MyContext} from '../types'
import {Note} from '../entities/Note'

@Resolver()
export class ContactResolver {

    @Mutation(() => Contact, {nullable: true})
    async updateContact(
        @Ctx() {em}: MyContext,
        @Arg('id') id: number,
        @Arg('contactName') contactName: string,
    ) {
        const contact = await em.findOne(Contact, {id: id})
        if (!contact) return null

        contact.contactName = contactName
        await em.persistAndFlush(contact)
        return contact
    }

    @Query(() => [Contact])
    async getContacts(
        @Ctx() {em}: MyContext,
    ) {
        const contact = await em.find(Contact, {}, ['notes'])

        return contact
    }

    @Query(() => Contact, {nullable: true})
    async getContact(
        @Ctx() {em}: MyContext,
        @Arg('id') id: number,
    ) {
        const contact = await em.findOne(Contact, {id: id}, ['notes'])

        return contact
    }

    @Mutation(() => Contact, {nullable: true})
    async createContact(
        @Ctx() {em}: MyContext,
        @Arg('contactName') contactName: string,
    ) {
        const contact = em.create(Contact, {contactName: contactName})

        await em.persistAndFlush(contact)

        return contact
    }

    @Mutation(() => Boolean)
    async deleteContact(
        @Ctx() {em}: MyContext,
        @Arg('id') id: number,
    ) {
        const contact = await em.findOne(Contact, {id: id}, ['notes'])
        if (!contact) return

        for (let n of contact.notes!) {
            if (n === undefined || n === null) return
            await em.nativeDelete(Note, {idNote: n.idNote})
        }
        return em.nativeDelete(Contact, {id: id})
    }
}

