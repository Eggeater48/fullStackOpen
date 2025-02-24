import React, {useEffect, useRef, useState} from "react";
import blogService from "../services/blogs.js";
import CreateNew from "./CreateNew.jsx";
import DataDisplay from "./DataDisplay.jsx";
import Togglable from "./Togglable.jsx";
import Bloggable from "./Bloggable.jsx";
import PropTypes from "prop-types";

const Blog = ( { user, onLogout, messageHandler, message } ) => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => { // TODO make this rerender every time likes gets increased
    blogService.getAll().then(blogs => {
    const sortedBlogs = blogs.toSorted((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(sortedBlogs)
    })
  }, [])

  const handleNew = (blog) => {
    setBlogs(blogs.concat(blog))
    blogFormRef.current.toggleVisibility()
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id)
      setBlogs(
        blogs.filter(a => a.id !== blog.id)
      )
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      user :  blog.user[0].id,
      likes : blog.likes + 1,
      author : blog.author,
      title : blog.title,
      url : blog.url,
      id : blog.id
    }

    const result = await blogService.addLike(updatedBlog)

    if (result !== undefined) {
      const newBlog = blogs.map((blog, i) => {
        if (i === blogs.findIndex(x => x.title === result.title)) {
          return {
            author : blog.author,
            id : blog.id,
            likes : blog.likes + 1,
            title : blog.title,
            url : blog.url,
            user : blog.user
          }
        } else {
          return blog
        }
      })
      setBlogs(newBlog)
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
          <Bloggable blog={blog} likeHandler={handleLike} deleteHandler={handleDelete}></Bloggable>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  messageHandler: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
}

export default Blog