import {Request, Response, NextFunction} from "express";
const username = "ayush"
const password = "12345"
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

}

export const auth = new Auth()