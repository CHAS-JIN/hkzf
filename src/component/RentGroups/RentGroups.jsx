import React from 'react'
import { Grid, Card } from 'antd-mobile'
import styles from './RentGroups.module.css'
import { useGetRentGroupsQuery } from '../../redux/api/rentGroupsApi'

const RentGroups = () => {
	const renGroupsApiObject = useGetRentGroupsQuery()
	const { data, isSuccess } = renGroupsApiObject

	return (
		<div className={styles.groupCont}>
			<div className={styles.groupWrap}>
				<div className={styles.groupHead}>
					<p>租房小组</p>
					<span>更多</span>
				</div>
				<div className={styles.groupItems}>
					<Grid columns={2} gap={12}>
						{isSuccess &&
							data.body.map(m => {
								return (
									<Grid.Item key={m.id}>
										<Card bodyClassName={styles.card} >
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
