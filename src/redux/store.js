import { configureStore } from '@reduxjs/toolkit'
import curCityInfo from './slices/curCityInfoSlice'
import houseInfo from './slices/houseListSlice'

export const store = configureStore({
	reducer: {
		curCityInfo,
		houseInfo,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})
