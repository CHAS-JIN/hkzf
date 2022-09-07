import React, { useEffect, useState } from 'react'
import { Grid, Card } from 'antd-mobile'
import styles from './RentGroups.module.css'
import axios from 'axios'

const RentGroups = () => {
	const [rentGroups, setRentGroups] = useState(null)

	// 组件挂载请求租房小组数据
	useEffect(() => {
		getRentGroups()
	}, [])
	// 请求租房小组数据函数
	async function getRentGroups() {
		const result = await axios.get(
			`http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0`
		)
		setRentGroups(result.data.body)
	}

	return (
		<div className={styles.groupCont}>
			<div className={styles.groupWrap}>
				{/* 租房小组标题栏 */}
				<div className={styles.groupHead}>
					<p>租房小组</p>
					<span>更多</span>
				</div>
				{/* 租房小组项目 */}
				<div className={styles.groupItems}>
					<Grid columns={2} gap={12}>
						{rentGroups &&
							rentGroups.map(m => {
								return (
									<Grid.Item key={m.id}>
										<Card bodyClassName={styles.card}>
											<div>
												<h2>{m.title}</h2>
												<p>{m.desc}</p>
											</div>

											<div>
												<img src={`http://localhost:8080${m.imgSrc}`} alt="" />
											</div>
										</Card>
									</Grid.Item>
								)
							})}
					</Grid>
				</div>
			</div>
		</div>
	)
}

export default RentGroups
