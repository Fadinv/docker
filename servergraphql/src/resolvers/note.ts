import {Arg, Ctx, Mutation, Query, Resolver} from 'type-graphql'
import {MyContext} from '../types'
import {Note} from '../entities/Note'
import {Contact} from '../entities/Contact'

@Resolver()
export class NoteResolver {

    @Mutation(() => Note)
    async updateNote(
        @Ctx() {em}: MyContext,
        @Arg('idNote') idNote: number,
        @Arg('key') key: string,
        @Arg('value') value: string
    ) {
        const note = await em.findOne(Note, {idNote: idNote})
        if (!note) return

        note.key = key
        note.value = value
        await em.persistAndFlush(note)
        return note
    }

    @Query(() => [Note])
    async getNotes(
        @Ctx() {em}: MyContext,
    ) {
        return em.find(Note, {})
    }

    @Mutation(() => Boolean)
    async deleteNote(
        @Ctx() {em}: MyContext,
        @Arg('idNote') idNote: number,
    ) {
        const note = await em.findOne(Note, {idNote: idNote}, ['contact'])
        if (!note) return false
        await em.removeAndFlush(note)
        return true
    }

    @Mutation(() => Note, {nullable: true})
    async createNote(
        @Ctx() {em}: MyContext,
        @Arg('id') id: number,
        @Arg('key') key: string,
        @Arg('value') value: string
    ) {
        const contact = await em.findOne(Contact, {id: id})
        if (!contact) return null

        const note = em.create(Note, {key: key, value: value})
        note.contact = contact
        contact.notes!.add(note)
        await em.persistAndFlush(note)
        await em.persistAndFlush(contact)

        return note
    }
}