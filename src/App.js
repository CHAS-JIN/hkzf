import { useRoutes, useNavigate, useLocation } from 'react-router-dom'

import { TabBar } from 'antd-mobile'
import {
	AppOutline,
	EnvironmentOutline,
	UserOutline,
} from 'antd-mobile-icons'

import routes from './routes'
import './App.css'

function App() {
	const element = useRoutes(routes)

	const navigate = useNavigate()
	const location = useLocation()
	const { pathname } = location

	// 格式化路径
	const formatKey = pathname => {
		if (pathname.includes('home')) {
			return '/home'
		} else if (pathname.includes('houselist')) {
			return '/houselist'
		} else if (pathname.includes('profile')) {
			return '/profile'
		}
	}

	// 路由跳转
	const setRouteActive = value => {
		navigate(value, { replace: true })
	}

	// 标签栏信息
	const tabs = [
		{
			key: '/home',
			title: '首页',
			icon: <AppOutline />,
		},
		{
			key: '/houselist',
			title: '找房',
			icon: <EnvironmentOutline />,
		},
		{
			key: '/profile',
			title: '我的',
			icon: <UserOutline />,
		},
	]

	return (
		<div className="App">
			<div className="content">{element}</div>
			<div className="tabBar">
				<TabBar activeKey={formatKey(pathname)} onChange={value => setRouteActive(value)}>
					{tabs.map(item => (
						<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
					))}
				</TabBar>
			</div>
		</div>
	)
}

export default App
