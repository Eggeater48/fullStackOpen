import {useState} from "react";
import loginService from '../services/login.js'


const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)

		try {
			const user = await loginService.login({
				username, password
			})
		}
	}

	return (
		<div>

			<h1>log in to application</h1>

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

export default Login