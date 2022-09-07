import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { NavBar } from 'antd-mobile'

import styles from './Map.module.css'
import Backdrop from './../../utils/Backdrop/Backdrop'

const Map = (props) => {

	// 获取当前城市经纬度
	const curCityInfo = useSelector(state => state.curCityInfo)
	const { longitude, latitude } = curCityInfo

	const toggleMap = props.toggleMap

	// 组件挂载时创建百度地图对象
	useEffect(() => {
		const map = new window.BMapGL.Map('container')
		const point = new window.BMapGL.Point(longitude, latitude)
		map.enableScrollWheelZoom(true)
		map.centerAndZoom(point, 15)
	})

	return (
		<Backdrop>
			<div className={styles.mapCont}>
				<NavBar onBack={toggleMap} style={{ backgroundColor: '#f6f5f6' }}>
					地图找房
				</NavBar>
				{/* 地图容器 */}
				<div id="container" style={{ height: '100%' }}></div>
			</div>
		</Backdrop>
	)
}

export default Map
