import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import styles from './Map.module.css'

const mapRoot = document.getElementById('map-root')

const Map = () => {
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1)
	}

	return createPortal(
		<div className={styles.mapCont}>
			<div onClick={goBack}>Map</div>
		</div>,
		mapRoot
	)
}

export default Map
