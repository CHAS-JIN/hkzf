import { createSlice } from '@reduxjs/toolkit'

const curCityInfo = createSlice({
	name: 'curCityInfo',
	initialState: {
		label: null,
		value: null
	},
	reducers: {
		updCurCityInfo: (state, action) => {
			state.label = action.payload.label
			state.value = action.payload.value
		},
	},
})
export const { updCurCityInfo } = curCityInfo.actions

export default curCityInfo.reducer

