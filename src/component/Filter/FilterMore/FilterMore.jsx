import { Popup, Selector } from 'antd-mobile'
import React from 'react'
import styles from './FilterMore.module.css'

const FilterMore = props => {
	const { visible, toggleFilterMore, ori, floor, room, char } = props

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
						<Selector columns={3} options={room} multiple={true} />
					</div>

					{/* 朝向 */}
					<div className={styles.conditions}>
						{/* 标题 */}
						<div className={styles.title}>朝向</div>
						{/* 标签 */}
						<Selector columns={3} options={ori} multiple={true} />
					</div>

					{/* 楼层 */}
					<div className={styles.conditions}>
						{/* 标题 */}
						<div className={styles.title}>楼层</div>
						{/* 标签 */}
						<Selector columns={3} options={floor} multiple={true} />
					</div>

					{/* 房屋亮点 */}
					<div className={styles.conditions} style={{ borderBottom: 'none' }}>
						{/* 标题 */}
						<div className={styles.title}>房屋亮点</div>
						{/* 标签 */}
						<Selector columns={3} options={char} multiple={true} />
					</div>
				</div>

				<div className={styles.bottom}>
					<div className={styles.cancel}>取消</div>
					<div className={styles.confirm}>确定</div>
				</div>
			</Popup>
		</>
	)
}

export default FilterMore
