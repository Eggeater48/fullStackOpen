import React, {useEffect, useState} from "react";
import blogService from "../services/blogs.js";
import CreateNew from "./CreateNew.jsx";
import DataDisplay from "./DataDisplay.jsx";

const Blog = ( { user, onLogout, messageHandler, message } ) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
  blogService.getAll().then(blogs =>
    setBlogs(blogs)
    )
  }, [])

  const handleNew = (blog) => {
    setBlogs(blogs.concat(blog))
  }

  return (
    <div>
      <h2>blogs</h2>

      {message !== null && <DataDisplay message={message}/>}

      <p>
        {user.name} logged in <button onClick={onLogout}>logout</button>
      </p>

      <CreateNew messageHandler={messageHandler} blogHandler={handleNew} />

      {blogs.map(blog =>
        <div key={blog.id}>{blog.title} {blog.author}</div>
      )}

    </div>
  )
}
  export default Blog