
const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./Model/userModel');
const port=process.env.PORT || 1337

const crypto=require('crypto-js');
const jwt=require('jsonwebtoken');



const connection=async()=>
{
   const connect=await mongoose.connect("mongodb://localhost:27017/User1",{
    useNewUrlParser: true,
    useUnifiedTopology: true  
})
    if(connect)
    {
    console.log("connection Done");
    }else{
        console.log("Connection is lost");
    }
}
connection();

app.use(express.json())
app.use(cors());

app.listen(port,()=>
{
    console.log("server is okk");
})

//setup for live hosting

if(process.env.NODE_ENV==="production")
{
    app.use(express.static('crud/build'))
}
//end of live hosting
app.post('/api/register',async(req,res)=>
{
    const {name,email,password}=req.body;
    try {
        const encryptPassword=crypto.AES.encrypt(password,"secret").toString();
        const user=await User.create({name:name,email:email,password:encryptPassword});
        if(user)
        {
            res.json({status:"okk",user:user})
        }else{
            res.json({status:"not okk",})
        }
    } catch (error) {
        console.log(error)
    }
})
app.post('/api/login',async(req,res)=>
{
    console.log("I am Login")
    const {email,password}=req.body
    try {
        const existUser=await User.findOne({email:email})
        console.log("I am try")
        if(!existUser)
        {
            res.json({status:'not okk'})
        }else{
            console.log("I am original Password")
            const originalPassword=crypto.AES.decrypt(existUser.password,"secret").toString(crypto.enc.Utf8)
            console.log(originalPassword)
            if(
                password===originalPassword)
            {
                console.log("I am token")
                const accessToken=jwt.sign({name:existUser.name,email:existUser.email},"secret");
                res.json({status:"okk",existUser:existUser,message:"You are loged In",accessToken:accessToken})
            }
        }
    } catch (error) {
        console.log(error)
    }

})


