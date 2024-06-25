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

// Define CORS options
const corsOptions = {
    origin: "https://mern-curd-website.vercel.app", // Replace with your Vercel domain
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
};

// CORS middleware function
function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://mern-curd-website.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.get("/", corsMiddleware, (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get("/getUser/:id", corsMiddleware, (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.put("/updateUser/:id", corsMiddleware, (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.delete("/deleteUser/:id", corsMiddleware, (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post("/createUser", corsMiddleware, (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
