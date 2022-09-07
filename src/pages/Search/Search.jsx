import React from 'react'
import Backdrop from '../../utils/Backdrop/Backdrop'

import styles from './Search.module.css'

const Search = (props) => {
	const toggleSearch = props.toggleSearch
	return (
		<Backdrop>
			<div className={styles.searchCont}>
				<div onClick={toggleSearch}>Search</div>
			</div>
		</Backdrop>
	)
}

export default Search
