import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const swiperApi = createApi({
	reducerPath: 'swiperApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
	endpoints(build) {
		return {
			getHomeSwiper: build.query({
				query() {
					return '/home/swiper'
				}
			})
		}
	},
})
export const { useGetHomeSwiperQuery } = swiperApi

export default swiperApi
