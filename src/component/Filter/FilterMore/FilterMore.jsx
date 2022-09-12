import React, { useState } from 'react'
import { Popup, Selector } from 'antd-mobile'

import styles from './FilterMore.module.css'
import FilterFooter from './../FilterFooter/FilterFooter'

const FilterMore = props => {
	const { visible, toggleFilterMore, ori, floor, room, char } = props

	// 存放已选筛选器数据
	const [selectedRoom, setSelectedRoom] = useState([])
	const [selectedOri, setSelectedOri] = useState([])
	const [selectedFloor, setSelectedFloor] = useState([])
	const [selectedChar, setSelectedChar] = useState([])

	return (
		<>
			<Popup
				visible={visible}
				onMaskClick={toggleFilterMore}
				position="right"
				bodyStyle={{ minWidth: '80vw' }}
				className={styles.cont}
			>
				<div className={styles.contWrap}>
					{/* 户型 */}
					<div className={styles.conditions}>
						{/* 标题 */}
						<div className={styles.title}>户型</div>
						{/* 标签 */}
						<Selector
							columns={3}
							options={room}
							multiple={true}
							onChange={arr => setSelectedRoom(arr)}
						/>
					</div>

					{/* 朝向 */}
					<div className={styles.conditions}>
						{/* 标题 */}
						<div className={styles.title}>朝向</div>
						{/* 标签 */}
						<Selector
							columns={3}
							options={ori}
							multiple={true}
							onChange={arr => setSelectedOri(arr)}
						/>
					</div>

					{/* 楼层 */}
					<div className={styles.conditions}>
						{/* 标题 */}
						<div className={styles.title}>楼层</div>
						{/* 标签 */}
						<Selector
							columns={3}
							options={floor}
							multiple={true}
							onChange={arr => setSelectedFloor(arr)}
						/>
					</div>

					{/* 房屋亮点 */}
					<div className={styles.conditions} style={{ borderBottom: 'none' }}>
						{/* 标题 */}
						<div className={styles.title}>房屋亮点</div>
						{/* 标签 */}
						<Selector
							columns={3}
							options={char}
							multiple={true}
							onChange={arr => setSelectedChar(arr)}
						/>
					</div>
				</div>

				<FilterFooter
					type="more"
					toggleFilterMore={toggleFilterMore}
					data={[
						...selectedRoom,
						...selectedOri,
						...selectedFloor,
						...selectedChar,
					]}
				/>
			</Popup>
		</>
	)
}

export default FilterMore
