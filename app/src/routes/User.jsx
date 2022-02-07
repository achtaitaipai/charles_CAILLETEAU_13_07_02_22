import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { userProfile } from '../store'
import { useState } from 'react'

export default function User() {
	const [editMode, setEditMode] = useState(false)
	const token = useSelector(state => state.token)
	const firstName = useSelector(state => state.firstName)
	const lastName = useSelector(state => state.lastName)
	const dispatch = useDispatch()
	console.log(localStorage.getItem('token'))
	let newFirstName = ''
	let newLastName = ''

	const handleSubmit = e => {
		e.preventDefault()
		Axios.put(
			'http://localhost:3001/api/v1/user/profile',
			{
				firstName: newFirstName,
				lastName: newLastName,
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		)
			.then(function (response) {
				dispatch(userProfile(response.data.body))
				setEditMode(false)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	Axios.post('http://localhost:3001/api/v1/user/profile', '', { headers: { Authorization: `Bearer ${token}` } })
		.then(function (response) {
			dispatch(userProfile(response.data.body))
		})
		.catch(function (error) {
			console.log(error)
		})
	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					<span className="account-name">{!editMode && firstName + ' ' + lastName}</span>
				</h1>
				{!editMode && (
					<button className="edit-button" onClick={() => setEditMode(true)}>
						Edit Name
					</button>
				)}

				{editMode && (
					<form className="editName-form" onSubmit={handleSubmit}>
						<div className="editName-wrapper">
							<input
								type="text"
								className="editName-input"
								placeholder={firstName}
								required
								pattern="[A-Za-z0-9]{1,20}"
								onInput={e => {
									newFirstName = e.target.value
								}}
							></input>
							<input
								type="text"
								className="editName-input"
								placeholder={lastName}
								required
								pattern="[A-Za-z0-9]{1,20}"
								onInput={e => {
									newLastName = e.target.value
								}}
							></input>
						</div>
						<div className="editName-wrapper">
							<button className="editName-button" type="submit">
								save
							</button>
							<button className="editName-button" onClick={() => setEditMode(false)}>
								cancel
							</button>
						</div>
					</form>
				)}
			</div>
			<h2 className="sr-only">Accounts</h2>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Checking (x8349)</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Savings (x6712)</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">Current Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
		</main>
	)
}
