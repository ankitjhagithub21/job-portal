import express from "express"
import { verifyToken } from "../middlewares/verifyToken.js"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js"
const companyRouter = express.Router()

companyRouter.post("/register",verifyToken,registerCompany)
companyRouter.get("/all",verifyToken,getCompany)
companyRouter.get("/:id",verifyToken,getCompanyById)
companyRouter.put("/:id",verifyToken,updateCompany)


export default companyRouter