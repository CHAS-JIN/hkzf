import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, NavBar } from 'antd-mobile'

import Backdrop from './../../utils/Backdrop/Backdrop'

import styles from './Login.module.css'

const Login = () => {
	const navigate = useNavigate()
	const [isReg, setIsReg] = useState(false)

	// 返回上一页
	const back = () => {
		navigate(-1)
	}

	const footer = type => {
		if (type === 'login') {
			return (
				<div className={styles.footer}>
					<Button
						className={styles.button}
						size="large"
						fill="outline"
						color="primary"
						onClick={() => setIsReg(true)}
					>
						注册
					</Button>
					<Button
						className={styles.button}
						type="submit"
						color="success"
						size="large"
					>
						登录
					</Button>
				</div>
			)
		} else if (type === 'reg') {
			return (
				<div className={styles.footer}>
					<Button
						className={styles.button}
						size="large"
						fill="outline"
						color="primary"
						onClick={() => setIsReg(false)}
					>
						返回登录
					</Button>
					<Button
						className={styles.button}
						type="submit"
						color="success"
						size="large"
					>
						注册
					</Button>
				</div>
			)
		}
	}

	const renderForm = () => {
		if (!isReg) {
			return (
				<Form name="login" mode="card" footer={footer('login')}>
					<Form.Item
						name="username"
						rules={[{ required: true, message: '用户名不能为空' }]}
					>
						<Input placeholder="请输入用户名" />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[{ required: true, message: '密码不能为空' }]}
					>
						<Input placeholder="请输入密码" type="password" />
					</Form.Item>
				</Form>
			)
		} else {
			return (
				<Form name="reg" mode="card" footer={footer('reg')}>
					<Form.Item
						name="username"
						rules={[{ required: true, message: '用户名不能为空' }]}
					>
						<Input placeholder="请输入用户名" />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[{ required: true, message: '密码不能为空' }]}
					>
						<Input placeholder="请输入密码" type="password" />
					</Form.Item>

					<Form.Item
						name="passwordConfirm"
						rules={[{ required: true, message: '请再次输入密码' },{validator:{confirmPass}}]}
					>
						<Input placeholder="请再次输入密码" type="password" />
					</Form.Item>
				</Form>
			)
		}
	}

    const confirmPass = () => {}

	return (
		<Backdrop>
			<div className={styles.container}>
				<NavBar onBack={back} style={{ backgroundColor: '#f6f5f6' }}>
					登录
				</NavBar>
				<div className={styles.wrapper}>
					<div className={styles.main}>{renderForm()}</div>
				</div>
			</div>
		</Backdrop>
	)
}

export default Login
