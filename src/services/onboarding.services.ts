import { Router, Request, Response } from 'express';
import UserModel from '../database/models';
import * as jwt from "jsonwebtoken";
class OnboardingServices {

    constructor() {
    }
    
    async verifyUser(email:string, password:string){
        try{
            let id = await UserModel.findOne({email,password},{_id:1});                
            return id;
        }catch(e){
            return e;
        }
    
    }
    async generateJwt(id:string){
        try{
            let token = jwt.sign({id:id},'ayush',{expiresIn:'3h'})
            return token
        }catch(e){
            return e;
        }
        
    }
    
    


}

export const onboardingServices = new OnboardingServices()