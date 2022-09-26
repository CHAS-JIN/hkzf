import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'antd-mobile'

import { updHouseInfo } from '../../../redux/slices/houseListSlice'
import { API } from './../../../utils/api'

import styles from './FilterFooter.module.css'

const FilterFooter = props => {
	const { dropDownRef, type, toggleFilterMore, data, filterType } = props
	// 获取当前城市 value
	const { value } = useSelector(state => state.curCityInfo)

	const dispatch = useDispatch()

	// 点击取消按钮事件
	const handleCancel = () => {
		if (type === 'filter') {
			dropDownRef.current.close()
		} else if (type === 'more') {
			toggleFilterMore()
		}
	}

	// 点击确定按钮事件
	const handleOk = async () => {
		Toast.show({
			icon: 'loading',
			content: '加载中…',
		})

		// 存储数据请求结果
		let result

		if (type === 'filter') {
			// 筛选器请求
			switch (filterType) {
				case 'area':
					// area 筛选器请求
					if (data[1] === 'null') {
						// 区域 -> 不限
						result = await API.get(`/houses`, {
							params: { cityId: value },
						})
					} else if (data[1] !== 'null' && data[2] !== 'null') {
						// 区域 -> 区、镇 -> 街道
						result = await API.get(`/houses`, {
							params: { cityId: value, area: data[2] },
						})
					} else if (data[1] !== 'null' && data[2] === 'null') {
						// 区域 -> 区、镇 -> 不限
						result = await API.get(`/houses`, {
							params: { cityId: value, area: data[1] },
						})
					}
					break
				case 'type':
					result = await API.get(`/houses`, {
						params: {
							cityId: value,
							rentType: data,
						},
					})
					break
				case 'price':
					result = await API.get(`/houses`, {
						params: {
							cityId: value,
							price: data,
						},
					})
					break
				default:
					break
			}

			// 关闭下拉菜单
			dropDownRef.current.close()
		} else if (type === 'more') {
			// 更多筛选请求

			// 将数组转换成 逗号 分隔字符串
			let more = ''
			data.forEach(e => {
				more = more + ',' + e
			})
			more = more.replace(',', '')

			// 复合请求
			result = await API.get(`/houses`, {
				params: {
					cityId: value,
					more,
				},
			})

			// 关闭更多筛选
			toggleFilterMore()
		}

		// 更新房源数据
		dispatch(updHouseInfo(result))

		Toast.clear()
	}

	return (
		<>
			<div className={styles.bottom}>
				<div className={styles.cancel} onClick={handleCancel}>
					取消
				</div>
				<div className={styles.confirm} onClick={handleOk}>
					确定
				</div>
			</div>
		</>
	)
}

export default FilterFooter
