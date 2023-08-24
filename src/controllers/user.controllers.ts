import { Router, Request, Response } from 'express';
import { orderServices } from '../services/order.services';


class UserControllers{
    constructor(){

    }
    
    placeOrder=(req:Request,res:Response)=>{
        
        try{
            let response = orderServices.placeOrder(req.body);
            return response;
        }catch(e){
            console.log(e);
            return Promise.reject(e);
        }
    }

}

export const userControllers = new UserControllers()