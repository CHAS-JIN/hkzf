import React, { useState } from 'react'
import styles from './HouseList.module.css'
import SearchBar from './../../component/SearchBar/SearchBar'
import { Dropdown, PickerView, Popup } from 'antd-mobile'
import HouseItem from './../../component/HouseItem/HouseItem'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const HouseList = () => {
	// 获取当前城市 value
	const { value } = useSelector(state => state.curCityInfo)
	// 存储房屋信息列表
	const [houseInfo, setHouseInfo] = useState(null)
	// 地区筛选器数据
	const [areaFilterOpt, setAreaFilterOpt] = useState([
		['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
		['1', '222222222222222222222222222222222', '3'],
	])
	// 方式筛选器数据
	const [modeFilterOpt, setModeFilterOpt] = useState([
		['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
		['1', '222222222222222222222222222222222', '3'],
	])
	// 租金筛选器数据
	const [priceFilterOpt, setPriceFilterOpt] = useState([
		['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
		['1', '222222222222222222222222222222222', '3'],
	])

	const [visible4, setVisible4] = useState(false)

	useEffect(() => {
		async function fetchData() {
			const result = await axios.get(
				`http://localhost:8080/houses?cityId=${value}`
			)
			setHouseInfo(result)
		}
		fetchData()
		return () => {}
	}, [])

	return (
		<div className={styles.cont}>
			<div className={styles.top}>
				<SearchBar />
			</div>

			<Dropdown>
				<Dropdown.Item key="area" title="区域">
					<PickerView columns={areaFilterOpt} value="1" />
				</Dropdown.Item>
				<Dropdown.Item key="mode" title="方式">
					<PickerView columns={modeFilterOpt} value="1" />
				</Dropdown.Item>
				<Dropdown.Item key="price" title="租金">
					<PickerView columns={priceFilterOpt} value="1" />
				</Dropdown.Item>
				<Dropdown.Item
					key="more"
					title="筛选"
					onClick={() => setVisible4(true)}
				></Dropdown.Item>
				<Popup
					visible={visible4}
					onMaskClick={() => {
						setVisible4(false)
					}}
					position="right"
					bodyStyle={{ minWidth: '60vw' }}
				>
					Hello
				</Popup>
			</Dropdown>

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
