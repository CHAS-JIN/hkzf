import React, { useState } from 'react'
import styles from './HouseList.module.css'
import SearchBar from './../../component/SearchBar/SearchBar'
import HouseItem from './../../component/HouseItem/HouseItem'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Filter from './../../component/Filter/Filter';

const HouseList = () => {
	// 获取当前城市 value
	const { value } = useSelector(state => state.curCityInfo)
	// 存储房屋信息列表
	const [houseInfo, setHouseInfo] = useState(null)

	useEffect(() => {
		fetchData()
		// fetchFilterData()
		return () => {}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// 请求房源数据
	async function fetchData() {
		const result = await axios.get(
			`http://localhost:8080/houses?cityId=${value}`
		)
		setHouseInfo(result)
	}

	return (
		<div className={styles.cont}>
			<div className={styles.top}>
				<SearchBar />
			</div>

			<Filter value={value}/>

			<div className={styles.items}>
				{/* 列表项 */}
				{houseInfo &&
					houseInfo.data.body.list.map(item => (
						<HouseItem data={item} key={item.houseCode} />
					))}
			</div>
		</div>
	)
}

export default HouseList
