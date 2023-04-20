const mongoose=require('mongoose')


const BookSchema=new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    auther: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    language: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
  

})
module.exports = mongoose.model('books', BookSchema)
