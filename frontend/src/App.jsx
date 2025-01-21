import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import NavBar from './components/NavBar'
import Layout from './Layout'
import Hero from './components/Hero'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
const router = createBrowserRouter( createRoutesFromElements(
   <Route>
      <Route path='/' element={<Layout/>} >
       <Route path='/' element = {<Hero />} />
      </Route>
       <Route path='/login' element = {<LoginPage />} />
       <Route path='/sign-up' element = {<SignupPage />} />
   </Route> 
)) 

function App() {
  return(
      <RouterProvider router={router}/>
  )
}

export default App