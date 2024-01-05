import express, {Request, Response} from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import {check, validationResult} from 'express-validator'
const router = express.Router()

router.post("/register",[
    check("fName", "First name is required").isString(),
    check("lName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password of length more than 6 characters is required").isLength({min: 6})
], async (req : Request, res : Response) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message : errors.array()})
        }

        let user = await User.findOne({email: req.body.email})
        if (user){
            return res.status(400).json({message : "User already exists with this email!"})
        }

        user = await User.create(req.body)

        const token = jwt.sign({userID : user.id}, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"})

        res.cookie("auth_token", token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 86400000})

        return res.sendStatus(200)
    } 
    catch (error) {
        //error logged instead of returned because it could contain sensitive data
        console.log(error)
        return res.status(500).json({message : "Something went wrong :("})
    }
})

export default router