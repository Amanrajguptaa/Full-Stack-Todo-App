import jwt from "jsonwebtoken"

const authMiddleware=(req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({message:"Access denied. No token provided."})
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user ={id:decode.id};
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
}
export default authMiddleware;