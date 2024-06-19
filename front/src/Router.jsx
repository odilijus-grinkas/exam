import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import components:
import Index from "./components/index/Index"
import Login from "./components/auth/login/Login"
import Register from "./components/auth/register/Register"
import Admin from "./components/admin/Admin"
import PostNew from "./components/post/post-new/PostNew"
import PostProfile from "./components/post/post-profile/PostProfile"
import PostEdit from "./components/post/post-edit/PostEdit"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/post/new" element={<PostNew />} />
        <Route path="/post/profile" element={<PostProfile/>}/>
        <Route path="/edit/:id" element={<PostEdit />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}