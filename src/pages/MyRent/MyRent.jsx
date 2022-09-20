import React from 'react'
import Backdrop from '../../utils/Backdrop/Backdrop'
import MyNavBar from './../../component/MyNavBar/MyNavBar'

import empty from '../../assets/images/empty.jpg'
import styles from './MyRent.module.css'
import { Link } from 'react-router-dom'

const MyRent = () => {

	const right = () => <Link to='/rent' style={{textDecoration:'none',fontSize:'30rem'}}>去出租</Link>

	return (
		<Backdrop>
			<div className={styles.container}>
				<MyNavBar right={right}>我的出租</MyNavBar>
				<div className={styles.wrapper}>
					<img src={empty} alt="empty" />
				</div>
			</div>
		</Backdrop>
	)
}

export default MyRent
