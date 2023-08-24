import { Options, PackageDefinition, loadSync } from '@grpc/proto-loader';
import  {
    Server,
    GrpcObject,
    loadPackageDefinition
} from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import path from 'path';
import { routes } from './../routes/routes';

// import { config } from '../providers/aws/secret-manager';
// import { Config } from '../interfaces/config';
// import * as dotenv from 'dotenv';

import { GRPC } from '../commons/constants';
import { logger } from '../utils/logger';
// dotenv.config();

export class Grpc {
    private grpcPort = 50000;
    private protoFilePath = './user.proto';
    public userPackage: any;
    public grpcServer: Server;
    constructor() {
        this.grpcServer = new Server();
        this.startGrpcServer();
    }

    /**
     * @description Initiate Grpc Server
     */
    private startGrpcServer() {
        this.loadProtoFile();
        this.initialiseGrpcServer();
        // this.loadServiceDefinition();
    }

    /**
     * @description Load Proto file for User Service
     */
    private loadProtoFile(): void {
        const protoOptions: Options = GRPC.PROTO_FILE_OPTIONS; 
        const packageDefinition: PackageDefinition = loadSync( 
            path.resolve(__dirname, this.protoFilePath),
            protoOptions
        );
        const grpcObject: GrpcObject = loadPackageDefinition(packageDefinition);
        this.userPackage = grpcObject.userPackage;
    }

   
    
    private loadServiceDefinition(): void { // server.addservice(server ,{} )
        

    }

    /**
     * @description initialise Grpc Server
     */
    private initialiseGrpcServer(): void {
    

    }

    /**
     * @description handler for Grpc server when initialising server
     * @param {Error} err
     * @param {number} port
     * @returns {void}
     */
    private grpcCallback = (err: Error | null, port: number): void => {
        if (err) {
            console.error(err);
            return;
        }
        this.grpcServer.start();
        logger.info(`gRPC server listening on ${port}`);
    };
}

//loading the proto files that contains schema of proto files 
//essentially all boiler plate code for the grpc server 
