import {Navigate} from "react-router-dom";
import HouseList from './../pages/HouseList/HouseList';
import Home from './../pages/Home/Home'
import News from './../pages/News/News';
import Profile from './../pages/Profile/Profile';

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
	},
	{
		path: '/news',
		element: <News />,
	},
	{
		path: '/profile',
		element: <Profile />,
	}
]

export default routes;
