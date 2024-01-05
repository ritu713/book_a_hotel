import express, {Request, Response} from 'express'
import { check, validationResult } from 'express-validator'
import User from '../models/User';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/login",
 [
    check("email", "Email is required you silly goose").isEmail(),
    check("password", "Password with 6 or more characters is required").isLength({min:6})
],
async (req : Request, res : Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message : errors.array()})
    }

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message : "Invalid credentials"})
        }
        //similar messages because we dont want to give any info to potential hackers
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message : "Invalid credentials"})
        }

        //create an access token

        const access_token = jwt.sign({userID : user.id}, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"})
        res.cookie("auth_token", access_token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 86400000})

        return res.status(200).json({userID : user._id})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Something went wrong"})
    }
})

export default router