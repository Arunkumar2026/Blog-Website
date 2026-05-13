import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"



import Home from "./pages/Home"
import Login from "./pages/Login"
import Singup from "./pages/Singup"
import CreateBlog from "./pages/CreateBlog"
import EditBlog from "./pages/EditBlog"
import BlogDetails from "./pages/BlogDetails"
import Navbar from "./components/Navbar"


const AppContent = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  console.log(location.pathname)
  return (
    <>
    {!hideNavbar && <Navbar/>}
    <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Singup/>}/>
        <Route path="/create" element={<CreateBlog/>}/>
        <Route path="/edit/:id" element={<EditBlog/>}/>
        <Route path="/blog/:id" element={<BlogDetails/>}/>

      </Routes>
    </>
  )
}


function App() {
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  )
}

export default App
