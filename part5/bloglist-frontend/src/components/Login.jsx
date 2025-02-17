import DataDisplay from "./DataDisplay.jsx";
import React from "react";

const Login = ({
   handleLogin,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password,
	 message
	}) => {
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
						onChange={handleUsernameChange}
					/>
				</div>

				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}


export default Login