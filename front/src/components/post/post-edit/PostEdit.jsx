import Header from "../../header/Header"
import { useState, useEffect } from "react"
import PostForm from "../PostForm"
import { navigate } from "react-router-dom"

export default function PostEdit(){
  const navigate = useNavigate()
  const [data, setData] = useState({})

  const handleEdit = async (data) => {
    try {
      const path = window.location.pathname;
      const segments = path.split('/');
      const id = segments[segments.length - 1];
  
      const response = await fetch("http://localhost:3000/posts/"+id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigate("/admin/posts");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 1];

    const getPost = async () => {
      const response = await fetch("http://localhost:3000/posts/"+id)
      const data = await response.json()
      setData(data)
    }
    getPost()
  }, [])

  return (
    <div>
      <Header />
      <h1>Edit Post</h1>
      <PostForm data={data} handleEdit={handleEdit}/>
    </div>
  )
}