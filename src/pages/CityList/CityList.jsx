import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavBar, IndexBar, List, SpinLoading, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

import { updCurCityInfo } from '../../redux/slices/curCityInfoSlice'
import { API } from './../../utils/api'
import Backdrop from './../../utils/Backdrop/Backdrop'

import styles from './CityList.module.css'

const CityList = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// 获取当前城市数据
	const curCity = useSelector(state => state.curCityInfo)

	const [allCityList, setAllCityList] = useState(null)
	const [hotCityList, setHotCityList] = useState(null)

	// 组件挂载请求所有城市、热门城市列表数据
	useEffect(() => {
		getAllCityList()
		getHotCityList()
	}, [])

	// 返回首页
	const back = () => {
		navigate(-1)
	}

	// 请求所有城市列表数据函数
	async function getAllCityList() {
		const result = await API.get(`/area/city`, {
			params: {
				level: 1,
			},
		})
		setAllCityList(result.data.body)
	}

	// 请求热门城市列表数据函数
	async function getHotCityList() {
		const result = await API.get(`/area/hot`)
		setHotCityList(result.data.body)
	}

	// 格式化数据
	const formatData = list => {
		const cityList = {}

		list.forEach(item => {
			const first = item.short.substr(0, 1)
			if (cityList[first]) {
				cityList[first].push(item)
			} else {
				cityList[first] = [item]
			}
		})
		const cityIndex = Object.keys(cityList).sort()

		return {
			cityList,
			cityIndex,
		}
	}

	// 创建列表对象数组
	let groups = null
	if (allCityList && hotCityList) {
		const { cityList, cityIndex } = formatData(allCityList)
		groups = Array(cityIndex.length)
			.fill('')
			.map((_, i) => ({
				index: cityIndex[i].toUpperCase(),
				title: cityIndex[i].toUpperCase(),
				items: cityList[cityIndex[i]],
			}))
		groups.unshift(
			{
				index: '#',
				title: '当前城市',
				items: [curCity],
			},
			{
				index: '热门城市',
				title: '热门城市',
				items: hotCityList,
			}
		)
	}

	// 切换城市
	const HOUSE_CITY = ['北京', '上海', '广州', '深圳']
	const changeCity = cityInfo => {
		const { label } = cityInfo
		if (HOUSE_CITY.indexOf(label) > -1) {
			dispatch(updCurCityInfo(cityInfo))
			back()
		} else {
			Toast.show({
				content: '该城市暂无房源',
			})
		}
	}

	return (
		<Backdrop>
			<div className={styles.cityCont}>
				<NavBar onBack={back} style={{ backgroundColor: '#f6f5f6' }}>
					城市列表
				</NavBar>
				<div style={{ height: '100%' }}>
					{/* 加载中 */}
					{!groups && (
						<div className={styles.loading}>
							<SpinLoading style={{ '--size': '100rem' }} />
						</div>
					)}

					{/* 列表项 */}
					<IndexBar>
						{groups &&
							groups.map(group => {
								const { title, items, index } = group
								return (
									<IndexBar.Panel index={index} title={title} key={title}>
										<List>
											{items.map(item => (
												<List.Item
													key={item.value}
													onClick={() => changeCity(item)}
													arrow={false}
												>
													{item.label}
												</List.Item>
											))}
										</List>
									</IndexBar.Panel>
								)
							})}
					</IndexBar>
				</div>
			</div>
		</Backdrop>
	)
}

export default CityList
