import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	Button,
	Form,
	ImageUploader,
	Input,
	Picker,
	TextArea,
	Toast,
} from 'antd-mobile'

import Backdrop from './../../utils/Backdrop/Backdrop'
import MyNavBar from './../../component/MyNavBar/MyNavBar'
import HousePackage from './../../component/HousePackage/HousePackage'
import { API } from './../../utils/api'
import { TOKEN } from '../../utils/constant'

import styles from './Rent.module.css'

const Rent = () => {
	const [roomVisible, setRoomVisible] = useState(false)
	const [floorVisible, setFloorVisible] = useState(false)
	const [oriVisible, setOriVisible] = useState(false)
	const [fileList, setFileList] = useState([])

	const comInput = useRef()

	// 创建表单实例
	const [form] = Form.useForm()

	const navigate = useNavigate()

	// 接收 Search 组件通过路由传来的参数 community, communityName
	const { state } = useLocation()

	const token = localStorage.getItem(TOKEN)

	// 监听 state 数据变化，设置表单值
	useEffect(() => {
		if (state) {
			form.setFieldValue('community', state.communityName)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state])

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

	// 表单验证规则
	const rules = [{ required: true, message: '不能为空！' }]

	// 设置 房屋配置 表单值
	const addSupporting = data => {
		form.setFieldValue('supporting', data.join('|'))
	}

	// 保存上传的图片
	const saveImg = file => {
		setFileList(pre => [...pre, file])
		return {
			file: file,
			url: URL.createObjectURL(file),
		}
	}

	// 上传图片以及表单数据
	const submit = async () => {
		// 后端要求以 FormData 形式传值
		const formData = new FormData()
		fileList.forEach(item => formData.append('file', item))

		// 上传图片
		const updImgRes = await API.post('/houses/image', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		// 获取所有表单数据
		const data = form.getFieldsValue(true)

		// 格式化数据
		data.community = state.community
		data.floor = data.floor[0]
		data.oriented = data.oriented[0]
		data.roomType = data.roomType[0]
		data.houseImg = updImgRes.data.body.join('|')

		// 上传数据
		const udpDataRes = await API.post('/user/houses', data, {
			headers: { authorization: token },
		})

		// 判断是否上传成功
		if (udpDataRes.data.status === 200) {
			Toast.config('发布成功', 1, null, false)
			navigate('/myrent', { replace: true })
		} else {
			Toast.config('服务器偷懒了，请稍后再试~', 2, null, false)
		}
	}

	return (
		<Backdrop>
			<div className={styles.container}>
				<MyNavBar>出租房屋</MyNavBar>
				<div className={styles.wrapper}>
					<Form
						form={form}
						layout="horizontal"
						footer={
							<Button
								block
								type="submit"
								color="primary"
								size="large"
								onClick={submit}
							>
								提交
							</Button>
						}
					>
						{/* 小区名称 */}
						<Form.Item
							label="小区名称"
							name="community"
							onClick={() => navigate('/search', { state: { isRent: true } })}
							rules={rules}
						>
							<Input ref={comInput} placeholder="点击搜索小区名称" readOnly />
						</Form.Item>

						{/* 租金 */}
						<Form.Item
							name="price"
							label="租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金"
							extra="￥/月"
							rules={rules}
						>
							<Input placeholder="请输入租金" />
						</Form.Item>

						{/* 建筑面积 */}
						<Form.Item
							name="size"
							label="建筑面积"
							extra="平方米"
							rules={rules}
						>
							<Input placeholder="请输入建筑面积" />
						</Form.Item>

						{/* 户型 */}
						<Form.Item
							name="roomType"
							rules={rules}
							label="户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型"
							onClick={() => setRoomVisible(true)}
							trigger="onConfirm"
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
										return items.map(item => item?.label)
									}
								}}
							</Picker>
						</Form.Item>

						{/* 所在楼层 */}
						<Form.Item
							name="floor"
							label="所在楼层"
							onClick={() => setFloorVisible(true)}
							rules={rules}
							trigger="onConfirm"
						>
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
							name="oriented"
							rules={rules}
							label="朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向"
							onClick={() => setOriVisible(true)}
							trigger="onConfirm"
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
						<Form.Item
							name="title"
							label="房屋标题"
							layout="vertical"
							rules={rules}
						>
							<Input placeholder="请输入标题（例如：整租 小区名 2室 5000元）" />
						</Form.Item>

						{/* 房屋图片 */}
						<Form.Item
							name="houseImg"
							label="房屋图片"
							layout="vertical"
							rules={rules}
						>
							<ImageUploader
								multiple={true}
								upload={saveImg}
							/>
						</Form.Item>

						{/* 房屋配置 */}
						<Form.Item
							name="supporting"
							label="房屋配置"
							layout="vertical"
							rules={rules}
						>
							<HousePackage select addSupporting={addSupporting} />
						</Form.Item>

						{/* 房屋描述 */}
						<Form.Item
							name="description"
							label="房屋描述"
							layout="vertical"
							rules={rules}
						>
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
