import { useState, useEffect } from 'react'
import { useStore, useSelector } from 'react-redux'
import { getTokken, getNames, isLogged, userProfileIsLoading, userProfileError } from '../utils/selector'
import { userProfilePost, userProfileEditNames } from '../features/userProfile'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

export default function User() {
	const [editMode, setEditMode] = useState(false)
	const token = useSelector(getTokken())
	const names = useSelector(getNames())
	const logged = useSelector(isLogged())
	const loading = useSelector(userProfileIsLoading())
	const error = useSelector(userProfileError())
	const [editLoading, editLoadingSet] = useState(false)
	const [editError, editErrorSet] = useState(null)
	let newFirstName = ''
	let newLastName = ''
	const store = useStore()
	const navigate = useNavigate()

	useEffect(() => {
		if (!logged) {
			navigate('/sign-in', { replace: true })
		} else {
			userProfilePost(store, token)
		}
	}, [store, token, logged, navigate])

	const handleSubmit = e => {
		e.preventDefault()
		editLoadingSet(true)
		console.log(editLoading)
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
				editLoadingSet(false)
				editErrorSet(null)
			})
			.catch(function (error) {
				console.log(error)
				editErrorSet(error)
				editLoadingSet(false)
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
					<>
						<button className="edit-button" onClick={() => setEditMode(true)}>
							Edit Name
						</button>

						{editLoading && <p className="loading"> en chargement...</p>}
					</>
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
			{error ? (
				<p className="error">'an error occurred while processing your request'</p>
			) : loading ? (
				<p className="loading">loading...</p>
			) : (
				<>
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
				</>
			)}
		</main>
	)
}
