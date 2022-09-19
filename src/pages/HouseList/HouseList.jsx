import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
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

	const { rentType } = useParams()

	useEffect(() => {
		fetchData()
		return () => {}
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
				rentType
			},
		})
		Toast.clear()
		dispatch(updHouseInfo(result))
	}

	return (
		<div className={styles.cont}>
			<div className={styles.top}>
				<SearchBar />
			</div>

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
