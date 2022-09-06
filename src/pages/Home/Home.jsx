import React, { useState } from 'react'
import Swipers from '../../component/Swipers/Swipers'
import NavBar from './../../component/NavBar/NavBar'
import RentGroups from './../../component/RentGroups/RentGroups'
import Latest from './../../component/Latest/Latest'
import SearchBar from './../../component/SearchBar/SearchBar'

import {useGetCurCityInfoQuery} from '../../redux/api/cityInfoApi';

const Home = () => {
	const [cityName, setCityName] = useState();
	const curCity = new window.BMapGL.LocalCity()
	curCity.get(res => {
		setCityName(res.name)
	})
	const cityInfoApiObj = useGetCurCityInfoQuery(cityName)
	// console.log(cityInfoApiObj)
	

	return (
		<div style={{ backgroundColor: '#f4f5f2' }}>
			<SearchBar />
			<Swipers />
			<NavBar />
			<RentGroups />
			<Latest />
		</div>
	)
}

export default Home
