import React from "react";
import CreateNew from "./CreateNew.jsx";
import DataDisplay from "./DataDisplay.jsx";
import Togglable from "./Togglable.jsx";
import Bloggable from "./Bloggable.jsx";
import PropTypes from "prop-types";

const Blog = ({
    blogs,
    user,
    onLogout,
    messageHandler,
    message,
    handleNew,
    handleDelete,
    handleLike,
    ref
  }) => {
  return (
    <div>
      <h2>blogs</h2>

      {message !== null && <DataDisplay message={message}/>}

      <p>
        {user} logged in <button onClick={onLogout}>logout</button>
      </p>

      <Togglable buttonLabel={'create new blog'} ref={ref}>
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
  user: PropTypes.string.isRequired,
  blogs: PropTypes.object.isRequired
}

export default Blog