const jwt = require('jsonwebtoken')
//will be used for authentication middleware in post requests
const auth = (req,res,next) => {
    try{
        const token = req.cookies.jwt
        if(token==="" || !token){
            res.clearCookie('jwt')
            return res.json({message:"User not logged in."})
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ,(err,user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
    }catch(e){
        res.status(401).json({message: "Auth Failed"})
    }
    
}

module.exports = auth