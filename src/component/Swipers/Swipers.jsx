import React, { useEffect, useState } from 'react'
import { Swiper } from 'antd-mobile'

import { API } from './../../utils/api'
import { BASE_URL } from './../../utils/constant'

const Swipers = ({ code, imgSrc }) => {
	const [swiper, setSwiper] = useState(null)
	// 组件挂载请求轮播图数据
	useEffect(() => {
		if (!code) {
			getSwiper()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	// 请求轮播图数据函数
	async function getSwiper() {
		const result = await API.get(`/home/swiper`)
		setSwiper(result.data.body)
	}

	return (
		<div>
			{/* 首屏轮播图 */}
			{swiper && (
				<Swiper autoplay loop>
					{swiper.map(m => (
						<Swiper.Item key={m.id}>
							<div
								style={{
									height: '400rem',
									backgroundImage: `url(${BASE_URL}${m.imgSrc})`,
									backgroundSize: 'cover',
								}}
							></div>
						</Swiper.Item>
					))}
				</Swiper>
			)}

			{/* 房屋信息轮播图 */}
			{code && imgSrc && (
				<Swiper autoplay loop>
					{imgSrc.map(i => (
						<Swiper.Item key={i}>
							<div
								style={{
									height: '500rem',
									backgroundImage: `url(${BASE_URL}${i})`,
									backgroundSize: 'cover',
								}}
							></div>
						</Swiper.Item>
					))}
				</Swiper>
			)}
		</div>
	)
}

export default Swipers
