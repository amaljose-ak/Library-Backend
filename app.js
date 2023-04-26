const express=require('express')
const dotenv=require('dotenv/config')
const Db= require('./db/db')
const adminRouter=require('./routes/admin/admin')
const BookRouter=require('./routes/admin/books')
const userRouter=require('./routes/user/user')
const bodyparser=require('body-parser')
const app=express()
Db()


// require and import path
app.use(bodyparser.json())
app.use('/api/admin',adminRouter)
app.use('/api/books',BookRouter)
app.use('/api/user',userRouter)



const port=process.env.PORT

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})