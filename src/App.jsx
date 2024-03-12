import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home';
import Edit from './Components/Edit';
import Welcome from './Components/Welcomepage';

function App() {
 

  return (
    <>


  
  <Router>
    <Routes>
    <Route path='/' element={<Welcome />} />
    <Route path='/signup' element={<Signup />} />
   <Route path='/login' element={<Login />} />
   <Route path='/home' element={<Home />} />
   <Route path='/edit' element={<Edit />} />
   
    </Routes>
    
  </Router>
    </>
  )
}

export default App
