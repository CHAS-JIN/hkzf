import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Grid } from 'antd-mobile'

import { BASE_URL } from './../../utils/constant'

import styles from './Profile.module.css'

const Profile = () => {
	const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'
	const navigate = useNavigate()
	const [isLoging, setIsLoging] = useState(false)
	const menus = [
		{ id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
		{ id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
		{ id: 3, name: '看房记录', iconfont: 'icon-record' },
		{
			id: 4,
			name: '成为房主',
			iconfont: 'icon-identity',
		},
		{ id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
		{ id: 6, name: '联系我们', iconfont: 'icon-cust' },
	]
	return (
		<div className={styles.container}>
			{/* 头部 */}
			<div className={styles.title}>
				{/* 背景图 */}
				<img src={BASE_URL + '/img/profile/bg.png'} alt="背景图" />

				{/* 个人信息 */}
				<div className={styles.info}>
					<div className={styles.myIcon}>
						<img src={DEFAULT_AVATAR} alt="icon" />
					</div>

					<div className={styles.user}>
						<div className={styles.name}>游客</div>
						{isLoging ? (
							<>
								<Button
									style={{ backgroundColor: '#21b97a', color: '#fff' }}
									size="mini"
									shape="rounded"
								>
									退出
								</Button>

								<div className={styles.edit}>
									编辑个人资料
									<i className="iconfont icon-arrow" />
								</div>
							</>
						) : (
							<Button
								style={{ backgroundColor: '#21b97a', color: '#fff' }}
								size="small"
								onClick={() => navigate('/login')}
							>
								去登录
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* 九宫格菜单 */}
			<Grid columns={3} className={styles.grid}>
				{menus.map(item =>
					item.to ? (
						<Grid.Item key={item.id}>
							<Link
								to={item.to}
								style={{ textDecoration: 'none', color: 'black' }}
							>
								<div className={styles.menuItem}>
									<i className={`iconfont ${item.iconfont}`} />
									<span>{item.name}</span>
								</div>
							</Link>
						</Grid.Item>
					) : (
						<Grid.Item key={item.id}>
							<div className={styles.menuItem}>
								<i className={`iconfont ${item.iconfont}`} />
								<span>{item.name}</span>
							</div>
						</Grid.Item>
					)
				)}
			</Grid>

			{/* 加入我们 */}
			<div className={styles.ad}>
				<img src={BASE_URL + '/img/profile/join.png'} alt="" />
			</div>
		</div>
	)
}

export default Profile
