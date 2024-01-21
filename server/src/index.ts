//imports
import express, {Request, Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import hotelRoutes from './routes/my-hotels'
import cookieParser from 'cookie-parser'
import path from 'path'
import { v2 as cloudinary} from 'cloudinary'



//basic setup
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


//frontend
app.use(express.static(path.join(__dirname, "../../client/dist")));

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/my-hotels', hotelRoutes);

//cloudinary v2
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

//db connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
.then(() => {
    console.log("App connected to DB")
    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
})
.catch((err : Error) => {
    console.log("Error while connecting to DB", err)
})


//test
app.get('/', (req : Request, res : Response) => {
    return res.send("Home page up and running!")
});