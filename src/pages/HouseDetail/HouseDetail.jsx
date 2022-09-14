import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CloseOutline, StarOutline } from 'antd-mobile-icons'
import { Tag, Toast } from 'antd-mobile'

import Swipers from './../../component/Swipers/Swipers'
import Backdrop from './../../utils/Backdrop/Backdrop'
import { API } from './../../utils/api'

import styles from './HouseDetail.module.css'
import { BASE_URL } from './../../utils/constant';
import HouseItem from './../../component/HouseItem/HouseItem';

const HouseDetail = () => {
	useEffect(() => {
		fetchHousedata()
		return () => {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const navigate = useNavigate()

	// 从路径中提取参数
	const { code } = useParams()

	// 存储房屋信息
	const [houseData, setHouseData] = useState(null)

	// 百度地图
	const BMapGL = window.BMapGL

	// 覆盖物样式
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

	// 猜你喜欢数据
	const recommendHouses = [
		{
			id: 1,
			houseImg: BASE_URL + '/img/message/1.png',
			desc: '72.32㎡/南 北/低楼层',
			title: '安贞西里 3室1厅',
			price: 4500,
			tags: ['随时看房'],
		},
		{
			id: 2,
			houseImg: BASE_URL + '/img/message/2.png',
			desc: '83㎡/南/高楼层',
			title: '天居园 2室1厅',
			price: 7200,
			tags: ['近地铁'],
		},
		{
			id: 3,
			houseImg: BASE_URL + '/img/message/3.png',
			desc: '52㎡/西南/低楼层',
			title: '角门甲4号院 1室1厅',
			price: 4300,
			tags: ['集中供暖'],
		},
	]

	// 获取房屋数据
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

						{/* 房屋配套 */}
						<div className={styles.about}>
							<div className={styles.houseTitle}>房屋配套</div>
							{/* <HousePackage list={supporting} /> */}
							<div className={styles.titleEmpty}>暂无数据</div>

							{/* {houseData.supporting.length === 0 ? (
								<div className={styles.titleEmpty}>暂无数据</div>
							) : (
								<HousePackage list={supporting} />
							)} */}
						</div>

						{/* 房屋概况 */}
						<div className={styles.set}>
							<div className={styles.houseTitle}>房源概况</div>
							<div>
								<div className={styles.contact}>
									<div className={styles.user}>
										<img src={BASE_URL + '/img/avatar.png'} alt="头像" />
										<div className={styles.useInfo}>
											<div>王女士</div>
											<div className={styles.userAuth}>
												<i className="iconfont icon-auth" />
												已认证房主
											</div>
										</div>
									</div>
									<span className={styles.userMsg}>发消息</span>
								</div>

								<div className={styles.descText}>
									{houseData.description || '暂无房屋描述'}
								</div>
							</div>
						</div>

						{/* 推荐 */}
						<div className={styles.recommend}>
							<div className={styles.houseTitle}>猜你喜欢</div>
							<div className={styles.items}>
								{recommendHouses.map(item => (
									<HouseItem data={item} key={item.id} />
								))}
							</div>
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
