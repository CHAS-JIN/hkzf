import React, { useState } from 'react'

import styles from './HousePackage.module.css'

const HousePackage = ({ list, select, addSupporting }) => {
	// 所有房屋配置项
	const HOUSE_PACKAGE = [
		{
			id: 1,
			name: '衣柜',
			icon: 'icon-wardrobe',
		},
		{
			id: 2,
			name: '洗衣机',
			icon: 'icon-wash',
		},
		{
			id: 3,
			name: '空调',
			icon: 'icon-air',
		},
		{
			id: 4,
			name: '天然气',
			icon: 'icon-gas',
		},
		{
			id: 5,
			name: '冰箱',
			icon: 'icon-ref',
		},
		{
			id: 6,
			name: '暖气',
			icon: 'icon-Heat',
		},
		{
			id: 7,
			name: '电视',
			icon: 'icon-vid',
		},
		{
			id: 8,
			name: '热水器',
			icon: 'icon-heater',
		},
		{
			id: 9,
			name: '宽带',
			icon: 'icon-broadband',
		},
		{
			id: 10,
			name: '沙发',
			icon: 'icon-sofa',
		},
	]

	const [selectedItems, setSelectedItems] = useState([])

	// 选中状态切换函数
	const toggleSelected = name => {
		let newSelectedItems

		// 判断该项是否选中
		if (selectedItems.indexOf(name) > -1) {
			// 选中：从数组中删除选中项，也就是保留未选中项
			newSelectedItems = selectedItems.filter(item => item !== name)
		} else {
			// 未选中：添加到数组中
			newSelectedItems = [...selectedItems, name]
		}

		// 将数据传回父组件（Rent 组件）
		addSupporting(newSelectedItems)

		// 将新数组保存
		setSelectedItems(newSelectedItems)
	}

	// 渲染配置项
	const renderItems = () => {
		let data

		// 有 select 表示为房屋出租页面选择配置
		if (select) {
			data = HOUSE_PACKAGE
		} else {
			// 无 select
			// 从所有的列表项中过滤出要展示的（list）列表项
			data = HOUSE_PACKAGE.filter(d => list.includes(d.name))
		}

		return data.map(item => {
			// 判断该项是否选中
			const isSelected = selectedItems.indexOf(item.name) > -1

			return (
				<li
					key={item.id}
					className={[styles.item, isSelected ? styles.active : ''].join(' ')}
					onClick={select && (() => toggleSelected(item.name))}
				>
					<p>
						<i className={`iconfont ${item.icon} ${styles.icon}`} />
					</p>
					{item.name}
				</li>
			)
		})
	}

	return <ul className={styles.root}>{renderItems()}</ul>
}

export default HousePackage
