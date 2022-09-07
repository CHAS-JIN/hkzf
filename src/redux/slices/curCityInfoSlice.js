import { createSlice } from '@reduxjs/toolkit'

const curCityInfoSlice = createSlice({
	name: 'curCityInfoSlice',
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
export const { updCurCityInfo } = curCityInfoSlice.actions

export default curCityInfoSlice.reducer

