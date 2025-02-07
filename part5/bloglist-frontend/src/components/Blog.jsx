import {useEffect, useState} from "react";
import blogService from "../services/blogs.js";
import CreateNew from "./CreateNew.jsx";

const Blog = ( { user, onLogout } ) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
  blogService.getAll().then(blogs =>
    setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={onLogout}>logout</button>
      </p>

      <CreateNew />

      {blogs.map(blog =>
        <div key={blog.id}>{blog.title} {blog.author}</div>
      )}

    </div>
  )
}
  export default Blog