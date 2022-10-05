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

	// 表单实体对象
	const [form] = Form.useForm()

	// 返回上一页
	const back = () => {
		navigate(-1)
	}

	// 提交数据
	const submit = () => {
		// 获取用户名、密码
		const data = form.getFieldsValue(['username', 'password'])

		// 登录函数
		const login = async () => {

			//登录请求
			const res = await API.post('/user/login', data)

			const { status, description, body } = res.data

			if (status === 200) {
				// 登录成功

				// token 存入本地存储
				localStorage.setItem(TOKEN, body.token)

				// 获取用户信息请求
				const userInfo = await API.get('/user', {
					headers: { authorization: body.token },
				})

				const { status, body: userbody } = userInfo.data

				if (status === 200) {
					// 获取信息成功

					// 将用户信息转为 JSON 格式数据存入本地存储
					localStorage.setItem('user',JSON.stringify(userbody))
				}

				// 提示登录成功
				Toast.show({
					icon: 'success',
					content: description,
				})
				
				// 返回
				back()
			} else {
				// 登录失败提示
				Toast.show({
					icon: 'fail',
					content: description,
				})
			}
		}

		// 注册函数
		const regist = async () => {

			// 注册请求
			const res = await API.post('/user/registered', data)

			const { status, description } = res.data

			if (status === 200) {
				// 注册成功

				//登录
				login()
			} else {
				// 注册失败提示
				Toast.show({
					icon: 'fail',
					content: description,
				})
			}
		}

		// 判断注册还是登录
		if (!isReg) {
			login()
		} else {
			regist()
		}
	}

	// 表单底部按钮
	const footer = () => {
		return (
			<div className={styles.footer}>
				<Button
					className={styles.button}
					size="large"
					fill="outline"
					color="primary"
					onClick={() =>
						// 切换登录/注册
						setIsReg(pre => {
							// 注册切换成登录时，重置确认密码输入框的值
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
								// 表单项的标识，用于获取、设置值等操作
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
									// 依赖项，当依赖项改变时重新触发验证
									dependencies={['password']}
									rules={[
										{
											required: true,
											message: '两次密码不一致！',
											type: 'string',
											whitespace: true,
											// 验证器，需要返回 Promise
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
