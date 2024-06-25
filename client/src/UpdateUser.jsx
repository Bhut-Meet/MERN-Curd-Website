import {useState,useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import axios from "axios"

export default function UpdateUser() {
    const {id} = useParams()
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [age,setAge] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()

    const API = `https://mern-curd-website.onrender.com`;

    useEffect(()=> {
        axios.get(`${API}/getUser/`+id)
        .then(result => {
            console.log(result)
            const {name,email,age,password} = result.data
            setName(name)
            setEmail(email)
            setAge(age)
            setPassword(password)
        })
        .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put(`${API}/updateUser/`+id , {name, email, age})
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
                    <h2 className="card-title">Update User</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleUpdate}>
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
                        <button type="submit" className="btn btn-success">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
} 
