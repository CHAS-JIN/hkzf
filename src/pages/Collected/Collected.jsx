import React, { useEffect, useState } from 'react'

import MyNavBar from '../../component/MyNavBar/MyNavBar'
import Backdrop from './../../utils/Backdrop/Backdrop'
import { API } from './../../utils/api'
import { TOKEN } from '../../utils/constant'

import styles from './Collected.module.css'
import empty from '../../assets/images/empty.jpg'
import HouseItem from './../../component/HouseItem/HouseItem'

const Collected = () => {
	useEffect(() => {
		fetchData()
	}, [])

	const [favData, setFavData] = useState(null)

	// 请求数据
	const fetchData = async () => {
		const token = localStorage.getItem(TOKEN)
		const res = await API.get('/user/favorites', {
			headers: { authorization: token },
		})
		setFavData(res.data.body)
	}

	return (
		<Backdrop>
			<div className={styles.container}>
				<MyNavBar>我的收藏</MyNavBar>
				<div className={styles.wrapper}>
					{!favData ? (
						<img src={empty} alt="empty" />
					) : (
						favData.map(item => <HouseItem key={item.houseCode} data={item} />)
					)}
				</div>
			</div>
		</Backdrop>
	)
}

export default Collected
