const mongoose=require('mongoose')

const dbconnect=()=>mongoose.connect(process.env.DB).then(()=>{
    console.log('connected to DataBase')
}).catch((err)=>{
    console.log(err);
})
module.exports=dbconnect

