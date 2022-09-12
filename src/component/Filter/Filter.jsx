import { Dropdown, CascadePickerView } from 'antd-mobile'
import React, { useState } from 'react'
import styles from './Filter.module.css'
import { UnorderedListOutline } from 'antd-mobile-icons'
import axios from 'axios'
import { useEffect } from 'react'
import FilterMore from './FilterMore/FilterMore'

const Filter = props => {
	const { value } = props
	// 地区筛选器数据
	const [areaFilterOpt, setAreaFilterOpt] = useState([])
	// 方式筛选器数据
	const [typeFilterOpt, setTypeFilterOpt] = useState([])
	// 租金筛选器数据
	const [priceFilterOpt, setPriceFilterOpt] = useState([])
	// 出租类型筛选器数据
	const [roomFilterOpt, setRoomFilterOpt] = useState([])
	// 房屋亮点筛选器数据
	const [charFilterOpt, setCharFilterOpt] = useState([])
	// 楼层筛选器数据
	const [floorFilterOpt, setFloorFilterOpt] = useState([])
	// 朝向筛选器数据
	const [oriFilterOpt, setOriFilterOpt] = useState([])
	// 是否展示更多筛选
	const [showMoreFilter, setShowMoreFilter] = useState(false)

	useEffect(() => {
		fetchFilterData()
		return () => {}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// 请求筛选条件数据
	async function fetchFilterData() {
		const result = await axios.get(
			`http://localhost:8080/houses/condition?id=${value}`
		)

		// 格式化
		formatArea(result.data.body.area)

		// 设置筛选器数据
		setAreaFilterOpt([result.data.body.area, result.data.body.subway])
		setTypeFilterOpt(result.data.body.rentType)
		setPriceFilterOpt(result.data.body.price)
		setRoomFilterOpt(result.data.body.roomType)
		setCharFilterOpt(result.data.body.characteristic)
		setFloorFilterOpt(result.data.body.floor)
		setOriFilterOpt(result.data.body.oriented)
	}

	// 格式化区域数据 (删除最后一级数据)
	const formatArea = area => {
		area.children.forEach(item => {
			if ('children' in item) {
				item.children.forEach(i => {
					if ('children' in i) {
						delete i.children
					}
				})
			}
		})
		return area
	}

	const toggleFilterMore = () => {
		setShowMoreFilter(!showMoreFilter)
	}

	return (
		<>
			<div className={styles.filter}>
				<Dropdown className={styles.filterDrop} closeOnClickAway={true}>
					<Dropdown.Item key="area" title="区域">
						<CascadePickerView
							options={areaFilterOpt}
							onChange={val => console.log(val)}
						/>
					</Dropdown.Item>
					<Dropdown.Item key="type" title="方式">
						<CascadePickerView
							options={typeFilterOpt}
							onChange={val => console.log(val)}
						/>
					</Dropdown.Item>
					<Dropdown.Item key="price" title="租金">
						<CascadePickerView
							options={priceFilterOpt}
							onChange={val => console.log(val)}
						/>
					</Dropdown.Item>
				</Dropdown>

				<div className={styles.filterMore} onTouchEnd={toggleFilterMore}>
					<span>筛选</span>
					<UnorderedListOutline />
				</div>

				<FilterMore
					toggleFilterMore={toggleFilterMore}
					visible={showMoreFilter}
					room={roomFilterOpt}
					char={charFilterOpt}
					floor={floorFilterOpt}
					ori={oriFilterOpt}
				/>
			</div>
		</>
	)
}

export default Filter
