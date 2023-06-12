import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import List from './pages/list/List.jsx'
import Hotel from './pages/hotel/Hotel.jsx'
import Login from './pages/login/login.jsx'
import Reg from './pages/registration/reg'

function App() {


  return (

    <BrowserRouter>
      <Routes>


         <Route path ='/' element={<Home/>}/>
         <Route path ='/hotels' element={<List/>}/>
         <Route path ='/hotels/:id' element={<Hotel/>}/>
         <Route path ='/login' element ={<Login/>}/>
         <Route path ='/register' element ={<Reg/>}/>


      </Routes>

    </BrowserRouter>
  )
}

export default App

