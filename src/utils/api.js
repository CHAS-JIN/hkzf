import axios from 'axios'
import { BASE_URL, TOKEN } from './constant'

export const API = axios.create({
	baseURL: BASE_URL,
})

// 添加响应拦截器
API.interceptors.response.use(async response => {
	const { status } = response.data
	if (status === 400) {
		const token = localStorage.getItem(TOKEN)

		await API.post('/user/logout', {}, { headers: { authorization: token } })

		localStorage.removeItem(TOKEN)
		localStorage.removeItem('user')
	}
	return response
})
