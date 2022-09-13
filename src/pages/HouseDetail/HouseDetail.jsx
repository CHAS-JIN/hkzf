import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CloseOutline, StarOutline } from 'antd-mobile-icons'
import { Tag, Toast } from 'antd-mobile'

import Swipers from './../../component/Swipers/Swipers'
import Backdrop from './../../utils/Backdrop/Backdrop'
import { API } from './../../utils/api'

import styles from './HouseDetail.module.css'

const HouseDetail = () => {
	const navigate = useNavigate()
	const { code } = useParams()
	const [houseData, setHouseData] = useState(null)
	const BMapGL = window.BMapGL

	const labelStyle = {
		position: 'absolute',
		zIndex: -7982820,
		backgroundColor: 'rgb(238, 93, 91)',
		color: 'rgb(255, 255, 255)',
		height: 25,
		padding: '5px 10px',
		lineHeight: '14px',
		borderRadius: 3,
		boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
		whiteSpace: 'nowrap',
		fontSize: 12,
		userSelect: 'none',
	}

	useEffect(() => {
		fetchHousedata()
		return () => {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function fetchHousedata() {
		Toast.show({
			icon: 'loading',
			content: '加载中…',
		})
		API.get(`/houses/${code}`).then(result => {
			const res = result.data.body
			setHouseData(res)
			// renderMap(res.community, res.coord)

			Toast.clear()
		})
	}

	// 渲染地图
	const renderMap = (community, coord) => {
		const { latitude, longitude } = coord
		const map = new BMapGL.Map('container')
		const point = new BMapGL.Point(longitude, latitude)

		map.centerAndZoom(point, 17)

		const label = new BMapGL.Label('', {
			position: point,
			offset: new BMapGL.Size(0, -36),
		})

		label.setStyle(labelStyle)
		label.setContent(`
			<span>${community}</span>
		`)
		map.addOverlay(label)
	}

	// 返回上一页
	const back = () => {
		navigate(-1)
	}

	return (
		<Backdrop>
			<div className={styles.cont}>
				{houseData && (
					<div className={styles.wrap}>
						{/* 轮播图 */}
						<Swipers code={code} imgSrc={houseData.houseImg} />

						{/* 关闭按钮 */}
						<div className={styles.close} onTouchEnd={back}>
							<CloseOutline />
						</div>

						{/* 详情 */}
						<div className={styles.detail}>
							{/* 标题 */}
							<div className={styles.title}>{houseData.title}</div>

							{/* 标签 */}
							<div className={styles.tags}>
								{houseData.tags.map((tag, index) => {
									const tagClass = `tag${(index % 3) + 1}`
									return (
										<Tag
											fill="solid"
											className={styles[tagClass]}
											key={index}
											style={{ marginRight: '10rem' }}
										>
											{tag}
										</Tag>
									)
								})}
							</div>

							{/* 租金 房型 面积 */}
							<div className={styles.info}>
								{/* 租金 */}
								<div className={styles.infoWrap}>
									<div className={styles.main}>
										{houseData.price}
										<span style={{ fontSize: '20rem', fontWeight: 'normal' }}>
											/月
										</span>
									</div>
									<div className={styles.sub}>租金</div>
								</div>

								{/* 房型 */}
								<div className={styles.infoWrap}>
									<div className={styles.main}>{houseData.roomType}</div>
									<div className={styles.sub}>房型</div>
								</div>

								{/* 面积 */}
								<div className={styles.infoWrap}>
									<div className={styles.main}>{houseData.size}平米</div>
									<div className={styles.sub}>面积</div>
								</div>
							</div>

							{/* 装修 朝向 楼层 类型 */}
							<div className={styles.basic}>
								<div className={styles.basicWrap}>
									{/* 装修 */}
									<div className={styles.main}>
										<span>装修：</span>
										精装
									</div>

									{/* 楼层 */}
									<div className={styles.main}>
										<span>楼层：</span>
										{houseData.floor}
									</div>
								</div>

								<div className={styles.basicWrap}>
									{/* 朝向 */}
									<div className={styles.main}>
										<span>朝向：</span>
										{houseData.oriented[0]}
									</div>

									{/* 类型 */}
									<div className={styles.main}>
										<span>类型：</span>
										普通住宅
									</div>
								</div>
							</div>
						</div>

						{/* 地图 */}
						<div className={styles.mapWrap}>
							{/* 标题 */}
							<div className={styles.title}>小区：{houseData.community}</div>

							{/* 地图容器 */}
							<div id="container" className={styles.map}></div>
						</div>

						

						{/* 底部按钮 */}
						<div className={styles.bottom}>
							<div className={styles.collect}>
								<StarOutline />
								<span>收藏</span>
							</div>

							<div className={styles.talk}>
								<span>在线咨询</span>
							</div>

							<div className={styles.tell}>
								<span>电话预约</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</Backdrop>
	)
}

export default HouseDetail
