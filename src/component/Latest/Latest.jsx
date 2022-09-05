import React from 'react'
import { useGetLatestMsgQuery } from '../../redux/api/latestApi'
import styles from './Latest.module.css'

const Latest = () => {
	const latestApiObj = useGetLatestMsgQuery()
	const { data, isSuccess } = latestApiObj

	return (
		<div className={styles.latestCont}>
			<div className={styles.latestWrap}>
				<p>最新资讯</p>

				<div className={styles.latestItems}>
					{isSuccess &&
						data.body.map(m => {
							return (
								<div className={styles.itemWrap} key={m.id}>
									<div className={styles.item}>
										<div
											className={styles.itemImg}
											style={{
												backgroundImage: `url(http://localhost:8080${m.imgSrc})`,
											}}
										></div>
										<div className={styles.itemDesc}>
											<div className={styles.itemTitle}>
												{m.title}
											</div>
											<div className={styles.itemBottom}>
												<p>{m.from}</p>
												<p>{m.date}</p>
											</div>
										</div>
									</div>
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default Latest
