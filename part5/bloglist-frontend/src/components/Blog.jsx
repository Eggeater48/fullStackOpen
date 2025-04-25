import PropTypes from "prop-types";
import Bloggable from "./Bloggable.jsx";

const Blog = ( { blogs, handleLike, handleDelete } ) => {
  return (
    <>
      {blogs.map(blog =>
        <div className={'blog'} key={blog.id} data-testid={'custom-element'}>
          {blog.title} {blog.author}

          <Bloggable
            blog={blog}
            likeHandler={handleLike}
            deleteHandler={handleDelete}
          />
        </div>)}
    </>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blog