import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import '../../assets/fonts/iconfont.css'
import styles from './SearchBar.module.css'

const SearchBar = () => {
	const curCityInfo = useSelector(state => state.curCityInfo)
	const { label } = curCityInfo

	const navigate = useNavigate()
	const changePage = value => {
		navigate(value)
	}

	return (
		<div className={styles.searchBarCont}>
			<div className={styles.searchBarWrap}>
				<div className={styles.searchBar}>
					<div
						className={styles.location}
						onClick={() => changePage('/citylist')}
					>
						<span>{label}</span>
						<i className="iconfont icon-arrow" style={{ fontSize: '20rem' }} />
					</div>

					<div className={styles.search} onClick={() => changePage('/search')}>
						<i className="iconfont icon-seach" style={{ fontSize: '30rem' }} />
						<span>请输入小区或地址</span>
					</div>
				</div>

				<div className={styles.map} onClick={() => changePage('/map')}>
					<i className="iconfont icon-map" style={{ fontSize: '60rem' }} />
				</div>
			</div>
		</div>
	)
}

export default SearchBar
