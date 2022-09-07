import { configureStore } from '@reduxjs/toolkit'
import curCityInfo from './slices/curCityInfoSlice'

export const store = configureStore({
	reducer: {
		curCityInfo,
	},
})
