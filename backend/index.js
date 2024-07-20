import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDb from "./utils/db.js"

dotenv.config()

const app = express()
const PORT  = 3000

connectDb()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Api working."
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})