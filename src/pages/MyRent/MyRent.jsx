import React, { useEffect, useState } from 'react'

import Backdrop from '../../utils/Backdrop/Backdrop'
import MyNavBar from './../../component/MyNavBar/MyNavBar'
import HouseItem from '../../component/HouseItem/HouseItem'
import { Link } from 'react-router-dom'
import { API } from '../../utils/api'
import { TOKEN } from '../../utils/constant'

import empty from '../../assets/images/empty.jpg'
import styles from './MyRent.module.css'

const MyRent = () => {
	useEffect(() => {
		fetchData()
	}, [])

	const [rentData, setRentData] = useState(null)

	const fetchData = async () => {
		const token = localStorage.getItem(TOKEN)
		const res = await API.get('/user/houses', {
			headers: { authorization: token },
		})
		setRentData(res.data.body)
	}

	const right = (
		<Link to="/rent" style={{ textDecoration: 'none', fontSize: '30rem' }}>
			去出租
		</Link>
	)

	return (
		<Backdrop>
			<div className={styles.container}>
				<MyNavBar right={right} path="/profile">
					我的出租
				</MyNavBar>
				<div className={styles.wrapper}>
					{!rentData ? (
						<img src={empty} alt="empty" />
					) : (
						rentData.map(item => <HouseItem key={item.houseCode} data={item} />)
					)}
				</div>
			</div>
		</Backdrop>
	)
}

export default MyRent
