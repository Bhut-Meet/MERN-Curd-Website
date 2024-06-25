require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors= require('cors')
const UserModel = require('./models/Users')

const app = express()

app.use(express.json())
// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/crud")

if(process.env.MONGODB_URI){
    mongodbUrl=process.env.MONGODB_URI;
    }
function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://mern-curd-website.vercel.app'); // Replace with your Vercel domain
    res.setHeader('Access-Control-Allow-Methods', "GET", "HEAD","PUT","PATCH","POST","DELETE"); // Common HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Common allowed headers
    next();
  }



const corsOptions={
    // origin: ["http://localhost:5173"],
    origin: "https://mern-curd-website.vercel.app",
    // origin: "https://websitedevelopmentservices.vercel.app",
    // origin:"https://websitedevelopmentservices.vercel.app", // Replace with allowed origins from environment variable or default to Vercel domain
    methods: ["GET", "HEAD","PUT","PATCH","POST","DELETE"],
    Credential:true,
}

app.use(cors(corsOptions));
app.use(corsMiddleware)

app.get("/", (req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/getUser/:id",  (req,res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put("/updateUser/:id",  (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{name:req.body.name, email:req.body.email, age:req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete("/deleteUser/:id",  (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})


app.post("/createUser", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("Server is running on port 3001")
})