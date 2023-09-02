import { Module, Global, DynamicModule } from '@nestjs/common'
import { EnvModule } from './env.module'
import { EnvService } from './env.service'
import { TypeOrmModule } from '@nestjs/typeorm'

function DatabaseOrmModule(): DynamicModule {
    const config = new EnvService().read()

    return TypeOrmModule.forRoot({
        type: config.APP_DB_TYPE as any,
        host: config.APP_DB_HOST,
        port: config.APP_DB_PORT,
        username: config.APP_DB_USER,
        password: config.APP_DB_PASS,
        database: config.APP_DB_DBNAME,
        synchronize: config.APP_DB_SYNCHRONIZE
    })
}

@Global()
@Module({
    imports: [
        EnvModule,
        DatabaseOrmModule()
    ]
})
export class DatabaseModule { }