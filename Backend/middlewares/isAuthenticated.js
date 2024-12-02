import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) =>{
    try {
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(401).json({
                Message:"User Not Authenticated",
                success: false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode)
        {
            return res.status(401).json({
                Message: "Invalid Token",
                success: false
            })
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;