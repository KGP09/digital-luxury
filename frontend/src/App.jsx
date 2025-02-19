import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import NavBar from './components/NavBar'
import Layout from './Layout'
import Hero from './components/Hero'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import {Toaster} from "react-hot-toast"
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import HotelsDisplay from './components/HotelsDIsplay'
import HotelDisplay from './components/HotelDisplay'

const router = createBrowserRouter( createRoutesFromElements(
   <Route>
      <Route path='/' element={<Layout/>} >
       <Route path='/' element = {<Hero />} />
       <Route path='/hotels/:city_code' element = {<HotelsDisplay />} />
       <Route path='/hotels/:city_code/:hotel_code' element = {<HotelDisplay />} />
      </Route>
       <Route path='/login' element = {<LoginPage />} />
       <Route path='/sign-up' element = {<SignupPage />} />
   </Route>
)) 

function App() {
  const {checkAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth()
  } , [checkAuth])
  return(
    <>
      <Toaster />
      <RouterProvider router={router}/>
    </>
  )
}

export default App