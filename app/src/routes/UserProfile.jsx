import { useState, useEffect } from 'react'
import { useStore, useSelector } from 'react-redux'
import { getTokken, getNames } from '../utils/selector'
import { userProfilePost, userProfileEditNames } from '../features/userProfile'
import Axios from 'axios'

export default function User() {
	const [editMode, setEditMode] = useState(false)
	const token = useSelector(getTokken())
	const names = useSelector(getNames())
	let newFirstName = ''
	let newLastName = ''
	const store = useStore()

	useEffect(() => {
		userProfilePost(store, token)
	}, [store, token])

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
				userProfileEditNames(store, newFirstName, newLastName)
				// dispatch(userProfile(response.data.body))
				setEditMode(false)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					<span className="account-name">{!editMode && names.firstName + ' ' + names.lastName}</span>
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
								placeholder={names.firstName}
								required
								pattern="[A-Za-z0-9]{1,20}"
								onInput={e => {
									newFirstName = e.target.value
								}}
							></input>
							<input
								type="text"
								className="editName-input"
								placeholder={names.lastName}
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
