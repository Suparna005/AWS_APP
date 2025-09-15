import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import { Route, Routes } from 'react-router-dom'
import Addblog from './components/Addblog'
import Blogs from './components/Blogs'
import PrivateRoute from './components/PrivateRoute'
import BlogDetails from './components/BlogDetails'

const App = () => {
  return (
    <div>
      <Navbar/>
     <Routes>
      <Route element={<PrivateRoute/>}>
      <Route path='/add' element={<Addblog/>}></Route>
      </Route>
      <Route path='/' element={<Blogs/>}></Route>
      <Route path='/Login'element={<Login/>}></Route>
       <Route path='/:id' element={<BlogDetails />}></Route>
      <Route path='/signup'element={<Register/>}></Route>

     </Routes>
    </div>
  )
}

export default App
