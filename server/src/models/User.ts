import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

//making a type for schema 
export type UserType = {
    _id : string,
    email : string,
    password : string,
    fName : string,
    lName : string
}

//schema
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required: true
    },
    fName : {
        type : String,
        required: true
    },
    lName : {
        type : String,
        required: true
    }
})

//schema middleware for hashing
userSchema.pre("save", async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const User = mongoose.model<UserType>("User", userSchema)
export default User