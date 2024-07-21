import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDb from "./utils/db.js"
import authRouter from "./routes/authRoutes.js"
import companyRouter from "./routes/companyRoutes.js"

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

app.use("/api/auth",authRouter)
app.use("/api/company",companyRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})