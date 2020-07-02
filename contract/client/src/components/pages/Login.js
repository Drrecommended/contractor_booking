import React, { useState } from 'react';
import { useAuth } from '../../hooks'
import { signUpDivider } from '../SignupForm'

export default (props) => {
	const { login, logout } = useAuth()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	function handleSubmit(e) {
		e.preventDefault()
		login(username, password).then(resp => {
			props.history.push('/search')
		})
	}
	return (
		<div className="Login">
			<form onSubmit={handleSubmit}>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button>submit</button>
				<button onClick={logout}>logout</button>
			</form>
			<div><signUpDivider/></div>
		</div>
	)
}