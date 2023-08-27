import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { onboardingServices } from '../services/onboarding.services';
import UserModel from '../database/models';
import { CustomRequest } from '../interfaces/global.interfaces';

class OnboardingControllers {

    constructor() {
    }
    
    login = async(req:Request, res:Response) =>{
        try{
            const {email, password} = req.body;
        
            let id:any = await onboardingServices.verifyUser(email,password)
            if(id){
                let jwt = await onboardingServices.generateJwt(id._id.toString());
                res.send({access_token:jwt});
            }else{
                res.send("Incorrect Credentials")
            }
        }catch(error){
            res.send(error);
        }
    }
    signup = async(req:CustomRequest, res:Response)=>{
        console.log(req.body,'-------------');
        try{
            const {email, password, firstName, lastName} = req.body;
            const signupData = {
                email,password,firstName,lastName
            }
            let data = onboardingServices.signupUser(signupData);        
            return data
        }catch(error){
            res.send(error);
        }
    }

    updateUser = async(req:CustomRequest, res:Response)=>{
        try{
            const updateData = req.body;
            console.log(updateData,'UD');
            let id = updateData.id;
            delete updateData['userData'];

            return await onboardingServices.updateUser(updateData,id);
            
        }catch(error){
            res.send(error);
        }   
    }

    addAddress = async(req:CustomRequest, res:Response)=>{
        try{
            let id = req.body.userData.id;
            
        }catch(error){

        }
    }
    

}

export const onboardingControllers = new OnboardingControllers()