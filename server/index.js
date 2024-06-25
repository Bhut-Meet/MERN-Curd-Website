require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users'); // Adjust the path as necessary

const app = express();

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

// CORS middleware function
// function corsMiddleware(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*")
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Max-Age", "1800");
// res.setHeader("Access-Control-Allow-Headers", "content-type");
//     next();
// }

function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://mern-curd-website.vercel.app'); // Replace with your Vercel domain
    res.setHeader('Access-Control-Allow-Methods', "GET", "HEAD","PUT","PATCH","POST","DELETE"); // Common HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Common allowed headers
    next();
  }

const corsOptions={
    // origin: ["http://localhost:5173"],
    origin: ["http://localhost:5173", "https://mern-curd-website.vercel.app"],
    // origin: "https://websitedevelopmentservices.vercel.app",
    // origin:"https://websitedevelopmentservices.vercel.app", // Replace with allowed origins from environment variable or default to Vercel domain
    methods: ["GET", "HEAD","PUT","PATCH","POST","DELETE"],
    Credential:true,
}


// Define CORS options
// const corsOptions = {
//     origin: "https://mern-curd-website.vercel.app", // Replace with your Vercel domain
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//     credentials: true,
// };



app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.get("/"  ,  corsMiddleware,  (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get("/getUser/:id"  ,  corsMiddleware,  (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.put("/updateUser/:id"  ,  corsMiddleware,  (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.delete("/deleteUser/:id"  , corsMiddleware,   (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post("/createUser"  , corsMiddleware,   (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

const PORT =process.env.PORT || 3001;
connectDb().then(()=>{
    app.listen(PORT, () => {
        console.log('server is running on port ' + PORT);
        // console.log(`server is running on port: ${PORT}`);
    });
});
