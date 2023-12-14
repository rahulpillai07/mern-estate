import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/Signout"
import SignIn from "./pages/Signin"
import About from "./pages/About"



export default function App() {
  return(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route path="/about" element={<About/>}/>
  </Routes>
  </BrowserRouter>
  )
}