require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors= require('cors')
const UserModel = require('./models/Users')

const app = express()


// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/crud")

if(process.env.MONGODB_URI){
    mongodbUrl=process.env.MONGODB_URI;
    }
function corsMiddleware(req, res,) {

    headers("Access-Control-Allow-Origin", "https://mern-curd-website.vercel.app");
    headers( "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
      
  }



const corsOptions={
    // origin: ["http://localhost:5173"],
    origin: "https://mern-curd-website.vercel.app",
    // origin: "https://websitedevelopmentservices.vercel.app",
    // origin:"https://websitedevelopmentservices.vercel.app", // Replace with allowed origins from environment variable or default to Vercel domain
    methods: ["GET", "HEAD","PUT","PATCH","POST","DELETE"],
    Credential:true,
}
app.use(express.json())
app.use(cors(corsOptions));
// app.use(corsMiddleware)

app.get("/", corsMiddleware,  (req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/getUser/:id", corsMiddleware ,  (req,res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put("/updateUser/:id", corsMiddleware ,  (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{name:req.body.name, email:req.body.email, age:req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete("/deleteUser/:id", corsMiddleware ,  (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})


app.post("/createUser", corsMiddleware , (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("Server is running on port 3001")
})