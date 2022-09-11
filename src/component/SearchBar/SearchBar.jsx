import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updCurCityInfo } from '../../redux/slices/curCityInfoSlice'

import axios from 'axios'

import '../../assets/fonts/iconfont.css'
import styles from './SearchBar.module.css'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// 获取当前城市名称
	const cityLabel = useSelector(state => state.curCityInfo.label)

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

	const changePage = (page) =>{
		navigate(page)
	}

	return (
		<div className={styles.searchBarCont}>
			<div className={styles.searchBarWrap}>
				<div className={styles.searchBar}>
					<div
						className={styles.location}
						onClick={() => changePage('/citylist')}
					>
						{/* {当前城市} */}
						<span>{cityLabel}</span>
						<i className="iconfont icon-arrow" style={{ fontSize: '20rem' }} />
					</div>

					<div
						className={styles.search}
						onClick={() => changePage('/search')}
					>
						{/* {搜索栏} */}
						<i className="iconfont icon-seach" style={{ fontSize: '30rem' }} />
						<span>请输入小区或地址</span>
					</div>
				</div>

				<div className={styles.map} onClick={() => changePage('/map')}>
					{/* {地图} */}
					<i className="iconfont icon-map" style={{ fontSize: '60rem' }} />
				</div>
			</div>
		</div>
	)
}

export default SearchBar
