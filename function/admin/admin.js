const modelAdmin = require('../../model/adminModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const bookModel = require('../../model/Book')



const adminFunction = {
  register: async (data) => {
    const adminExist = await modelAdmin.findOne({
      name: data.name,
    })
    if (adminExist) return "admin Exist"


    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(data.password, salt)
    try {
      const adminRegistration = new modelAdmin({
        name: data.name,
        email: data.email,
        password: hashedPass
      })

      const saveAdmin = await adminRegistration.save()
      console.log(saveAdmin);
      return saveAdmin
    } catch (error) {
      console.log(error);
    }
  },
  Login: async (data) => {
    const adminEx = await modelAdmin.findOne({ email: data.email })
    if (!adminEx) {
      return {
        statuscode: 401,
        message: 'no account found',
        success: false,
        token: false

      }
    }

    const isVerified = await bcrypt.compare(data.password, adminEx.password)
    console.log(isVerified);
    if (!isVerified) {

      return {
        statuscode: 401,
        message: "credentials missmatch",
        success: false,
        token: false
      }
    } else {
      try {
        const tolken = await jwt.sign({ _id: adminEx._id }, process.env.SC)
        return {
          statuscode: 200,
          message: 'login succesfully',
          success: true,
          token: tolken
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  viewAll: async () => {
    try {
      const viewAdmin = await modelAdmin.find()
      return viewAdmin
    } catch (error) {
      console.log(error)
    }

  },
  updateAdmin: async (data, body) => {
    try {
      const adminE = await modelAdmin.findById(data.id)
      if (adminE) {
        const updateAdminId = await modelAdmin.updateOne({ _id: data.id }, { $set: { name: body.name, email: body.email, password: body.password } })
        //  console.log(updateAdminId)
        return {
          message: "User Updated Succesfully", updateAdminId
        }
      } else {
        return {
          message: "oh error faced while updating"
        }
      }

    } catch (error) {
      console.log(error);
    }

  },
  deleteAdmin: async (data) => {
    const removeAdmin = await modelAdmin.deleteOne({ _id: data})
    console.log(removeAdmin)
    return {
      message: "admin deleted succesfully", removeAdmin
    }
  },
  checkAdmin: async (check) => {
    const doCheck = await modelAdmin.findOne({ _id:check })
    // console.log(check);
    console.log(doCheck);
    if(doCheck){
      return {
        isAdmin:true,
        name:check.name,
        email:check.email
      }
    
    }else{
      console.log('You are not authorized to perform this action.');
    }
 
  },
  addProduct: async (product) => {
    let itemExist = await bookModel.findOne({
      name: product.name
    })
    if (itemExist) return {
      message: "Item exist",
      name: product.name,
      _id: null
    }
    try {
      const books = new bookModel({
        name: product.name,
        auther: product.auther,
        language: product.language,
        _id: product._id
      })

      const savedBook = await books.save()
      return {
        message: 'Book added Succesfully',
        name: savedBook.name,
        language: savedBook.language,
        _id: savedBook._id
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateBook: async (data, body) => {
    let isProduct = false
    const newproduct = await bookModel.findById(data.id)
    console.log(data.id)
    if (newproduct) {
      isProduct = true
    } else {
      return {
        message: "no item found"
      }
    }
    
    if (isProduct === true) {

      const updateBook = await bookModel.updateOne({ _id: data.id },
        { $set: { name: body.name, auther: body.auther, language: body.language } })
      return {
        message: "Book Updated",updateBook
      }

    }


  },
  viewBooks: async () => {
    const viewproduct = await bookModel.find()
    return viewproduct
  },
  deleteBook: async (data) => {
    const deleted = await bookModel.deleteOne({ _id: data })
    return {
      message: "deleted successfully", deleted
    }
  }
}

module.exports = adminFunction