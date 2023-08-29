import jwt from "jsonwebtoken";
import { secret } from "../config.js";
import { Roles } from "../objects/roles.js";

export default function authMiddleware(roles){

    return  (req, res, next) => {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            if (!req.headers.authorization) {
                return res.status(403).json({message: "User unauthorized"})
            }
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User unauthorized"})
            }

            const {roles:userRoles} = jwt.verify(token, secret);

            if(userRoles.indexOf(Roles.admin) !== -1) {
                return next();                
            }

            let isPresent = false

            roles.forEach((role)=>{
                if(userRoles.indexOf(role) >= 0) {
                    isPresent = true
                }
            })
            
            if(isPresent) {
                return next();
            }

            return res.status(403).json({message: "User have no permissions for this action"})
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "User unauthorized"})
        }
    };
}