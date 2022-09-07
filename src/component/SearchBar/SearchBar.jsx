import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updCurCityInfo } from '../../redux/slices/curCityInfoSlice'
import CityList from './../../pages/CityList/CityList'
import Search from './../../pages/Search/Search'
import Map from './../../pages/Map/Map'

import axios from 'axios'

import '../../assets/fonts/iconfont.css'
import styles from './SearchBar.module.css'

const SearchBar = () => {
	const dispatch = useDispatch()
	
	// 获取当前城市名称
	const cityLabel = useSelector(state => state.curCityInfo.label)

	const [showCityList, setShowCityList] = useState(false)
	const [showSearch, setShowSearch] = useState(false)
	const [showMap, setShowMap] = useState(false)

	// 首次加载获取当前定位并修改当前城市
	useEffect(() => {
		let cityName
		const curCity = new window.BMapGL.LocalCity()
		curCity.get(async res => {
			cityName = res.name
			const result = await axios.get(
				`http://localhost:8080/area/info?name=${cityName}`
			)
			if (!cityLabel) {
				dispatch(updCurCityInfo(result.data.body))
			}
		})
	})

	// 城市列表展示切换
	const toggleCityList = () => {
		setShowCityList(prevState => !prevState)
	}
	// 搜索列表展示切换
	const toggleSearch = () => {
		setShowSearch(prevState => !prevState)
	}
	// 地图找房展示切换
	const toggleMap = () => {
		setShowMap(prevState => !prevState)
	}

	return (
		<div className={styles.searchBarCont}>
			{/* 城市列表 */}
			{showCityList && <CityList toggleCityList={toggleCityList} />}
			{/* 搜索列表 */}
			{showSearch && <Search toggleSearch={toggleSearch} />}
			{/* 地图找房 */}
			{showMap && <Map toggleMap={toggleMap} />}
			<div className={styles.searchBarWrap}>
				<div className={styles.searchBar}>
					<div className={styles.location} onClick={toggleCityList}>
						{/* {当前城市} */}
						<span>{cityLabel}</span>
						<i className="iconfont icon-arrow" style={{ fontSize: '20rem' }} />
					</div>

					<div className={styles.search} onClick={toggleSearch}>
						{/* {搜索栏} */}
						<i className="iconfont icon-seach" style={{ fontSize: '30rem' }} />
						<span>请输入小区或地址</span>
					</div>
				</div>

				<div className={styles.map} onClick={toggleMap}>
					{/* {地图} */}
					<i className="iconfont icon-map" style={{ fontSize: '60rem' }} />
				</div>
			</div>
		</div>
	)
}

export default SearchBar
