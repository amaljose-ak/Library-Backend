const router = require('express').Router()
const bookFunction = require('../../function/admin/admin')
const adminFunc = require('../../function/admin/admin')
const verify = require('../../function/middleware/jwt verify')
const { BookValidation } = require('../../function/admin/adminValidation')


router.get('/', verify, async (req, res) => {
    const view = await adminFunc.viewBooks()
    res.json({ view })

})
router.post('/addBook', verify, async (req, res) => {
    const verifyb = await adminFunc.checkAdmin(req.verified)

    if (verifyb.isAdmin === true) {
        const { error } = BookValidation(req.body)
        return res.json({
            error: error.details[0].message
        })
    }
    const addedBook = await adminFunc.addProduct(req.body)
    return res.json({
        message: addedBook.message,
        name: addedBook.name,
        language: addedBook.language,
        _id: addedBook._id


    })

})




router.put('/updateBook/:id', verify, async (req, res) => {
    const verifybook = await adminFunc.checkAdmin(req.verified._id)
    if (verifybook.isAdmin === true) {
      
        try {
            const updateBooks = await bookFunction.updateBook(req.params, req.body)
            console.log(updateBooks);
            return res.json({
                message: updateBooks.message,
                name:verifybook.name,
                email:verifybook.email

            })
        } catch (error) { 
            console.log(error);
            res.json({ error })
        }

    }
})
 

router.delete('/delete/:id', verify, async (req, res) => {
    const verifydel = await adminFunc.checkAdmin(req.verified._id)
    if (verify.isAdmin === true) {
        const deletefnc = await bookFunction.deleteBook(req.params.id)
        res.json({
            message: deletefnc.message
        })
    }


})

module.exports = router