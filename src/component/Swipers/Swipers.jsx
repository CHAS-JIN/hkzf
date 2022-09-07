import React, { useEffect, useState } from 'react'
import { Swiper } from 'antd-mobile'
import axios from 'axios'

const Swipers = () => {
	const [swiper, setSwiper] = useState(null)
	// 组件挂载请求轮播图数据
	useEffect(() => {
		getSwiper()
	}, [])
	// 请求轮播图数据函数
	async function getSwiper() {
		const result = await axios.get(`http://localhost:8080/home/swiper`)
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
									backgroundImage: `url(http://localhost:8080${m.imgSrc})`,
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
