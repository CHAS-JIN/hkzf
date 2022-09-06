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
		}
	},
})
export const { useGetCurCityInfoQuery } = cityInfoApi

export default cityInfoApi
