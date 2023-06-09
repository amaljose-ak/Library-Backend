const router = require('express').Router()
const adminFunc = require('../../function/admin/admin')
const{adminValidation}=require('../../function/admin/adminValidation')
const{adminLoginVal}=require('../../function/admin/adminValidation')
const verify=require('../../function/middleware/jwt verify')


router.get('/', async (req, res) => {
        const viewedAdmin = await adminFunc.viewAll()
        res.json({ Admin: viewedAdmin })
    
})

router.post('/add', async (req, res) => {
    const {error}=adminValidation(req.body)
    if(error){
        return res.json({Typeerror:error.details[0].message})
    }
    
        const savedAdmin = await adminFunc.register(req.body)
        res.json({ message: savedAdmin })
    

})

router.put('/update/:id', async (req,res)=>{
   
    const {error}=adminValidation(req.body)
    if(error){
        return res.json({err:error.details[0].message})
    }
               const updatedAdmin= await adminFunc.updateAdmin(req.params,req.body) 
            res.json({message:updatedAdmin.message})
    
})
router.post('/login', async(req,res)=>{
    const {error}=adminLoginVal(req.body)
    if(error){
         return res.json({message:error.details[0].message})
    }
   const loggedin= await adminFunc.Login(req.body)
    return res.json({
        statuscode:loggedin.statuscode,
        message:loggedin.message,
        success:loggedin.success,
        token:loggedin.token
    })
})

router.delete('/removeAdmin/:id', async(req,res)=>{
    const deletedAdmin= await adminFunc.deleteAdmin(req.params.id)
    return res.json({message:deletedAdmin.message})
})

module.exports = router