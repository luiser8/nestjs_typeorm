export default () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3001,
    token: process.env.APP_TOKEN,
    database: {
        type: process.env.APP_DB_TYPE,
        host: process.env.APP_DB_HOST,
        port: parseInt(process.env.APP_DB_PORT, 10) || 5432,
        username: process.env.APP_DB_USER,
        password: process.env.APP_DB_PASS,
        database: process.env.APP_DB_DBNAME,
        entities: process.env.APP_DB_ENTITIES,
        synchronize: process.env.APP_DB_SYNCHRONIZE,
        autoLoadEntities: process.env.APP_DB_AUTOLOADENTITIES
    }
});