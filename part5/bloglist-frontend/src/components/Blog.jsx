import React, {useEffect, useRef, useState} from "react";
import blogService from "../services/blogs.js";
import CreateNew from "./CreateNew.jsx";
import DataDisplay from "./DataDisplay.jsx";
import Togglable from "./Togglable.jsx";
import Bloggable from "./Bloggable.jsx";

const Blog = ( { user, onLogout, messageHandler, message } ) => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
  blogService.getAll().then(blogs =>
    setBlogs(blogs)
    )
  }, [])

  const handleNew = (blog) => {
    setBlogs(blogs.concat(blog))
    blogFormRef.current.toggleVisibility()
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      user : blog.user[0].id,
      likes : blog.likes++,
      author : blog.author,
      title : blog.title,
      url : blog.url
    }

    const result = await blogService.addLike(updatedBlog)

    if (result !== undefined) {
      console.log(result)
    } else {
      messageHandler({
        'message' : 'Backend Error',
        'type' : 'error'
      })
    }
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
        <div className={'blog'} key={blog.id}>
          {blog.title} {blog.author}
          <Bloggable blog={blog} likeHandler={handleLike}></Bloggable>
        </div>
      )}
    </div>
  )
}

export default Blog