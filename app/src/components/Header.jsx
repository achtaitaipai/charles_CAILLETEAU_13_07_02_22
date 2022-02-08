import { Link } from 'react-router-dom'
import argentBankLogo from '../assets/img/argentBankLogo.png'
import { isLogged } from '../utils/selector'
import { useSelector } from 'react-redux'
import { signOut } from '../features/signIn'
import { useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Header() {
	const store = useStore()
	const logged = useSelector(isLogged())
	const navigate = useNavigate()

	const handleClick = e => {
		e.preventDefault()
		signOut(store)
		navigate('/', { replace: true })
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
