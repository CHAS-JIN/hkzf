import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { NavBar, IndexBar, List, SpinLoading } from 'antd-mobile'
import {
	useGetCityListQuery,
	useGetHotCityListQuery,
} from '../../redux/api/cityInfoApi'
import { updCurCityInfo } from '../../redux/slices/curCityInfoSlice'

import styles from './CityList.module.css'
import Backdrop from './../../utils/Backdrop/Backdrop'

const CityList = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1)
	}

	const { data: allCity, isSuccess, isLoading } = useGetCityListQuery()
	const { data: hotCity } = useGetHotCityListQuery()
	const curCity = useSelector(state => state.curCityInfo)

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
	let groups
	if (isSuccess) {
		const { cityList, cityIndex } = formatData(allCity.body)
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
				items: hotCity.body,
			}
		)
	}

	// 切换城市
	const changeCity = cityInfo => {
		dispatch(updCurCityInfo(cityInfo))
		goBack()
	}

	return (
		<Backdrop>
			<div className={styles.cityCont}>
				<NavBar onBack={goBack} style={{ backgroundColor: '#f6f5f6' }}>
					城市列表
				</NavBar>
				<div style={{ height: '100%' }}>
					{isLoading && (
						<div className={styles.loading}>
							<SpinLoading style={{ '--size': '100rem' }} />
						</div>
					)}

					<IndexBar>
						{isSuccess &&
							groups.map(group => {
								const { title, items, index } = group
								return (
									<IndexBar.Panel index={index} title={title} key={title}>
										<List>
											{items.map(item => (
												<List.Item key={item.value} onClick={()=>changeCity(item)} arrow={false}>
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
