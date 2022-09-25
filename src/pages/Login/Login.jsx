import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, NavBar } from 'antd-mobile'

import Backdrop from './../../utils/Backdrop/Backdrop'

import styles from './Login.module.css'

const Login = () => {
	const navigate = useNavigate()
	const [isReg, setIsReg] = useState(false)
	const [form] = Form.useForm()

	// 返回上一页
	const back = () => {
		navigate(-1)
	}

	const footer = () => {
		return (
			<div className={styles.footer}>
				<Button
					className={styles.button}
					size="large"
					fill="outline"
					color="primary"
					onClick={() =>
						setIsReg(pre => {
							if (form.getFieldValue('passwordConfirm')) {
								form.resetFields(['passwordConfirm'])
							}
							return !pre
						})
					}
				>
					{isReg ? '返回登录' : '去注册'}
				</Button>
				<Button
					className={styles.button}
					type="submit"
					color="success"
					size="large"
					onClick={() => {
						console.log(form.getFieldValue('passwordConfirm'))
					}}
				>
					{!isReg ? '登录' : '注册'}
				</Button>
			</div>
		)
	}

	return (
		<Backdrop>
			<div className={styles.container}>
				<NavBar onBack={back} style={{ backgroundColor: '#f6f5f6' }}>
					登录
				</NavBar>
				<div className={styles.wrapper}>
					<div className={styles.main}>
						<Form form={form} mode="card" footer={footer()}>
							<Form.Item
								name="username"
								rules={[
									{
										required: true,
										message: '用户名不能为空！',
										type: 'string',
										whitespace: true,
									},
								]}
							>
								<Input placeholder="请输入用户名" />
							</Form.Item>

							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: '密码不能为空！',
										type: 'string',
										whitespace: true,
									},
								]}
							>
								<Input placeholder="请输入密码" type="password" />
							</Form.Item>

							{!isReg ? null : (
								<Form.Item
									name="passwordConfirm"
									dependencies={['password']}
									rules={[
										{
											required: true,
											message: '两次密码不一致！',
											type: 'string',
											whitespace: true,
											validator: (_, value) => {
												console.log(value)
												if (value === form.getFieldValue('password')) {
													return Promise.resolve()
												}
												return Promise.reject()
											},
										},
									]}
								>
									<Input placeholder="请再次输入密码" type="password" />
								</Form.Item>
							)}
						</Form>
					</div>
				</div>
			</div>
		</Backdrop>
	)
}

export default Login
