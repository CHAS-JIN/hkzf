import React from 'react'
import {useNavigate} from 'react-router-dom';

import styles from './Nav.module.css'

import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

const Nav = () => {
	const navigate = useNavigate()
	const changPage = value => {
		navigate(value,{replace:true})
	}

	return (
		<div className={styles.navBarCont}>
			<div className={styles.navBarWrap}>
				<div
					className={styles.navBarItem}
					onClick={() => changPage('/houselist/true')}
				>
					<img src={nav1} alt="zhengzu" />
					<span>整租</span>
				</div>

				<div
					className={styles.navBarItem}
					onClick={() => changPage('/houselist/false')}
				>
					<img src={nav2} alt="hezu" />
					<span>合租</span>
				</div>

				<div
					className={styles.navBarItem}
					onClick={() => changPage('/map')}
				>
					<img src={nav3} alt="zhaofang" />
					<span>地图找房</span>
				</div>

				<div className={styles.navBarItem} onClick={() => changPage('/rent')}>
					<img src={nav4} alt="chuzu" />
					<span>去出租</span>
				</div>
			</div>
		</div>
	)
}

export default Nav
