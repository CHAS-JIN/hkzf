import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NavBar } from 'antd-mobile'

import styles from './Map.module.css'

const mapRoot = document.getElementById('map-root')

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
		map.centerAndZoom(point, 15)
	})

	return createPortal(
		<div className={styles.mapCont}>
			<NavBar onBack={goBack}>地图找房</NavBar>
			<div id="container" style={{ height: '100%' }}></div>
		</div>
		,mapRoot
	)
}

export default Map
