const express=require('express')
require('dotenv').config()
const app=express()
const morgan=require('morgan')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const connectDB=require('./db/connection')
const usermodel=require('./Models/usermodel')
const userRoutes=require('./routes/userRoutes')
const blogmodel=require('./Models/blogmodel')
const blogRoutes=require('./routes/blogRoutes')
require('./db/connection')
const PORT=process.env.PORT ||4500

connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/users',userRoutes)
app.use('/blogs',blogRoutes)


app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`)
})