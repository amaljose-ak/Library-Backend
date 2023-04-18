const modelAdmin=require('../../model/adminModel')



const adminFunction={
    register: async(data)=>{
        try {
        const adminRegistration= new modelAdmin({
            name: data.name,
            email:data.email,
            password:data.password
        })
        
            const saveAdmin= await adminRegistration.save()
            console.log(saveAdmin);
            return saveAdmin
        } catch (error) {
            console.log(error);
        }
    },
    viewAll:async()=>{
      try {
        const viewAdmin= await modelAdmin.find()
        return viewAdmin
      } catch (error) {
        console.log(error)
      }
    }
}

module.exports=adminFunction