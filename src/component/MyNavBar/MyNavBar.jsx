import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

const MyNavBar = props => {
	const navigate = useNavigate()
	return (
		<NavBar
			onBack={() => navigate(-1)}
			style={{ backgroundColor: '#f6f5f6' }}
			right={props.right ? props.right : null}
		>
			{props.children}
		</NavBar>
	)
}

export default MyNavBar
