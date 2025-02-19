import React, {useEffect, useRef, useState} from "react";
import blogService from "../services/blogs.js";
import CreateNew from "./CreateNew.jsx";
import DataDisplay from "./DataDisplay.jsx";
import Togglable from "./Togglable.jsx";
import Bloggable from "./Bloggable.jsx";

const Blog = ( { user, onLogout, messageHandler, message } ) => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()
  const blogRef = useRef()

  useEffect(() => {
  blogService.getAll().then(blogs =>
    setBlogs(blogs)
    )
  }, [])

  const handleNew = (blog) => {
    setBlogs(blogs.concat(blog))
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>blogs</h2>

      {message !== null && <DataDisplay message={message}/>}

      <p>
        {user} logged in <button onClick={onLogout}>logout</button>
      </p>

      <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
        <CreateNew
          messageHandler={messageHandler}
          blogHandler={handleNew}
        />
      </Togglable>

      {blogs.map(blog =>
        <Bloggable ref={blogRef} blog={blog}></Bloggable>
      )}

    </div>
  )
}

export default Blog