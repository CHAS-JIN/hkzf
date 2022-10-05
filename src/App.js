import { useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { AppOutline, EnvironmentOutline, UserOutline } from 'antd-mobile-icons'

import routes from './routes'
import { API } from './utils/api'
import { updCurCityInfo } from './redux/slices/curCityInfoSlice'

import './App.css'

function App() {
	const element = useRoutes(routes)
	const navigate = useNavigate()
	const location = useLocation()
	const { pathname } = location
	const cityLabel = useSelector(state=>state.curCityInfo.label)
	const dispatch = useDispatch()

	// 获取当前城市
	useEffect(() => {
		const curCity = new window.BMapGL.LocalCity()
		curCity.get(async res => {
			const cityName = res.name
			const result = await API.get(`/area/info`, {
				params: {
					name: cityName,
				},
			})
			if (!cityLabel) {
				dispatch(updCurCityInfo(result.data.body))
			}
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

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
				<TabBar
					activeKey={formatKey(pathname)}
					onChange={value => setRouteActive(value)}
				>
					{tabs.map(item => (
						<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
					))}
				</TabBar>
			</div>
		</div>
	)
}

export default App
