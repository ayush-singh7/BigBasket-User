import express, { Express } from 'express';
import cors from 'cors';
import {logger} from "../utils/logger";
import { routes } from '../routes/routes';

export class App {
    private app: Express;
    private port: number = 3000; // get it from config later
    contextPath = "/api";
    constructor() {
        this.app = express()
        this.startApp();
    }

    /**
     * @description Steps to Start the Express Sever
     */
    private startApp(): void {
        this.loadGlobalMiddlewares();
        this.loadRoutes();
        this.intialiseServer();
    }

    /**
     * @description Load global Middlewares
     */
    private loadGlobalMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());

        // Swagger setup
        // this.app.use(
        //     `${this.contextPath}/api-docs`,
        //     serve,
        //     setup(swaggerDocument)
        // );

        //  Locale setup
    }

    /**
     * @description Load All Routes
     */
    private loadRoutes() {
        this.app.use(this.contextPath, routes.loadAllRoutes());
    }

    /**
     * @description Initiate Express Server
     */
    private intialiseServer() {
        this.app.listen(this.port, this.callback);
    }

    /**
     * @description handler for Express server when initialising server
     */
    private callback = () => {
        logger.info(`Server listing on port: ${this.port}`);
    };
}


