import React, { useEffect, useState } from 'react'

import { API } from './../../utils/api'
import { BASE_URL } from './../../utils/constant'

import styles from './Latest.module.css'

const Latest = () => {
	const [latest, setLatest] = useState(null)
	// 组件挂载请求最新资讯数据
	useEffect(() => {
		getLatest()
	}, [])
	// 请求最新资讯数据函数
	async function getLatest() {
		const result = await API.get(`/home/news`, {
			params: {
				area: `AREA%7C88cff55c-aaa4-e2e0`,
			},
		})
		setLatest(result.data.body)
	}

	return (
		<div className={styles.latestCont}>
			<div className={styles.latestWrap}>
				<p>最新资讯</p>

				<div className={styles.latestItems}>
					{latest &&
						latest.map(m => {
							return (
								<div className={styles.itemWrap} key={m.id}>
									<div className={styles.item}>
										<div
											className={styles.itemImg}
											style={{
												backgroundImage: `url(${BASE_URL}${m.imgSrc})`,
											}}
										></div>
										<div className={styles.itemDesc}>
											<div className={styles.itemTitle}>{m.title}</div>
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
