import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import argentBankLogo from '../assets/img/argentBankLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, store } from '../store'

export default function Header() {
	const logged = useSelector(state => state.logged)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = e => {
		dispatch(logOut())
		localStorage.clear()
		navigate('../', { replace: true })
	}
	return (
		<nav className="main-nav">
			<Link className="main-nav-logo" to="./">
				<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<div>
				{logged ? (
					<button className="main-nav-item" onClick={handleClick}>
						<i className="fa fa-user-circle"></i> Sign out
					</button>
				) : (
					<Link className="main-nav-item" to="./sign-in">
						<i className="fa fa-user-circle"></i>
						Sign In
					</Link>
				)}
			</div>
		</nav>
	)
}
