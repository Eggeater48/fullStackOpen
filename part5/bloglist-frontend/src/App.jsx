import React, { useState, useEffect } from 'react'
import Blog from "./components/Blog.jsx";
import loginService from "./services/login.js";
import Login from "./components/Login.jsx";

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => { // should add automatic logout when the token has expired
    const user = window.localStorage.getItem('loggedInUser')
    if (user === "undefined") {
      window.localStorage.removeItem('loggedInUser')
    } else {
      setUser(JSON.parse(user))
    }
  }, [])

  const messageHandler = async (message) => {
    setMessage(
      message
    )
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
        {user !== null && <Blog
          user={user.name}
          onLogout={handleLogout}
          messageHandler={messageHandler}
          message={message}
        />}
      </div>
    )
}

export default App