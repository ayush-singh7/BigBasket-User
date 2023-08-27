import { Router, Request, Response } from 'express';
import { consolelog, logger } from '../../utils/logger';
import { validate } from '../../middlewares/validate';
import Joi from 'joi';
import { onboardingControllers } from '../../controllers/onboarding.controllers';
import { auth } from '../../middlewares/auth';
import { Server } from '@grpc/grpc-js';


class OnboardingRoutes {
    private route: Router;
    constructor() {
        this.route = Router();
    }
    /**
     * @description Load All Services
     * @param {Server} grpcServer
     * @param userPackage
     */
    
    loadAllV1Services(grpcServer: Server, userPackage: any) {
        // kycRouteV1.loadServiceDefinition(grpcServer, authPackage);

        grpcServer.addService(userPackage.Profile.service,{
            GetOrder:(call:any, callback:any) => {
                const request = call.request;
                console.log(request,'------REQUEST-------');
                const response = 10;
                callback(null, response);
              },
        })

    }

    
    loadAllRoutes() {

        this.route.post('/login',
            auth.basicAuth,
            validate.body(
                Joi.object({
                    email: Joi.string()
                    .email()
                    .lowercase()
                    .trim()
                    .required(),
                    password: Joi.string()
                        .min(7)
                        .max(64)
                        .trim()
                        .required()
                        .error(
                            new Error(
                                "Wrong Password Format"
                            )
                        ),
                })
            ),
            onboardingControllers.login 
            
        );
        
        this.route.post('/signup',onboardingControllers.signup)

        this.route.patch('/update-user',auth.bearerAuth,onboardingControllers.updateUser)

        this.route.patch('/add-address',onboardingControllers.addAddress)

        return this.route;
    }
}

export const onboardingRoutes = new OnboardingRoutes();
