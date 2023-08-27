import { Router, Request, Response } from 'express';
import UserModel from '../database/models';
import * as jwt from "jsonwebtoken";
import mongoose from 'mongoose';
class OnboardingServices {

    constructor() {
    }

    async verifyUser(email: string, password: string) {
        try {
            let id = await UserModel.findOne({ email, password }, { _id: 1 });
            return id;
        } catch (e) {
            return e;
        }

    }
    async generateJwt(id: string) {
        try {
            let token = jwt.sign({ id: id }, 'ayush', { expiresIn: '3h' })
            return token
        } catch (e) {
            return e;
        }

    }
    async signupUser(userData: any) {
        try {
            let data = await UserModel.create(userData)
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async updateUser(updateData: any, id: string) {
        try {
            let _id = new mongoose.Types.ObjectId(id)
            await UserModel.updateOne({ _id: _id }, {
                ...updateData
            })

        } catch (error) {
            return Promise.reject(error);
        }
    }
    async addAddress(addressData: any, id: string) {
        try {
            let _id = new mongoose.Types.ObjectId(id)
            await UserModel.updateOne({ _id: _id }, 
               {
                $push:{address:addressData}
               }
            )

    } catch(error:any) {
        return Promise.reject(error);
    }
}
    


}

export const onboardingServices = new OnboardingServices()