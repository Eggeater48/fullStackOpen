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
  }) => {
  return (
    <>
      <h2>blogs</h2>

      {message !== null && <DataDisplay message={message}/>}

      <p>
        {user} logged in <button onClick={onLogout}>logout</button>
      </p>

      <Togglable buttonLabel={'create new blog'}>
        <CreateNew
          messageHandler={messageHandler}
          blogHandler={handleNew}
        />
      </Togglable>

      {blogs.map(blog =>
        <div className={'blog'} key={blog.id} data-testid={'custom-element'}>
          {blog.title} {blog.author}
          <Bloggable blog={blog} likeHandler={handleLike} deleteHandler={handleDelete}></Bloggable>
        </div>
      )}
    </>
  )
}

Blog.propTypes = {
  user: PropTypes.string.isRequired,
  blogs: PropTypes.array.isRequired
}

export default Blog