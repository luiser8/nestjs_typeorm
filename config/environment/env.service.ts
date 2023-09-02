import * as dotenv from 'dotenv'
import * as fs from 'fs'

export interface EnvData {
    // application
    APP_ENV: string
    APP_DEBUG: boolean

    // database
    APP_DB_TYPE: 'postgresql'
    APP_DB_HOST?: string
    APP_DB_DBNAME: string
    APP_DB_PORT?: number
    APP_DB_USER: string
    APP_DB_PASS: string
    APP_DB_SYNCHRONIZE: boolean
}

export class EnvService {
    private vars: EnvData

    constructor () {
        const envConfig = dotenv.config({ silent: true } as any)
        //const environment = process.env.NODE_ENV || 'development'
        const data: any = dotenv.parse(fs.readFileSync(`.env`))

        data.APP_ENV = envConfig
        data.APP_DEBUG = data.APP_DEBUG === 'true' ? true : false
        data.APP_DB_PORT = parseInt(data.APP_DB_PORT)

        this.vars = data as EnvData
    }

    read(): EnvData {
        return this.vars
    }

    isDev(): boolean {
        return (this.vars.APP_ENV === 'development')
    }

    isProd(): boolean {
        return (this.vars.APP_ENV === 'production')
    }
}