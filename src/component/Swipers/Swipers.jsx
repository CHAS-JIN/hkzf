import React, { useEffect, useState } from 'react'
import { Swiper } from 'antd-mobile'

import { API } from './../../utils/api'
import { BASE_URL } from './../../utils/constant'

const Swipers = ({ code, imgSrc }) => {
	const [swiper, setSwiper] = useState(null)
	// 组件挂载请求轮播图数据
	useEffect(() => {
		// 请求轮播图数据函数
		async function getSwiper() {
			const result = await API.get(`/home/swiper`)
			setSwiper(result.data.body)
		}

		// 判断是否是房屋详情页，根据判断结果请求数据
		if (code) {
			setSwiper(imgSrc)
		} else {
			getSwiper()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			{swiper && (
				<Swiper autoplay loop>
					{swiper.map((m, index) => (
						<Swiper.Item key={m.id ? m.id : index}>
							<div
								style={{
									height: code ? '500rem' : '400rem',
									backgroundImage: `url(${BASE_URL}${m.imgSrc ? m.imgSrc : m})`,
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
