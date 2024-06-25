import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Users() {
    const [users, setUsers] = useState([]);
    const API = `https://mern-curd-website.onrender.com`;

    useEffect(() => {
        axios.get(`${API}`)
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
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header bg-primary text-white'>
                            <h5 className='card-title'>User Management</h5>
                        </div>
                        <div className='card-body'>
                            <Link to="/create" className='btn btn-success mb-3'>Add User</Link>
                            <div className='table-responsive'>
                                <table className='table table-dark table-bordered table-striped text-center'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Age</th>
                                            <th>Password</th> {/* Placeholder for password */}
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.age}</td>
                                                <td>{user.password}</td> {/* Placeholder for password */}
                                                <td>
                                                    <Link to={`/update/${user._id}`} className='btn btn-success btn-sm me-2'>Update</Link>
                                                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(user._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
