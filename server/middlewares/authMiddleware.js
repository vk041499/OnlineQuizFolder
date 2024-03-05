const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.body.userId = userId;
        next();
    } catch (error) {
        console.log(error.message)
        res.status(401).send({
            message:"You are not Authenticated",
            data:error,
            success:false,

        });
    }
};