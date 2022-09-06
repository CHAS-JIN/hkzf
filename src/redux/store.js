import { configureStore } from '@reduxjs/toolkit'
import rentGroupsApi from './api/rentGroupsApi'
import swiperApi from './api/swiperApi'
import latestApi from './api/latestApi'
import cityInfoApi from './api/cityInfoApi'

import curCityInfo from './slices/curCityInfoSlice'

export const store = configureStore({
	reducer: {
		[swiperApi.reducerPath]: swiperApi.reducer,
		[rentGroupsApi.reducerPath]: rentGroupsApi.reducer,
		[latestApi.reducerPath]: latestApi.reducer,
		[cityInfoApi.reducerPath]: cityInfoApi.reducer,
		curCityInfo,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			swiperApi.middleware,
			rentGroupsApi.middleware,
			latestApi.middleware,
			cityInfoApi.middleware
		),
})
