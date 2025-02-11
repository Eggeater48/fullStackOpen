import React, { useState, useEffect } from 'react'
import Blog from "./components/Blog.jsx";
import loginService from "./services/login.js";
import DataDisplay from "./components/DataDisplay.jsx";

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
      setUser(user)
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

    const LoginForm = () => {
      return (
        <div>

          <h1>log in to application</h1>

          {message !== null && <DataDisplay message={message}/>}

          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({target}) => setUsername(target.value)}
              />
            </div>

            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({target}) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        {user === null && LoginForm()}
        {user !== null && <Blog user={user} onLogout={handleLogout} messageHandler={messageHandler} message={message}/>}
      </div>
    )
}

export default App