const userModel = require('../../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")






const userfunction = {
    register: async (data) => {
        const userExist = await userModel.findOne({
            email: data.email
        })
        if (userExist) return "user exist"

        const salt = await bcrypt.genSalt(10)
        const hahpedpass = await bcrypt.hash(data.password, salt)
        try {
            const userReg = new userModel({
                name: data.name,
                email: data.email,
                password: hahpedpass
            })
            const saveuser = await userReg.save()
            console.log(saveuser);
            return saveuser
        } catch (error) {
            console.log(error);
        }
    },
    loginUser: async (data) => {
        const userExists = await userModel.findOne({ email: data.email });

        if (!userExists) {
            return {
                statuscode: 401,
                message: 'no account found',
                success: false,
                token: false
            };
        }

        const isverified = await bcrypt.compare(data.password, userExists.password);
        if (!isverified) {
            return {
                statuscode: 401,
                message: 'Credentials missmatch',
                success: false,
                token: false
            };
        } else {
            try {
                const token = jwt.sign({ _id: userExists.id }, process.env.SC);
                return {
                    statuscode: 200,
                    message: 'Login succesfully',
                    success: true,
                    token: token
                };
            } catch (error) {
                return {
                    statuscode: 500,
                    message: 'Error generating token',
                    success: false,
                    token: false
                };
            }
        }
    },
    viewUser: async (data) => {
        const viewusers = await userModel.find()
        return viewusers
    },
    checkUser: async (check) => {
        const doCheck = await userModel.findOne({ _id: check });
        console.log(doCheck);
        if (doCheck) {
            return {
                isUser: true,
            };
        }
        return {
            isUser: false,
        };
    },
    updateUser: async (data, user) => {
        const users = await userModel.findById(data._id)
        if (user) {
            const updateusers = await userModel.updateOne({ _id: data.id }, { $set: { name: user.name, email: user.email, password: user.password } })
            console.log(updateusers);
            return {
                message: "user updated succesfully"
            }
        } else {
            return {
                message: "some error occured while updating"
            }
        }
    },
    deleteuser: async (data) => {
        const deletedata = await userModel.deleteOne({ _id: data });
        return {
          message: "user deleted successfully",
        };
      },
    

}


module.exports = userfunction
