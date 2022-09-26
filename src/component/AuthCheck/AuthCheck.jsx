import React from 'react'
import { Navigate } from 'react-router-dom'
import { TOKEN } from '../../utils/constant'

const AuthCheck = props => {
	const token = localStorage.getItem(TOKEN)
	return token ? props.children : <Navigate to={'/login'} replace/>
}

export default AuthCheck
