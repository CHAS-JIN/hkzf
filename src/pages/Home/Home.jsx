import React from 'react'
import Swipers from '../../component/Swipers/Swipers'
import Nav from './../../component/Nav/Nav'
import RentGroups from './../../component/RentGroups/RentGroups'
import Latest from './../../component/Latest/Latest'
import SearchBar from './../../component/SearchBar/SearchBar'

const Home = () => {
	return (
		<div style={{ backgroundColor: '#f4f5f2' }}>
			<div style={{position:'absolute',zIndex:'9',top:'60rem',width:'100%'}}>
				<SearchBar />
			</div>
			<Swipers />
			<Nav />
			<RentGroups />
			<Latest />
		</div>
	)
}

export default Home
