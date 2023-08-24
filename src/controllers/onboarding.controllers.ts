import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { onboardingServices } from '../services/onboarding.services';
import UserModel from '../database/models';

class OnboardingControllers {

    constructor() {
    }
    
    login = async(req:Request, res:Response) =>{
        const {email, password} = req.body;
        let id:any = await onboardingServices.verifyUser(email,password)
        if(id){
            let jwt = await onboardingServices.generateJwt(id._id.toString());
            res.send({access_token:jwt});
        }else{
            res.send("Incorrect Credentials")
        }
    }

    

}

export const onboardingControllers = new OnboardingControllers()