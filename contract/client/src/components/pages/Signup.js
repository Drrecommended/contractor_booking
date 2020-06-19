import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import  DividerExampleVerticalForm  from '../SignupForm'


export default (props) => {
	const { signup, logout } = useAuth()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	function handleSubmit(e) {
		e.preventDefault()
        signup(username, password)
        .then(resp => {
			props.history.push('/dashboard')
        })
        .catch(err => {
            console.log(err.data.message)
        })
	}
	return (
		<div className="Login">
            <h2>signup</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button>submit</button>
				<button onClick={logout}>logout</button>
			</form> 

		<div className="DividerContainer">
			<div className="Signup-login-divider"> < DividerExampleVerticalForm /> </div>
		</div>
		</div>
		
	)
}