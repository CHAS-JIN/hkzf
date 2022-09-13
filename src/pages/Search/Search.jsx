import React from 'react'
import { useNavigate } from 'react-router-dom'

import Backdrop from '../../utils/Backdrop/Backdrop'

import styles from './Search.module.css'

const Search = () => {
	const navigate = useNavigate()
	// 返回首页
	const back = () => {
		navigate(-1)
	}
	return (
		<Backdrop>
			<div className={styles.cont}>
				<div onClick={back}>Search</div>
			</div>
		</Backdrop>
	)
}

export default Search
