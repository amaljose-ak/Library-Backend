const router = require('express').Router()
const bookFunction = require('../../function/admin/admin')
const adminFunc = require('../../function/admin/admin')
const verify = require('../../function/middleware/jwt verify')
const { BookValidation } = require('../../function/admin/adminValidation')

router.get('/', verify, (req, res) => {
    res.send('hello all')
})
router.post('/addBook', verify, async (req, res) => {
    const verifyb = await adminFunc.checkAdmin(req.verified)
    

    if (verifyb.isAdmin === true) {
        const { error } = BookValidation(req.body)
        return res.json({ error: error.details[0].message
        })
    }
    const addedBook=await adminFunc.addProduct(req.body)
    return res.json({
        message:addedBook.message,
        name:addedBook.name,
        language:addedBook.language,
        _id:addedBook._id


    })

})









module.exports = router