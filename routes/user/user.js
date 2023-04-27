const router = require('express').Router();
const userFunction = require('../../function/user/userFunction')
const { userValidation } = require('../../function/user/userValidation')
const verify=require('../../function/middleware/jwt verify')


router.post('/addUser', async (req, res) => {

    const { error } = userValidation(req.body)
    if (error) {
        res.json({
            error: error.details[0].message
        })
    }
    const saveduser = await userFunction.register(req.body)
    res.json({
        saveduser
    })
})

router.post('/login',async(req,res)=>{

    const loginusers=await userFunction.loginUser(req.body)
   return res.json({
        statuscode:loginusers.statuscode,
        message:loginusers.message,
        success:loginusers.success,
        token:loginusers.token

    })
})
router.get('/',async(req,res)=>{
    const viewed= await userFunction.viewUser()
    res.json({viewed})
})

router.put('/update/:id',verify, async(req,res)=>{
         const updatedusers=await userFunction.updateUser(req.params,req.body)
    return res.json({
        message:updatedusers.message
    }) 
    
  
})


router.delete('/delete/:id',async(req,res)=>{
    const deletduser= await userFunction.deleteuser(req.params.id)
    return res.json({
        message:deletduser.message
    })
})


// view books
router.get('/viewBook',async(req,res)=>{
    const viewdBook= await userFunction.viewBook()
    return res.json({viewdBook})
})

module.exports = router  