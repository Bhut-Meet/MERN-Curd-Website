import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Users() {
    const [users, setUsers] = useState([]);
    const API = `https://mern-curd-website.onrender.com`;

    useEffect(() => {
        axios.get(`${API}/`)
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${API}/deleteUser/` + id)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex vh-auto bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3 m-3'>
                <Link to="/create" className='btn btn-success mb-3'>Add user</Link>
                <table className='table table-dark text-center'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>{user.password}</td> {/* Placeholder for password */}
                                    <td>
                                        <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link> &nbsp;
                                        <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
