import produce from 'immer'
import Axios from 'axios'

const initialState = {
	status: 'void',
	data: null,
	error: null,
}

const FETCHING = 'signin/fetches'
const RESOLVED = 'signin/resolved'
const REJECTED = 'signin/rejected'
const OUT = 'signin/out'
const SETTOKEN = 'signin/setToken'

const signInFetches = () => ({ type: FETCHING })
const signInResolved = data => ({ type: RESOLVED, playload: data })
const signInRejected = error => ({ type: REJECTED, playload: error })
const signInOut = () => ({ type: OUT })
const signInSetToken = token => ({ type: SETTOKEN, playload: token })

export function setToken(store, token) {
	store.dispatch(signInSetToken(token))
}

export function signOut(store) {
	store.dispatch(signInOut())
	window.localStorage.clear()
}

export async function signInPost(store, email, password, remember) {
	const status = store.getState().signIn.status
	if (status === 'pending' || status === 'updating') {
		return
	}
	store.dispatch(signInFetches())
	try {
		const response = await Axios.post('http://localhost:3001/api/v1/user/login', {
			email: email,
			password: password,
		})
		store.dispatch(signInResolved(response.data?.body))
		if (remember) {
			window.localStorage.setItem('token', response.data?.body?.token)
			console.log(window.localStorage.getItem('token'))
		}
	} catch (error) {
		store.dispatch(signInRejected(error))
	}
}

export default function signInReducer(state = initialState, action) {
	return produce(state, draft => {
		switch (action.type) {
			case FETCHING: {
				if (draft.status === 'void') {
					draft.status = 'pending'
					return
				} else if (draft.status === 'rejected') {
					draft.error = null
					draft.status = 'pending'
					return
				} else if (draft.status === 'resolved') {
					draft.status = 'updating'
					return
				}
				return
			}
			case RESOLVED: {
				if (draft.status === 'pending' || draft.status === 'updating') {
					draft.data = action.playload
					draft.status = 'resolved'
				}
				return
			}
			case REJECTED: {
				if (draft.status === 'pending' || draft.status === 'updating') {
					draft.error = action.playload
					draft.data = null
					draft.status = 'resolved'
				}
				return
			}
			case OUT: {
				draft.status = 'void'
				draft.data = null
				draft.error = null
				return
			}
			case SETTOKEN: {
				draft.data = { token: action.playload }
				return
			}
			default:
				return
		}
	})
}
