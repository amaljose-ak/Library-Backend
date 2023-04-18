const router=require('express').Router()
const adminFunc=require('../../function/admin/admin')



router.get('/', async(req,res)=>{
    try {
        const viewedAdmin= await adminFunc.viewAll()
        res.json({message:viewedAdmin})
    } catch (error) {
        console.log(error);
    }
})

router.post('/add',async(req,res)=>{
    try {
        const savedAdmin= await adminFunc.register(req.body)
        res.json({message:savedAdmin})
    } catch (error) {
        res.status(400).json({error:error})
    }
    
})


module.exports=router