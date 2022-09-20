import React from 'react'
import MyNavBar from '../../component/MyNavBar/MyNavBar'
import Backdrop from './../../utils/Backdrop/Backdrop'

import styles from './Collected.module.css'
import empty from '../../assets/images/empty.jpg'

const Collected = () => {
	return (
		<Backdrop>
			<div className={styles.container}>
				<MyNavBar>我的收藏</MyNavBar>
				<div className={styles.wrapper}>
					<img src={empty} alt="empty" />
				</div>
			</div>
		</Backdrop>
	)
}

export default Collected
