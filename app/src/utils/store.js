import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import signInReducer from '../features/signIn'
import userProfileReducer from '../features/userProfile'

const reducer = combineReducers({
	signIn: signInReducer,
	userProfile: userProfileReducer,
})

export const store = createStore(reducer, devToolsEnhancer())
