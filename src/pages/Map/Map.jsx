import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NavBar } from 'antd-mobile'

import styles from './Map.module.css'
import Backdrop from './../../utils/Backdrop/Backdrop'

const Map = () => {
	const curCityInfo = useSelector(state => state.curCityInfo)
	const { longitude, latitude } = curCityInfo
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1)
	}

	useEffect(() => {
		const map = new window.BMapGL.Map('container')
		const point = new window.BMapGL.Point(longitude, latitude)
		const zoomCtrl = new window.BMapGL.ZoomControl()
		map.addControl(zoomCtrl)
		map.enableScrollWheelZoom(true)
		map.centerAndZoom(point, 15)
	})
	return (
		<Backdrop>
			<div className={styles.mapCont}>
				<NavBar onBack={goBack} style={{ backgroundColor: '#f6f5f6' }}>
					地图找房
				</NavBar>
				<div id="container" style={{ height: '100%' }}></div>
			</div>
		</Backdrop>
	)
}

export default Map
