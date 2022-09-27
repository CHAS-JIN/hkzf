import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

const MyNavBar = props => {
	const navigate = useNavigate()
	return (
		<NavBar
			onBack={() => {
				if (!props.path) {
					navigate(-1)
				} else {
					navigate(props.path, { replace: true })
				}
			}}
			style={{ backgroundColor: '#f6f5f6' }}
			right={props.right ? props.right : null}
		>
			{props.children}
		</NavBar>
	)
}

export default MyNavBar
