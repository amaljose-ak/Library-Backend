const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    const token=req.header('auth-token')
    if(!token){
        return res.status(400).json({
            message:'access denied'
        })
    }try {
        const verified=jwt.verify(token,process.env.SC)
        console.log(verified);
        req.verified=verified
        next()
    } catch (error) {
        console.log(error);
    }
}