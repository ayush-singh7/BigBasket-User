import { mongo } from "../database/mongo.connection";
import { App } from "./app";
import { Grpc } from "./grpc";



export class Bootstrap {
    private gRPC!: Grpc;
    private app!: App;

    constructor() {
        this.startApplication();
    }

    public async startApplication() {

        mongo.initiateUserMongoConnection();
        this.app = new App();
        this.gRPC = new Grpc();
        
    }
}
