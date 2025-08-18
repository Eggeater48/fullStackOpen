import { useState } from "react";

const Bloggable = ({ blog, likeHandler, deleteHandler }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <button onClick={toggleVisibility}>
        {!showDetails ? "view" : "hide"}
      </button>

      {showDetails && (
        <div>
          {blog.url}
          <br />
          <div data-testid={"blog-likes"}>
            likes {blog.likes}
            <button onClick={() => likeHandler(blog)}>like</button>
          </div>

          {blog.user.length > 0 && blog.user[0].name}

          {blog.user[0].id ===
            JSON.parse(window.localStorage.getItem("loggedInUser")).id && (
            <>
              <br />
              <button onClick={() => deleteHandler(blog)}>remove</button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Bloggable;
