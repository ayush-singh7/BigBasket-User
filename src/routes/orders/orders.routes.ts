import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { Server } from '@grpc/grpc-js';
import { Grpc } from '../../bootstrap/grpc';
import * as grpc from '@grpc/grpc-js';
import { userControllers } from '../../controllers/user.controllers';


class OrderRoutes extends Grpc {
    private route: Router;

    constructor() {
        super()
        this.route = Router();
    }
    
    loadAllRoutes() {

        this.route.post('/place-order',
            // auth.basicAuth,
            userControllers.placeOrder
        );
        
        return this.route;
    }
}

export const orderRoutes = new OrderRoutes();
