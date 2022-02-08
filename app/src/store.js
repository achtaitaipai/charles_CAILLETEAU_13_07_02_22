import { createStore } from 'redux'

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	token: '',
	logged: false,
	userDataLoaded: false,
}

// actions creators

export const logIn = token => ({ type: 'logIn', playload: { token } })
export const userProfile = userInfos => ({ type: 'userProfile', playload: { userInfos } })
export const logOut = () => ({ type: 'logOut' })

function reducer(state = initialState, action) {
	switch (action.type) {
		case 'logOut':
			return initialState
			break

		case 'logIn':
			return {
				...state,
				logged: !state.logged,
				token: action.playload.token,
			}
			break

		case 'userProfile':
			return {
				...state,
				firstName: action.playload.userInfos.firstName,
				lastName: action.playload.userInfos.lastName,
				email: action.playload.userInfos.email,
				password: action.playload.userInfos.password,
				userDataLoaded: true,
			}
			break

		default:
			break
	}
	return state
}

export const store = createStore(reducer)
