import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Grid } from 'antd-mobile'

import { BASE_URL, TOKEN } from './../../utils/constant'
import { API } from './../../utils/api'

import styles from './Profile.module.css'

const Profile = () => {
	const navigate = useNavigate()
	const user = JSON.parse(localStorage.getItem('user'))
	const token = localStorage.getItem(TOKEN)

	const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'
	const menus = [
		{ id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/collected' },
		{ id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/myrent' },
		{ id: 3, name: '看房记录', iconfont: 'icon-record' },
		{
			id: 4,
			name: '成为房主',
			iconfont: 'icon-identity',
		},
		{ id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
		{ id: 6, name: '联系我们', iconfont: 'icon-cust' },
	]

	const logout = async () => {
		await API.post('/user/logout', {}, { headers: { authorization: token } })

		localStorage.removeItem(TOKEN)
		localStorage.removeItem('user')

		navigate('/profile', { replace: true })
	}

	return (
		<div className={styles.container}>
			{/* 头部 */}
			<div className={styles.title}>
				{/* 背景图 */}
				<img src={BASE_URL + '/img/profile/bg.png'} alt="背景图" />

				{/* 个人信息 */}
				<div className={styles.info}>
					<div className={styles.myIcon}>
						<img
							src={user ? BASE_URL + user.avatar : DEFAULT_AVATAR}
							alt="icon"
						/>
					</div>

					<div className={styles.user}>
						<div className={styles.name}>{user ? user.nickname : '游客'}</div>
						{user ? (
							<>
								<Button
									style={{ backgroundColor: '#21b97a', color: '#fff' }}
									size="mini"
									shape="rounded"
									onClick={logout}
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
			{user ? (
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
			) : null}

			{/* 加入我们 */}
			<div className={styles.ad}>
				<img src={BASE_URL + '/img/profile/join.png'} alt="" />
			</div>
		</div>
	)
}

export default Profile
