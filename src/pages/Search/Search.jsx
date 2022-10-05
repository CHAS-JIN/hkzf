import React, { useState } from 'react'
import { NavBar, SearchBar } from 'antd-mobile'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Backdrop from '../../utils/Backdrop/Backdrop'
import { API } from './../../utils/api'

import styles from './Search.module.css'
import search from '../../assets/images/search.png'

const Search = () => {
	const navigate = useNavigate()
	const cityId = useSelector(state => state.curCityInfo.value)

	// 接收 Rent 组件通过路由传来的参数，用于判断是否为 Rent 组件
	const {
		state: { isRent },
	} = useLocation()

	const [comList, setComList] = useState(null)

	// 定时器
	let timerId

	// 搜索框内容改变 500ms 后请求数据
	const handleChange = value => {
		// 搜索框为空时，结果列表设为空
		if (value === '') {
			setComList(null)
			return
		}

		// 清除上一次的定时器
		clearTimeout(timerId)

		// 500ms 后请求数据
		timerId = setTimeout(async () => {
			// 获取小区数据
			const res = await API.get('/area/community', {
				params: {
					name: value,
					id: cityId,
				},
			})

			setComList(res.data.body)
		}, 500)
	}

	// 点击搜索结果事件，通过 state 向不同路由发送数据
	const onTipsClick =async ({ community, communityName }) => {
		
		if (isRent) {
			// 出租页面跳转过来的
			navigate('/rent', { state: { community, communityName } })
		} else {
			// 搜索导航跳转过来的
			navigate('/houselist', { state: { community } })
		}
	}

	return (
		<Backdrop>
			<div className={styles.cont}>
				<NavBar
					onBack={() => navigate(-1)}
					back="返回"
					style={{ backgroundColor: '#fff' }}
				/>

				<div className={styles.wrap}>
					<div className={styles.logo}>
						<img src={search} alt="" />
					</div>
					<SearchBar
						placeholder="请输入小区或地址"
						style={{
							'--border-radius': '60rem',
							'--background': 'rgba(166,166,166,.1)',
							'--height': '100rem',
						}}
						onChange={value => handleChange(value)}
					/>

					{/* 搜索结果 */}
					{comList ? (
						<div className={styles.list}>
							<ul>
								{comList.map(item => (
									<li
										key={item.community}
										className={styles.tip}
										onClick={() => onTipsClick(item)}
									>
										{item.communityName}
									</li>
								))}
							</ul>
						</div>
					) : null}
				</div>
			</div>
		</Backdrop>
	)
}

export default Search
