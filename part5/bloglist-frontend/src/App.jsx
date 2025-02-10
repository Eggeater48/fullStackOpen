import React, { useState, useEffect } from 'react'
import Blog from "./components/Blog.jsx";
import loginService from "./services/login.js";
import DataDisplay from "./components/DataDisplay.jsx";

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const user = window.localStorage.getItem('loggedInUser')
    if (user === "undefined") {
      window.localStorage.removeItem('loggedInUser')
    } else {
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      if (user === undefined) {
        setMessage({
          message : "Wrong username or password",
          type : "error"
        })
        console.log(message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      } else {
        window.localStorage.setItem(
          'loggedInUser', JSON.stringify(user)
        )
        setUser(user)
        setUsername('')
        setPassword('')
      }
    } catch (exception) {
      setMessage(
        {
          message : 'Wrong credentials',
          type : 'error'
        }
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const LoginForm = () => {
    return (
      <div>

        <h1>log in to application</h1>

        { message !== null && <DataDisplay message={message} /> }

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      { user === null && LoginForm() }
      { user !== null && <Blog user={user} onLogout={handleLogout} /> }
    </div>
  )
}

export default App


