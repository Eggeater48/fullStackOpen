import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog.jsx";
import loginService from "./services/login.js";
import Login from "./components/Login.jsx";
import Togglable from "./components/Togglable.jsx";
import CreateNew from "./components/CreateNew.jsx";
import Notification from "./components/Notification.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationButOnATimer } from "./reducers/notificationReducer.js";
import {
  createBlog,
  deleteBlogButWayBetter,
  initialBlogs,
  sortBlogs,
  voteBlogAndSortBlogsHandy2In1,
} from "./reducers/blogReducer.js";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedInUser");
    if (user === "undefined") {
      window.localStorage.removeItem("loggedInUser");
      setUser(null);
    }
  }, []);

  useEffect(() => {
    dispatch(initialBlogs());
  }, []);

  useEffect(() => {
    dispatch(sortBlogs());
  }, []);

  const handleNew = async (blogObject) => {
    try {
      // i wanted to put this into the createNew component but the refs got confusing so i just put it here for the time being
      const result = dispatch(createBlog(blogObject));

      if (result === undefined) {
        dispatch(
          setNotificationButOnATimer({
            message: "Error : Expired Token, please log back in",
            type: "error",
          }),
        );
      } else {
        blogFormRef.current.toggleVisibility();

        dispatch(
          setNotificationButOnATimer({
            message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
            type: "blog",
          }),
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setNotificationButOnATimer({
          message: "Internal Server Error",
          type: "error",
        }),
      );
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await dispatch(deleteBlogButWayBetter(blog));
    }
  };

  const handleLike = async (blog) => {
    await dispatch(voteBlogAndSortBlogsHandy2In1(blog));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      if (user === undefined) {
        await dispatch(
          setNotificationButOnATimer({
            message: "Wrong username or password",
            type: "error",
          }),
        );
      } else {
        window.localStorage.setItem("loggedInUser", JSON.stringify(user));
        setUser(user);
        setUsername("");
        setPassword("");
      }
    } catch (exception) {
      await dispatch(
        setNotificationButOnATimer({
          message: "Wrong credentials",
          type: "error",
        }),
      );
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    await window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div>
      {user === null && (
        <Login
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      )}

      {user !== null && (
        <div>
          <h2>blogs</h2>

          <Notification />

          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable
            buttonLabel={"create new blog"}
            cancelButtonLabel={"cancel"}
            ref={blogFormRef}
          >
            <CreateNew handleNew={handleNew} data-testid={"newBlog"} />
          </Togglable>

          <Blog handleDelete={handleDelete} handleLike={handleLike} />
        </div>
      )}
    </div>
  );
};

export default App;
