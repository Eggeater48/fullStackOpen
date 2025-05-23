import React, {useState, useEffect, useRef} from 'react'
import Blog from "./components/Blog.jsx";
import loginService from "./services/login.js";
import Login from "./components/Login.jsx";
import blogService from "./services/blogs.js";
import Togglable from "./components/Togglable.jsx";
import CreateNew from "./components/CreateNew.jsx";
import DataDisplay from "./components/DataDisplay.jsx";

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    const user = window.localStorage.getItem('loggedInUser')
    if (user === "undefined") {
      window.localStorage.removeItem('loggedInUser')
      setUser(null)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.toSorted((a, b) => {
        return b.likes - a.likes
      })
      setBlogs(sortedBlogs)
    })
  }, [])

  const handleNew = async (blogObject) => {
    try {
      const result = await blogService.createNew(blogObject)

      console.log(result)

      if (result === undefined) { // This part looks kinda disgusting but idk what to do really 🐸😥
        messageHandler({
            message : 'Error : Expired Token, please log back in',
            type : "error"
          }
        )
      } else {
        setBlogs(blogs.concat(result))
        blogFormRef.current.toggleVisibility()

        messageHandler({
            message : `a new blog ${blogObject.title} by ${blogObject.author} added`,
            type : "blog"
          }
        )
      }
    } catch (error) {
      console.log(error)
      messageHandler({
          message : 'Internal Server Error',
          type : "error"
        }
      )
    }
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

      const sortedBlogs = newBlog.toSorted((a, b) => {
        return b.likes - a.likes
      })

      setBlogs(sortedBlogs)
    } else {
      await messageHandler({
        'message': 'Backend Error',
        'type': 'error'
      })
    }
  }

  const messageHandler = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      if (user === undefined) {
        await messageHandler({
          message: "Wrong username or password",
          type: "error"
        })
      } else {
        window.localStorage.setItem(
          'loggedInUser', JSON.stringify(user)
        )
        setUser(user)
        setUsername('')
        setPassword('')
      }
    } catch (exception) {
      await messageHandler({
          message: 'Wrong credentials',
          type: 'error'
        }
      )
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    await window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  return (
    <div>
      {user === null && <Login
        handleLogin={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        message={message}
      />}

      {user !== null &&
        <div>
          <h2>blogs</h2>

          {message !== null && <DataDisplay message={message}/>}

          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable
            buttonLabel={'create new blog'}
            cancelButtonLabel={'cancel'}
            ref={blogFormRef}>
            <CreateNew
              handleNew={handleNew}
              data-testid={'newBlog'}
            />
          </Togglable>

          <Blog
            blogs={blogs}
            handleDelete={handleDelete}
            handleLike={handleLike}
          />
        </div>}
    </div>
  )
}

export default App