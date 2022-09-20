import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'authSlice',
	initialState: () => {
		return {
			isLoging: false,
		}
	},
	reducers: {
		login: state => {
			state.isLoging = true
		},
	},
})
export const { login } = authSlice.actions
export default authSlice.reducer
