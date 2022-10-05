import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Tag } from 'antd-mobile'

import { BASE_URL } from './../../utils/constant'
import styles from './HouseItem.module.css'

const HouseItem = ({ data }) => {
	const { desc, houseImg, price, tags, title, houseCode: code } = data

	const navigate = useNavigate()

	// 跳转到房屋详情页
	const showDetail = () => {
		if (code) {
			// 将房屋标识通过路由发送到 HouseDetail 组件
			navigate(`/detail/${code}`)
		} else {
			return
		}
	}

	return (
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

				{/* 价格 */}
				<div className={styles.itemPrice}>
					<span>{price}</span>
				</div>
			</div>
		</Card>
	)
}

export default HouseItem
