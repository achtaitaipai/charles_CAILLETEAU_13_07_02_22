import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../store.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
	const dispatch = useDispatch()
	const logged = useSelector(state => state.logged)
	let userNameValue, passWordValue, rememberValue
	const navigate = useNavigate()

	function onSubmit(e) {
		e.preventDefault()
		Axios.post('http://localhost:3001/api/v1/user/login', {
			email: userNameValue,
			password: passWordValue,
		})
			.then(function (response) {
				dispatch(logIn(response.data.body.token))
				if (rememberValue) localStorage.setItem('token', response.data.body.token)
				navigate('../user', { replace: true })
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<h2>{logged ? 'logged' : 'not-logged'}</h2>
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
