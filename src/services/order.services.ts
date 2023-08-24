import { Grpc } from "../bootstrap/grpc";
import * as grpc from '@grpc/grpc-js';
class OrderServices extends Grpc{
    constructor(){
        super()
    }

    placeOrder(orderDetails:any){

        const ProfileObj = this.userPackage.Profile;
        const client = new ProfileObj('127.0.0.1:50000', grpc.credentials.createInsecure());

        client.GetOrder(orderDetails, (error:any, response:any)=>{
            console.log(error,response,'-------ALLLLL');
            return response;
        })
    }
}

export const orderServices  = new OrderServices()