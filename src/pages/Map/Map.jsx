import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { NavBar } from 'antd-mobile'

import styles from './Map.module.css'
import Backdrop from '../../utils/Backdrop/Backdrop'

const Map = props => {
	// 获取当前城市 label
	const { label, value } = useSelector(state => state.curCityInfo)

	const BMapGL = window.BMapGL
	const toggleMap = props.toggleMap

	// 组件挂载时创建百度地图对象
	useEffect(() => {
		initMap()
	})

	// 覆盖物样式
	const labelStyle = {
		border: '0px solid rgb(255, 0, 0)',
		padding: '0px',
		whiteSpace: 'nowrap',
		fontSize: '26rem',
		color: 'rgb(255, 255, 255)',
		backgroundColor: 'none',
	}
	// 初始化地图
	const initMap = () => {
		// 创建地图
		const map = new BMapGL.Map('container')

		// 创建地址解析器实例
		const myGeo = new BMapGL.Geocoder()

		// 将地址解析结果显示在地图上，并调整地图视野
		myGeo.getPoint(
			label,
			async point => {
				map.centerAndZoom(point, 11)
				// 鼠标滚轮缩放
				map.enableScrollWheelZoom(true)

				// 请求房源数据
				const houseData = await axios.get(
					`http://localhost:8080/area/map?id=${value}`
				)
				renderOverlays(map, houseData)
			},
			label
		)
	}

	// 渲染覆盖物入口
	// 1 通过区域 value 参数，获取该区域下的房源数据
	// 2 获取房源类型以及下级地图缩放级别
	const renderOverlays = (map, data) => {
		data.data.body.forEach(item => {
			createOverlays(map, item)
		})
	}

	// 创建覆盖物
	const createOverlays = (map, data) => {
		const {
			label: areaName,
			value,
			count,
			coord: { latitude, longitude },
		} = data

		// 坐标对象
		const point = new BMapGL.Point(longitude, latitude)

		// 添加区、镇覆盖物
		// createCircle(map, point, areaName, count, value)

		// 添加小区覆盖物
		createRect(map, point, areaName, count, value)
	}

	// 创建区、镇覆盖物
	const createCircle = (map, point, areaName, count, value) => {
		// 创建房源覆盖物
		const label = new BMapGL.Label('', {
			position: point,
			offset: new BMapGL.Size(-35, -35),
		})

		// 唯一标识
		label.id = value

		// 设置房源覆盖物内容
		label.setContent(`
		<div class="${styles.bubble}">
			<p>${areaName}</p>
			<p>${count}套</p>
		</div>`)

		// 设置房源覆盖物样式
		label.setStyle(labelStyle)

		// 设置房源覆盖物监听事件
		label.addEventListener('click', function () {
			map.clearOverlays()
			map.centerAndZoom(point, 13)
		})

		// 将标注添加到地图中
		map.addOverlay(label)
	}

	// 创建小区覆盖物
	const createRect = (map,point, name, count, value) => {
		// 创建覆盖物
		const label = new BMapGL.Label('', {
			position: point,
			offset: new BMapGL.Size(-50, -28),
		})

		// 给 label 对象添加一个唯一标识
		label.id = value

		// 设置房源覆盖物内容
		label.setContent(`
		<div class="${styles.rect}">
			<div class="${styles.housename}">${name}</div>
			<div class="${styles.housenum}">${count}套</div>
			<i class="${styles.arrow}"></i>
		</div>`)

		// 设置样式
		label.setStyle(labelStyle)

		// 添加单击事件
		/* label.addEventListener('click', e => {
			// 获取并渲染房源数据
			// this.getHousesList(value)

			// 获取当前被点击项
			const target = e.changedTouches[0]
			this.map.panBy(
				window.innerWidth / 2 - target.clientX,
				(window.innerHeight - 330) / 2 - target.clientY
			)
		}) */

		// 添加覆盖物到地图中
		map.addOverlay(label)
	}

	return (
		<Backdrop>
			<div className={styles.mapCont} style={{ height: '100%' }}>
				<NavBar
					onBack={toggleMap}
					style={{ backgroundColor: '#f6f5f6', '--height': '5%' }}
				>
					地图找房
				</NavBar>
				{/* 地图容器 */}
				<div id="container" style={{ height: '95%' }}></div>
			</div>
		</Backdrop>
	)
}

export default Map
