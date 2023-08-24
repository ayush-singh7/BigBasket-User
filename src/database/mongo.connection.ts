import { ConnectOptions,connect, Connection, createConnection } from 'mongoose';
// import { Config } from '../../interfaces/config';
import { ExceptionMessage, MongoDatabaseType } from "../interfaces/enum";
import { logger } from '../utils/logger';


class MongoConnection {
    private userConn!: Connection;
    constructor() {
        this.initiateUserMongoConnection();
    }

    /**
     * @description User MongoDb Connection
     */
    async initiateUserMongoConnection() {
        try{
            await connect('mongodb://localhost:27017/bigbasket')
            logger.info('Initiated Mongo User Conection');

        }catch(e){
            logger.info('DB WENT WRONG');
        }
        
    }

    
    
}

export const mongo = new MongoConnection();
