import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const latestApi = createApi({
	reducerPath: 'latestApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
	endpoints(build) {
		return {
			getLatestMsg: build.query({
				query() {
					return '/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
				},
			}),
		}
	},
})
export const { useGetLatestMsgQuery } = latestApi

export default latestApi
