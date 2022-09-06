import { createSlice } from '@reduxjs/toolkit'

const curCityInfoSlice = createSlice({
	name: 'curCityInfoSlice',
	initialState: {
		label: '北京',
		value: 'AREA|88cff55c-aaa4-e2e0',
		longitude: 116.404,
		latitude: 39.915,
	},
	reducers: {
		updCurCityInfo: (state, action) => {
			state = action.payload
		},
	},
})
export const { updCurCityInfo } = curCityInfoSlice.actions

export default curCityInfoSlice.reducer

