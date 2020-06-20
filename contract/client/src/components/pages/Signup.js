import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import  DividerExampleVerticalForm  from '../SignupForm'
import{ Link } from 'react-router-dom'


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
			<div>
				<div className="SignUpPhoto"
           		 style={{
                backgroundImage:
                `url('https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1660&q=80')`
            		}}>
				<div className="NavContainer">
					<div>
						<h1 className="NavName">LOGO</h1>
					</div>
					<div className="NavLinks">
						<Link className="AboutLink">ABOUT</Link>
						<Link className="SearchLink">SEARCH</Link>
					</div>
				</div>
				<div className="DividerContainer">
					<div className="Signup-login-divider"> < DividerExampleVerticalForm /> </div>
				</div>
				</div>
        	</div>



            <h2>signup</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button>submit</button>
				<button onClick={logout}>logout</button>
			</form> 

		
		</div>
		
	)
}