const modelAdmin = require('../../model/adminModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")



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
    const adminEx = await modelAdmin.findOne({ email:data.email })
    if (!adminEx) {
      return {
        statuscode: 401,
        message: 'no account found',
        success: false,
        token: false

      }
    }

    const isVerified= await bcrypt.compare(data.password,adminEx.password)
    console.log(isVerified);
    if(!isVerified){
    
      return{ 
        statuscode:401,
        message:"credentials missmatch",
        success:false,
        token:false
      }
    }else{
      try {
        const tolken= await jwt.sign({_id:adminEx._id},process.env.SC)
        return {
          statuscode:200,
          message:'login succesfully',
          success:true,
          token:tolken
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
  deleteAdmin:async(data)=>{
    const removeAdmin= await modelAdmin.deleteOne({_id:data})
    console.log(removeAdmin)
    return {
      message:"admin deleted succesfully",removeAdmin
    }
  }
}

module.exports = adminFunction