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
