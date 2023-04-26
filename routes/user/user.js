const router=require('express').Router()


router.get('/main',(req,res)=>{
    res.send('hello from users')
})
module.exports=router