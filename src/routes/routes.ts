import { Server } from '@grpc/grpc-js';
// import { routesV1 } from './v1/v1.routes';
import { Router } from 'express';
import { onboardingRoutes } from './onboarding/onboarding.routes';
import { orderRoutes } from './orders/orders.routes';
// import { testRoute } from './test.routes';


class Routes {
    private route: Router;

    constructor() {
        this.route = Router();
    }

    /**
     * @description Load All Services
     * @param {Server} grpcServer
     * @param authPackage
     */

    loadAllServices(grpcServer: Server, userPackage: any) {
        let obj = {userId:'123',orderStatus:'CART'};

        userPackage.Profile.GetOrder(obj, (error:any, response:any) => {
            if (!error) {
              console.log(`Result: ${response.result}`);
            } else {
              console.error(error);
            }
          })
        // testRoute.loadTestServiceDefinition(grpcServer, authPackage);
    }

    /**
     * @description Load All Routes
     */
    loadAllRoutes() {
        this.route.use('/auth', onboardingRoutes.loadAllRoutes());
        
        return this.route;
    }
}

export const routes = new Routes();
