const joi =require('joi')


const userValidation=(data)=>{
const value= joi.object({
    name: joi.string().required().min(4).max(15),
    email:joi.string().required().email().min(5).max(21),
    password: joi.string().required().min(4).max(10)
})
return value.validate(data)
}
module.exports.userValidation=userValidation