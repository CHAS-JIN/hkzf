import React, { useEffect } from 'react'
import Swipers from '../../component/Swipers/Swipers'
import NavBar from './../../component/NavBar/NavBar'
import RentGroups from './../../component/RentGroups/RentGroups'
import Latest from './../../component/Latest/Latest'
import SearchBar from './../../component/SearchBar/SearchBar'

const Home = () => {

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
