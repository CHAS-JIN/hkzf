import { Card, Tag } from 'antd-mobile'
import React, { useRef } from 'react'

import styles from './HouseItem.module.css'

const HouseItem = props => {
	const { desc, houseImg, price, tags, title } = props.data
	return (
		<Card bodyClassName={styles.item}>
			{/* 列表项左侧图片 */}
			<div className={styles.itemImg}>
				<img
					src={`http://localhost:8080${houseImg}`}
					alt="图片加载错误"
				/>
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
						const tagClass = `tag${index + 1}`
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
	)
}

export default HouseItem
