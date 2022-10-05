import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'antd-mobile'

import SearchBar from './../../component/SearchBar/SearchBar'
import HouseItem from './../../component/HouseItem/HouseItem'
import Filter from './../../component/Filter/Filter'

import { API } from './../../utils/api'
import { updHouseInfo } from '../../redux/slices/houseListSlice'

import styles from './HouseList.module.css'

const HouseList = () => {
	// 获取当前城市 value
	const { value } = useSelector(state => state.curCityInfo)
	// 获取房屋信息列表
	const { value: houseInfo } = useSelector(state => state.houseInfo)

	const dispatch = useDispatch()

	// 接收首页导航（Nav 组件）传来的出租类型参数
	const { rentType } = useParams()

	// 接收 Search 组件传来的搜索结果
	const { state } = useLocation()

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// 请求房源数据
	async function fetchData() {
		Toast.show({
			icon: 'loading',
			content: '加载中…',
		})
		const result = await API.get(`/houses`, {
			params: {
				cityId: value,
				rentType,
				area: state ? state.community : null,
			},
		})
		Toast.clear()

		// 更新数据
		dispatch(updHouseInfo(result))
	}

	return (
		<div className={styles.cont}>
			<div className={styles.top}>
				<SearchBar />
			</div>

			{/* 筛选器 */}
			<Filter value={value} />

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
