import React from 'react'
import { useNavigate } from 'react-router-dom'
import Backdrop from '../../utils/Backdrop/Backdrop'

import styles from './Search.module.css'

const Search = () => {
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1)
	}

	return (
		<Backdrop>
			<div className={styles.searchCont}>
				<div onClick={goBack}>Search</div>
			</div>
		</Backdrop>
	)
}

export default Search
