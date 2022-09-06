import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cityInfoApi = createApi({
	reducerPath: 'cityInfoApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
	endpoints(build) {
		return {
			getCurCityInfo: build.query({
				query(cityname) {
					return `/area/info?name=${cityname}`
				},
			}),
			getCityList: build.query({
				query() {
					return `/area/city?level=1`
				},
			}),
			getHotCityList: build.query({
				query() {
					return `/area/hot`
				},
			}),
		}
	},
})
export const {
	useGetCurCityInfoQuery,
	useGetCityListQuery,
	useGetHotCityListQuery,
} = cityInfoApi
export default cityInfoApi
