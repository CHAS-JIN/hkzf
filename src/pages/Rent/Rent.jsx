import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Button,
	Dialog,
	Form,
	ImageUploader,
	Input,
	Picker,
	TextArea,
} from 'antd-mobile'

import Backdrop from './../../utils/Backdrop/Backdrop'
import MyNavBar from './../../component/MyNavBar/MyNavBar'
import HousePackage from './../../component/HousePackage/HousePackage'

import styles from './Rent.module.css'

const Rent = () => {
	const [roomVisible, setRoomVisible] = useState(false)
	const [floorVisible, setFloorVisible] = useState(false)
	const [oriVisible, setOriVisible] = useState(false)
	const [houseImg, setHouseImg] = useState([])

	const navigate = useNavigate()

	// 户型
	const roomTypeData = [
		[
			{ label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
			{ label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
			{ label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
			{ label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
			{ label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' },
		],
	]

	// 朝向：
	const orientedData = [
		[
			{ label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
			{ label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
			{ label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
			{ label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
			{ label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
			{ label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
			{ label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
			{ label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' },
		],
	]

	// 楼层
	const floorData = [
		[
			{ label: '高楼层', value: 'FLOOR|1' },
			{ label: '中楼层', value: 'FLOOR|2' },
			{ label: '低楼层', value: 'FLOOR|3' },
		],
	]

	const upload = async file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				resolve({
					url: reader.result,
				})
			}
		})
	}

	return (
		<Backdrop>
			<div className={styles.container}>
				<MyNavBar>出租房屋</MyNavBar>
				<div className={styles.wrapper}>
					<Form
						layout="horizontal"
						footer={
							<Button block type="submit" color="primary" size="large">
								提交
							</Button>
						}
					>
						{/* 小区名称 */}
						<Form.Item label="小区名称" onClick={() => navigate('/search')}>
							<Input placeholder="点击搜索小区名称" readOnly />
						</Form.Item>

						{/* 租金 */}
						<Form.Item
							label="租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金"
							extra="￥/月"
						>
							<Input placeholder="请输入租金" />
						</Form.Item>

						{/* 建筑面积 */}
						<Form.Item label="建筑面积" extra="平方米">
							<Input placeholder="请输入建筑面积" />
						</Form.Item>

						{/* 户型 */}
						<Form.Item
							label="户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型"
							onClick={() => setRoomVisible(true)}
						>
							<Picker
								columns={roomTypeData}
								visible={roomVisible}
								onClose={() => {
									setRoomVisible(false)
								}}
							>
								{items => {
									if (items.every(item => item === null)) {
										return <span style={{ color: '#ccc' }}>未选择</span>
									} else {
										return items.map(
											item =>
												item?.label ?? (
													<span style={{ color: '#ccc' }}>未选择</span>
												)
										)
									}
								}}
							</Picker>
						</Form.Item>

						{/* 所在楼层 */}
						<Form.Item label="所在楼层" onClick={() => setFloorVisible(true)}>
							<Picker
								columns={floorData}
								visible={floorVisible}
								onClose={() => {
									setFloorVisible(false)
								}}
							>
								{items => {
									if (items.every(item => item === null)) {
										return <span style={{ color: '#ccc' }}>未选择</span>
									} else {
										return items.map(
											item =>
												item?.label ?? (
													<span style={{ color: '#ccc' }}>未选择</span>
												)
										)
									}
								}}
							</Picker>
						</Form.Item>

						{/* 朝向 */}
						<Form.Item
							label="朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向"
							onClick={() => setOriVisible(true)}
						>
							<Picker
								columns={orientedData}
								visible={oriVisible}
								onClose={() => {
									setOriVisible(false)
								}}
							>
								{items => {
									if (items.every(item => item === null)) {
										return <span style={{ color: '#ccc' }}>未选择</span>
									} else {
										return items.map(
											item =>
												item?.label ?? (
													<span style={{ color: '#ccc' }}>未选择</span>
												)
										)
									}
								}}
							</Picker>
						</Form.Item>

						{/* 房屋标题 */}
						<Form.Item label="房屋标题" layout="vertical">
							<Input placeholder="请输入标题（例如：整租 小区名 2室 5000元）" />
						</Form.Item>

						{/* 房屋图片 */}
						<Form.Item label="房屋图片" layout="vertical">
							<ImageUploader
								multiple={true}
								value={houseImg}
								// upload={upload}
								onDelete={() => {
									return Dialog.confirm({
										content: '是否确认删除',
									})
								}}
							/>
						</Form.Item>

						{/* 房屋配置 */}
						<Form.Item label="房屋配置" layout="vertical">
							<HousePackage select />
						</Form.Item>

						{/* 房屋描述 */}
						<Form.Item label="房屋描述" layout="vertical">
							<TextArea
								placeholder="请输入房屋描述信息"
								autoSize={{ minRows: 2, maxRows: 10 }}
							/>
						</Form.Item>
					</Form>
				</div>
			</div>
		</Backdrop>
	)
}

export default Rent
