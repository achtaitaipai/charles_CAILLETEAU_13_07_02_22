import { Navigate, useNavigate } from 'react-router-dom'
import { signInPost, setToken } from '../features/signIn'
import { isLogged } from '../utils/selector'
import { useStore, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function SignIn() {
	const store = useStore()
	const logged = useSelector(isLogged())
	const localToken = window.localStorage.getItem('token')
	let userNameValue = 'tony@stark.com',
		passWordValue = 'password123',
		rememberValue = false
	const navigate = useNavigate()

	useEffect(() => {
		if (localToken) {
			setToken(store, localToken)
			navigate('/user', { replace: true })
		}
	}, [localToken, store])

	function onSubmit(e) {
		e.preventDefault()
		signInPost(store, userNameValue, passWordValue, rememberValue)
	}

	return (
		<main className="main bg-dark">
			{logged && <Navigate to="/user" replace={true} />}
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" value={userNameValue} onInput={e => (userNameValue = e.target.value)} />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" value={passWordValue} onInput={e => (passWordValue = e.target.value)} />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" onInput={e => (rememberValue = e.target.checked)} />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button className="sign-in-button" onClick={onSubmit}>
						Sign In
					</button>
				</form>
			</section>
		</main>
	)
}
