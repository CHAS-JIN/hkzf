import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import {
	AppOutline,
	EnvironmentOutline,
	UserOutline,
	MessageOutline,
} from 'antd-mobile-icons'



import routes from './routes'
import './App.css'

function App() {
	const element = useRoutes(routes)

	const navigate = useNavigate()
	const location = useLocation()
	const { pathname } = location

	const setRouteActive = value => {
		navigate(value, { replace: true })
	}

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
			key: '/news',
			title: '资讯',
			icon: <MessageOutline />,
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
				<TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
					{tabs.map(item => (
						<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
					))}
				</TabBar>
			</div>
		</div>
	)
}

export default App
