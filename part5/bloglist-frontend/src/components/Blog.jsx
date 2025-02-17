import React, {useEffect, useState} from "react";
import blogService from "../services/blogs.js";
import CreateNew from "./CreateNew.jsx";
import DataDisplay from "./DataDisplay.jsx";

const Blog = ( { user, onLogout, messageHandler, message } ) => {
  const [blogs, setBlogs] = useState([])
  const [createVisible, setCreateVisible] = useState(false)
  const hideWhenVisible = { display : createVisible ? 'none' : '' }
  const showWhenVisible = { display : createVisible ? '' : 'none' }

  useEffect(() => {
  blogService.getAll().then(blogs =>
    setBlogs(blogs)
    )
  }, [])

  const handleNew = (blog) => {
    setBlogs(blogs.concat(blog))
    setCreateVisible(false)
  }

  return (
    <div>
      <h2>blogs</h2>

      {message !== null && <DataDisplay message={message}/>}

      <p>
        {user} logged in <button onClick={onLogout}>logout</button>
      </p>

      <div style={hideWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>create new blog</button>
      </div>

      <div style={showWhenVisible}>
        <CreateNew
          messageHandler={messageHandler}
          blogHandler={handleNew}
        />
        <button onClick={() => setCreateVisible(false)}>cancel</button>
      </div>

      {blogs.map(blog =>
        <div key={blog.id} className={'blog'}>{blog.title} {blog.author}</div>
      )}

    </div>
  )
}
  export default Blog