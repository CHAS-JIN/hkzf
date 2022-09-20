import { configureStore } from '@reduxjs/toolkit'
import curCityInfo from './slices/curCityInfoSlice'
import houseInfo from './slices/houseListSlice'
import auth from './slices/authSlice'

export const store = configureStore({
	reducer: {
		curCityInfo,
		houseInfo,
		auth,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})
