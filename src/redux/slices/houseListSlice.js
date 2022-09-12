import { createSlice } from '@reduxjs/toolkit'

const houseListSlice = createSlice({
	name: 'houseListSlice',
	initialState: {},
	reducers: {
		updHouseInfo: (state, action) => {
			state.value = action.payload
		},
	},
})
export const { updHouseInfo } = houseListSlice.actions
export default houseListSlice.reducer
