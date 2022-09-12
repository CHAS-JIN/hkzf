import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, NavBar, Toast } from 'antd-mobile'

import axios from 'axios'

import styles from './Map.module.css'
import Backdrop from '../../utils/Backdrop/Backdrop'
import HouseItem from './../../component/HouseItem/HouseItem'

const Map = () => {
	const navigate = useNavigate()

	// 获取当前城市 label value
	const { label, value } = useSelector(state => state.curCityInfo)

	// 是否展示房屋信息列表状态
	const [isShow, setIsShow] = useState(false)

	// 存储房屋信息列表
	const [houseInfo, setHouseInfo] = useState(null)

	// 将 map point 对象存储为全局变量
	let myMap
	let myPoint

	const BMapGL = window.BMapGL

	// 返回首页
	const back = () => {
		navigate(-1)
	}

	// 组件挂载时创建百度地图对象
	useEffect(() => {
		initMap()
		return () => {
			// 销毁 myMap 全局变量
			// eslint-disable-next-line react-hooks/exhaustive-deps
			myMap = null
		}
	}, [])

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

		// 将 map 对象放入全局变量中
		myMap = map

		// 创建地址解析器实例
		const myGeo = new BMapGL.Geocoder()

		// 将地址解析结果显示在地图上，并调整地图视野
		myGeo.getPoint(
			label,
			point => {
				myPoint = point
				
				// 设置中心和缩放
				map.centerAndZoom(point, 11)

				// 鼠标滚轮缩放
				map.enableScrollWheelZoom(true)

				// 渲染覆盖物
				// renderOverlays(map, value)
				renderOverlays(value)
			},
			label
		)

		// 监听地图拖动事件，拖动时隐藏房屋列表
		map.addEventListener('dragstart', () => {
			setIsShow(false)
		})
	}

	// 渲染覆盖物入口
	async function renderOverlays(id) {
		try {
			// 开启 Loading
			Toast.show({
				icon: 'loading',
				content: '加载中…',
			})
			// 请求房源数据
			const houseData = await axios.get(
				`http://localhost:8080/area/map?id=${id}`
			)
			// 关闭 loading
			Toast.clear()
			// 调用 getTypeAndZoom 方法获取级别和类型
			const { nextZoom, type } = getTypeAndZoom()
			// 生成覆盖物
			houseData.data.body.forEach(item => {
				createOverlays(item, nextZoom, type)
			})
		} catch (e) {
			// 关闭 loading
			Toast.clear()
		}
	}

	// 创建覆盖物
	const createOverlays = (data, zoom, type) => {
		const {
			label: areaName,
			value,
			count,
			coord: { latitude, longitude },
		} = data

		// 坐标对象
		const point = new BMapGL.Point(longitude, latitude)

		if (type === 'circle') {
			// 添加区、镇覆盖物
			createCircle(point, areaName, count, value, zoom)
		} else {
			// 添加小区覆盖物
			createRect(point, areaName, count, value)
		}
	}

	// 创建区、镇覆盖物
	const createCircle = (point, areaName, count, value, zoom) => {
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
			myMap.clearOverlays()
			myMap.centerAndZoom(point, zoom)
			renderOverlays(value)
		})

		// 将标注添加到地图中
		myMap.addOverlay(label)
	}

	// 创建小区覆盖物
	const createRect = (point, name, count, value) => {
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
		</div>`)

		// 设置样式
		label.setStyle(labelStyle)

		// 添加单击事件
		label.addEventListener('click', async () => {
			// 开启 Loading
			Toast.show({
				icon: 'loading',
				content: '加载中…',
			})
			// 获取并渲染房源数据
			const houseData = await axios.get(
				`http://localhost:8080/houses?cityId=${value}`
			)
			// 关闭 Loading
			Toast.clear()
			// 存储房屋信息列表
			setHouseInfo(houseData)

			// 展示房屋信息列表
			setIsShow(true)

			// 设置中心点 延迟调用 要在房屋信息列表动画结束后调用
			setTimeout(() => {
				myMap.centerAndZoom(point, 15)
			}, 100)
		})

		// 添加覆盖物到地图中
		myMap.addOverlay(label)
	}

	// 计算要绘制的覆盖物类型和下一个缩放级别
	const getTypeAndZoom = () => {
		// 调用地图的 getZoom() 方法，来获取当前缩放级别
		const zoom = myMap.getZoom()
		let nextZoom, type

		if (zoom >= 10 && zoom < 12) {
			// 区
			// 下一个缩放级别
			nextZoom = 13
			// circle 表示绘制圆形覆盖物（区、镇）
			type = 'circle'
		} else if (zoom >= 12 && zoom < 14) {
			// 镇
			nextZoom = 15
			type = 'circle'
		} else if (zoom >= 14 && zoom < 16) {
			// 小区
			type = 'rect'
		}

		return {
			nextZoom,
			type,
		}
	}

	const backTop = () => {
		myMap.clearOverlays()
		myMap.centerAndZoom(myPoint, 11)
		renderOverlays(value)
	}

	return (
		<Backdrop>
			<div className={styles.mapCont} style={{ height: '100%' }}>
				<NavBar onBack={back} style={{ backgroundColor: '#f6f5f6' }}>
					地图找房
				</NavBar>
				{/* 地图容器 */}
				<div id="container" style={{ flex: 1 }}></div>
				{/* 返回最上级按钮 */}
				<div className={styles.backTop}>
					<Button color="primary" size="small" onClick={backTop}>
						返回最上级
					</Button>
				</div>
				{/* 房源列表 */}
				<div
					className={styles.houseList}
					style={isShow ? { height: '800rem' } : {}}
				>
					{/* 分割条 */}
					<div className={styles.listMark}>
						<p></p>
					</div>
					<div className={styles.houseWrap}>
						{/* 标题 */}
						<Card bodyClassName={styles.titleWrap}>
							<h1 className={styles.listTitle}>房屋列表</h1>
							<Link className={styles.titleMore} to="/houselist">
								更多房源
							</Link>
						</Card>
						{/* 列表 */}
						<div className={styles.houseItems}>
							{/* 列表项 */}
							{houseInfo &&
								houseInfo.data.body.list.map(item => (
									<HouseItem data={item} key={item.houseCode} />
								))}
						</div>
					</div>
				</div>
			</div>
		</Backdrop>
	)
}

export default Map
