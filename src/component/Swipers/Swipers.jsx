import React, { useEffect, useState } from 'react'
import { Swiper } from 'antd-mobile'

import { API } from './../../utils/api';
import { BASE_URL } from './../../utils/constant';

const Swipers = () => {
	const [swiper, setSwiper] = useState(null)
	// 组件挂载请求轮播图数据
	useEffect(() => {
		getSwiper()
	}, [])
	// 请求轮播图数据函数
	async function getSwiper() {
		const result = await API.get(`/home/swiper`)
		setSwiper(result.data.body)
	}

	return (
		<div>
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
		</div>
	)
}

export default Swipers
