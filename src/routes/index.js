import { Navigate } from 'react-router-dom'
import HouseList from './../pages/HouseList/HouseList'
import Home from './../pages/Home/Home'
import Profile from './../pages/Profile/Profile'
import CityList from './../pages/CityList/CityList'
import Search from './../pages/Search/Search'
import Map from '../pages/Map/Map'
import HouseDetail from './../pages/HouseDetail/HouseDetail';

const routes = [
	{
		path: '/',
		element: <Navigate to="/home" />,
	},
	{
		path: '/home',
		element: <Home />,
	},
	{
		path: '/houselist',
		element: <HouseList />,
		children: [
			{
				path: ':rentType',
				element: <HouseList />,
			},
		],
	},
	{
		path: '/profile',
		element: <Profile />,
	},
	{
		path: '/citylist',
		element: <CityList />,
	},
	{
		path: '/search',
		element: <Search />,
	},
	{
		path: '/map',
		element: <Map />,
	},
	{
		path: 'detail',
		element: <HouseDetail />,
		children: [
			{
				path: ':code',
				element: <HouseDetail />,
			},
		],
	},
]

export default routes
