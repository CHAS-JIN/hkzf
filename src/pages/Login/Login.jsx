import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, NavBar, Toast } from 'antd-mobile'

import Backdrop from './../../utils/Backdrop/Backdrop'
import { API } from './../../utils/api'
import { TOKEN } from '../../utils/constant'

import styles from './Login.module.css'

const Login = () => {
	const navigate = useNavigate()
	const [isReg, setIsReg] = useState(false)
	const [form] = Form.useForm()

	// 返回上一页
	const back = () => {
		navigate(-1)
	}

	const submit = () => {
		const data = form.getFieldsValue(['username', 'password'])

		const login = async () => {
			const res = await API.post('/user/login', data)

			const { status, description, body } = res.data

			if (status === 200) {
				localStorage.setItem(TOKEN, body.token)

				const userInfo = await API.get('/user', {
					headers: { authorization: body.token },
				})

				const { status, body: userbody } = userInfo.data

				if (status === 200) {
					localStorage.setItem('user',JSON.stringify(userbody))
				}

				Toast.show({
					icon: 'success',
					content: description,
				})

				back()
			} else {
				Toast.show({
					icon: 'fail',
					content: description,
				})
			}
		}

		const regist = async () => {
			const res = await API.post('/user/registered', data)

			const { status, description } = res.data

			if (status === 200) {
				login()
			} else {
				Toast.show({
					icon: 'fail',
					content: description,
				})
			}
		}

		if (!isReg) {
			login()
		} else {
			regist()
		}
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
					onClick={submit}
				>
					{!isReg ? '登录' : '注册并登录'}
				</Button>
			</div>
		)
	}

	return (
		<Backdrop>
			<div className={styles.container}>
				<NavBar onBack={back} style={{ backgroundColor: '#f6f5f6' }}>
					{!isReg ? '登录' : '注册'}
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
