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


// Define CORS options
const corsOptions = {
    origin: "https://mern-curd-website.vercel.app", // Replace with your Vercel domain
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
};


app.use(express.json());

app.use(cors(corsOptions));

// Routes
app.get("/" , (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get("/getUser/:id" , (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.put("/updateUser/:id" , (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.delete("/deleteUser/:id" , (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post("/createUser" , (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})
