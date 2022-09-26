import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Dropdown, CascadePickerView } from 'antd-mobile'
import { UnorderedListOutline } from 'antd-mobile-icons'

import FilterMore from './FilterMore/FilterMore'
import FilterFooter from './FilterFooter/FilterFooter'
import { API } from './../../utils/api'

import styles from './Filter.module.css'

const Filter = props => {
	const { value } = props

	const dropDownRef = useRef()

	// 地区筛选器数据
	const [areaFilterOpt, setAreaFilterOpt] = useState([])
	const [areaFilterData, setAreaFilterData] = useState([])

	// 方式筛选器数据
	const [typeFilterOpt, setTypeFilterOpt] = useState([])
	const [typeFilterData, setTypeFilterData] = useState([])

	// 租金筛选器数据
	const [priceFilterOpt, setPriceFilterOpt] = useState([])
	const [priceFilterData, setPriceFilterData] = useState([])

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// 请求筛选条件数据
	function fetchFilterData() {
		API.get(`/houses/condition`, {
			params: {
				id: value,
			},
		}).then(result => {
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
		})
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

	// 控制 更多筛选 是否展示
	const toggleFilterMore = () => {
		setShowMoreFilter(!showMoreFilter)
	}

	// 更新筛选器所选数据
	const updFilterData = (data, type) => {
		switch (type) {
			case 'area':
				setAreaFilterData(data)
				break
			case 'type':
				setTypeFilterData(data)
				break
			case 'price':
				setPriceFilterData(data)
				break
			default:
				break
		}
	}

	return (
		<>
			<div className={styles.filter}>
				<Dropdown
					className={styles.filterDrop}
					closeOnClickAway={true}
					ref={dropDownRef}
				>
					<Dropdown.Item key="area" title="区域">
						<div style={{ marginBottom: '49px' }}>
							<CascadePickerView
								options={areaFilterOpt}
								onChange={val => updFilterData(val, 'area')}
							/>
						</div>
						<div>
							<FilterFooter
								dropDownRef={dropDownRef}
								type="filter"
								data={areaFilterData}
								filterType="area"
							/>
						</div>
					</Dropdown.Item>

					<Dropdown.Item key="type" title="方式">
						<div style={{ marginBottom: '49px' }}>
							<CascadePickerView
								options={typeFilterOpt}
								onChange={val => updFilterData(val, 'type')}
							/>
						</div>
						<div>
							<FilterFooter
								dropDownRef={dropDownRef}
								type="filter"
								data={typeFilterData}
								filterType="type"
							/>
						</div>
					</Dropdown.Item>

					<Dropdown.Item key="price" title="租金">
						<div style={{ marginBottom: '49px' }}>
							<CascadePickerView
								options={priceFilterOpt}
								onChange={val => updFilterData(val, 'price')}
							/>
						</div>
						<div>
							<FilterFooter
								dropDownRef={dropDownRef}
								type="filter"
								data={priceFilterData}
								filterType="price"
							/>
						</div>
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
