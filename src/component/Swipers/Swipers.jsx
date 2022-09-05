import React from 'react'
import { Swiper } from 'antd-mobile'
import { useGetHomeSwiperQuery } from '../../redux/api/swiperApi'

const Swipers = () => {
	const { data, isSuccess } = useGetHomeSwiperQuery()

	return (
		<div>
			{isSuccess && (
				<Swiper autoplay loop>
					{data.body.map(m => (
						<Swiper.Item key={m.id}>
							<div
								style={{
									height: '400rem',
									backgroundImage: `url(http://localhost:8080${m.imgSrc})`,
									backgroundSize:'cover'
								}}
							>
							</div>
						</Swiper.Item>
					))}
				</Swiper>
			)}
		</div>
	)
}

export default Swipers
