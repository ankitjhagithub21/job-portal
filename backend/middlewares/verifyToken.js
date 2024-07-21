import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) =>{
    try{
        const token = req.cookies.token;

        if(!token){
            return  res.status(401).json({
                success:false,
                message:"Unauthorized."
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return  res.status(401).json({
                success:false,
                message:"Invalid token."
            })
        }

        req.id = decoded.userId;

        next()

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}