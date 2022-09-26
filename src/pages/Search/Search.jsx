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
	const {
		state: { isRent },
	} = useLocation()

	const [comList, setComList] = useState(null)

	let timerId

	const handleChange = value => {
		if (value === '') {
			setComList(null)
			return
		}
		// 清除上一次的定时器
		clearTimeout(timerId)

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

	const onTipsClick =async ({ community, communityName }) => {
		if (isRent) {
			navigate('/rent', { state: { community, communityName } })
		} else {
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
