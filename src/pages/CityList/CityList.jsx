import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import styles from './CityList.module.css'

const citylistRoot = document.getElementById('citylist-root')

const CityList = () => {
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1)
	}

	return createPortal(
		<div className={styles.cityCont}>
			<div onClick={goBack}>CityList</div>
		</div>,
		citylistRoot
	)
}

export default CityList
