import {Request, Response, NextFunction} from "express";
import { CustomRequest } from "../interfaces/global.interfaces";
import * as jwt from 'jsonwebtoken';
const username = "ayush"
const password = "12345"
const secretKey = 'secret'
class Auth {

    constructor(){
    }

    basicAuth(req:Request, res:Response, next:NextFunction){
        const authHeader = req.headers.authorization;
        if(authHeader){
            const encodedCredentials = authHeader.split(' ')[1];
            const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
            const [receivedUsername, receivedPassword] = decodedCredentials.split(':');
            if (receivedUsername === username && receivedPassword === password) {
                return next();
              } else {
                return res.status(401).send('Authentication failed');
              }
        }else{
            return res.status(401).send('Authentication failed');
        }
    }

    bearerAuth(req:CustomRequest, res:Response,next:NextFunction){
        const token = req.header('Authorization')?.split(' ')[1];
        try{
            if (!token) {
                return res.status(401).json({ message: 'Access denied' });
              }
            let decodedData = jwt.verify(token, secretKey);
            req.userData = decodedData;
            next();
        }catch(error){
            res.send(error);
        }

    }

}

export const auth = new Auth()