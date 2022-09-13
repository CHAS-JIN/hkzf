import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Card, Tag } from 'antd-mobile'

import styles from './HouseItem.module.css'
import { BASE_URL } from './../../utils/constant'

const HouseItem = ({ data, code }) => {
	const { desc, houseImg, price, tags, title } = data

	const navigate = useNavigate()
	const showDetail = () => {
		navigate(`/houselist/detail/${code}`)
	}

	return (
		<>
			{/* 展示 HouseDetail 组件 （2级路由） */}
			<Outlet />

			<Card bodyClassName={styles.item} onClick={showDetail}>
				{/* 列表项左侧图片 */}
				<div className={styles.itemImg}>
					<img src={`${BASE_URL}${houseImg}`} alt="图片加载错误" />
				</div>
				{/* 列表项右侧详情 */}
				<div className={styles.itemDetail}>
					{/* 标题 */}
					<div className={styles.itemTitle}>
						<h2>{title}</h2>
					</div>

					{/* 描述 */}
					<div className={styles.itemDesc}>
						<span>{desc}</span>
					</div>

					{/* 标签 */}
					<div className={styles.itemTags}>
						{tags.map((tag, index) => {
							const tagClass = `tag${index%3 + 1}`
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

					{/* 价格 */}
					<div className={styles.itemPrice}>
						<span>{price}</span>
					</div>
				</div>
			</Card>
		</>
	)
}

export default HouseItem
