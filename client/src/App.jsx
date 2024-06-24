// import { useState } from 'react'
// import './App.css'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users></Users>}></Route>
          <Route path='/create' element={<CreateUser></CreateUser>}></Route>
          <Route path='/update/:id' element={<UpdateUser></UpdateUser>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
