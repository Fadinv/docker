import {Configuration, Connection, IDatabaseDriver, LoadStrategy, Options} from '@mikro-orm/core'
import {Contact} from './entities/Contact'
import path from 'path'
import {Note} from './entities/Note'

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Contact, Note],
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    dbName: 'postgres',
    type: 'postgresql',
    debug: true,
    loadStrategy: LoadStrategy.SELECT_IN
} as Configuration<IDatabaseDriver<Connection>> | Options<IDatabaseDriver<Connection>> | undefined