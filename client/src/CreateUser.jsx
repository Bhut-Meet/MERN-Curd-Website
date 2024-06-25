import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function CreateUser() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [age,setAge] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()

    const API = `https://mern-curd-website.onrender.com`;

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`${API}/createUser`, {name, email, age,password},
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="container-fluid">
    <div className="row justify-content-center mt-5">
        <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2 className="card-title">Add User</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" id="name" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" id="age" className="form-control" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
