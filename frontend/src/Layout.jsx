import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router'
import Footer from './components/Footer'

export default function Layout() {
  return (
    <div  >
        <NavBar/>
        <Outlet/>
        <Footer/>        
    </div>
  )
}
