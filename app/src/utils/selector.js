export const isLogged = () => {
	return state => state.signIn.data !== null
}

export const getTokken = () => {
	return state => state.signIn.data?.token
}

export const getNames = () => {
	return state => ({
		firstName: state.userProfile.data?.firstName,
		lastName: state.userProfile.data?.lastName,
	})
}

export const signInIsLoading = () => {
	return state => state.signIn.status === 'pending' || state.signIn.status === 'updating'
}

export const signInError = () => {
	return state => state.signIn.error
}

export const userProfileIsLoading = () => {
	return state => state.userProfile.status === 'pending' || state.userProfile.status === 'updating'
}

export const userProfileError = () => {
	return state => state.userProfile.error
}
