import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rentGroupsApi = createApi({
	reducerPath: 'rentGroupsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
	endpoints(build) {
		return {
			getRentGroups: build.query({
				query() {
					return '/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
				},
			}),
		}
	},
})
export const { useGetRentGroupsQuery } = rentGroupsApi

export default rentGroupsApi
