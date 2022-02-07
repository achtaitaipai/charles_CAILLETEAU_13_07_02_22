import './assets/css/main.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Index from './routes/Index'
import User from './routes/User'
import SignIn from './routes/SignIn'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Footer from './components/Footer'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="user" element={<User />} />
				<Route path="sign-in" element={<SignIn />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
