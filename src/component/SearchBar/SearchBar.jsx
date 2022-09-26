import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import '../../assets/fonts/iconfont.css'
import styles from './SearchBar.module.css'

const SearchBar = () => {
	const navigate = useNavigate()
	// 获取当前城市名称
	const cityLabel = useSelector(state => state.curCityInfo.label)

	return (
		<div className={styles.searchBarCont}>
			<div className={styles.searchBarWrap}>
				<div className={styles.searchBar}>
					<div
						className={styles.location}
						onClick={() => navigate('/citylist')}
					>
						{/* {当前城市} */}
						<span>{cityLabel}</span>
						<i className="iconfont icon-arrow" style={{ fontSize: '20rem' }} />
					</div>

					<div className={styles.search} onClick={() => navigate('/search',{state:{isRent:false}})}>
						{/* {搜索栏} */}
						<i className="iconfont icon-seach" style={{ fontSize: '30rem' }} />
						<span>请输入小区或地址</span>
					</div>
				</div>

				<div className={styles.map} onClick={() => navigate('/map')}>
					{/* {地图} */}
					<i className="iconfont icon-map" style={{ fontSize: '60rem' }} />
				</div>
			</div>
		</div>
	)
}

export default SearchBar
