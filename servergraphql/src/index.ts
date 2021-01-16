import {MikroORM} from '@mikro-orm/core'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import {ContactResolver} from './resolvers/contact'
import {MyContext} from './types'
import mikroConfig from './mikro-orm.config'
import {NoteResolver} from './resolvers/note'
import cors from 'cors'

let port = process.env.PORT as any
if (port == null || port == '') {
    port = 8000
}

const main = async () => {
    const orm = await MikroORM.init(mikroConfig)
    // await orm.em.nativeDelete(Note, {})
    // await orm.em.nativeDelete(Contact, {})
    await orm.getMigrator().up()

    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ContactResolver, NoteResolver],
            validate: true,
        }),
        introspection: true,
        playground: true,
        context: (): MyContext => ({em: orm.em}),
    })
    app.use(cors({
        origin: 'http://localhost:8080',
        credentials: true,
    }))
    apolloServer.applyMiddleware({app, cors: false})

    app.get('/', (_, res) => {
        res.send('hello guys')
    })

    app.listen(port, () => {
        console.log(`server started on localhost:${port}`)
    })
}

main().catch((e) => {
    console.error(e)
})