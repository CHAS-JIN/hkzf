import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import styles from './Search.module.css'

const searchRoot = document.getElementById('search-root')

const Search = () => {
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1)
	}

	return createPortal(
		<div className={styles.searchCont}>
			<div onClick={goBack}>Search</div>
		</div>,
		searchRoot
	)
}

export default Search
