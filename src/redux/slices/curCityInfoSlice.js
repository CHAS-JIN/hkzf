import { createSlice } from '@reduxjs/toolkit'

const curCityInfoSlice = createSlice({
	name: 'curCityInfoSlice',
	initialState: {
		label: '北京',
		value: 'AREA|88cff55c-aaa4-e2e0'
	},
	reducers: {
		updCurCityInfo: (state, action) => {
			state.label = action.payload.label
			state.value = action.payload.value
		},
	},
})
export const { updCurCityInfo } = curCityInfoSlice.actions

export default curCityInfoSlice.reducer

