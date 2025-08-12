import Bloggable from "./Bloggable.jsx";
import { useSelector } from "react-redux";

const Blog = ({ handleLike, handleDelete }) => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div data-testid={"blogs"}>
      {blogs.map((blog) => (
        <div className={"blog"} key={blog.id} data-testid={"custom-element"}>
          {blog.title} {blog.author}
          <Bloggable
            blog={blog}
            likeHandler={handleLike}
            deleteHandler={handleDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default Blog;
