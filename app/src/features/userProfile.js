import produce from 'immer'
import Axios from 'axios'

const initialState = {
	status: 'void',
	data: null,
	error: null,
}

const FETCHING = 'userProfile/fetches'
const RESOLVED = 'userProfile/resolved'
const REJECTED = 'userProfile/rejected'
const EDITING = 'userProfile/editing'

const userProfileFetches = () => ({ type: FETCHING })
const userProfileResolved = data => ({ type: RESOLVED, playload: data })
const userProfileRejected = error => ({ type: REJECTED, playload: error })
const userProfileEditing = data => ({ type: EDITING, playload: data })

export async function userProfilePost(store, token) {
	const status = store.getState().userProfile.status
	if (status === 'pending' || status === 'updating') {
		return
	}
	store.dispatch(userProfileFetches())
	try {
		const response = await Axios.post('http://localhost:3001/api/v1/user/profile', '', { headers: { Authorization: `Bearer ${token}` } })
		store.dispatch(userProfileResolved(response.data?.body))
	} catch (error) {
		store.dispatch(userProfileRejected(error))
	}
}

export function userProfileEditNames(store, firstName, lastName) {
	store.dispatch(userProfileEditing({ firstName, lastName }))
}

export default function userProfileReducer(state = initialState, action) {
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
			case EDITING: {
				if (draft.status === 'resolved') {
					draft.data.firstName = action.playload.firstName
					draft.data.lastName = action.playload.lastName
				}
				return
			}
			default:
				return
		}
	})
}
