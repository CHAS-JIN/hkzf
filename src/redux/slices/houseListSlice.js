import { createSlice } from '@reduxjs/toolkit'

const houseList = createSlice({
	name: 'houseList',
	initialState: {},
	reducers: {
		updHouseInfo: (state, action) => {
			state.value = action.payload
		},
	},
})
export const { updHouseInfo } = houseList.actions
export default houseList.reducer
