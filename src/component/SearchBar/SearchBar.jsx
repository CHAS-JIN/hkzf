import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCurCityInfoQuery } from '../../redux/api/cityInfoApi'
import { useDispatch, useSelector } from 'react-redux'
import { updCurCityInfo } from '../../redux/slices/curCityInfoSlice'

import '../../assets/fonts/iconfont.css'
import styles from './SearchBar.module.css'

const SearchBar = () => {
	const dispatch = useDispatch()
	const cityLabel = useSelector((state) => state.curCityInfo.label )

	let cityName ='北京'
	// useEffect(() => {
	// 	const curCity = new window.BMapGL.LocalCity()
	// 	curCity.get(res => {
	// 		// eslint-disable-next-line react-hooks/exhaustive-deps
	// 		cityName = res.name
	// 	})
	// },[])

	const { data: cityData, isSuccess } = useGetCurCityInfoQuery(cityName)
	if (isSuccess) {
		dispatch(updCurCityInfo(cityData.body))
	}
	
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
						<span>{isSuccess ? cityLabel : cityName}</span>
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
