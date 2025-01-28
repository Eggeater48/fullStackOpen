import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from "./components/Login.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  if (user === null) {
    return (
      <div>
        <Login></Login>
      </div>
    )
  }
}

export default App

/*
<h2>blogs</h2>
{blogs.map(blog =>
  <Blog key={blog.id} blog={blog} />
)}*/
