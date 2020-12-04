 import {
 	Toast
 } from 'vant'
 import store from '@/store/index.js';
 import axios from 'axios'
 const service = axios.create({
 	timeout: 1500000
 })

 service.interceptors.request.use(config => {
 	Toast.loading({
 		loadingType: 'spinner',
 		message: '加载中'
 	})
 	const token = localStorage.getItem('token')
 	if (token) {
 		config.headers['authorization'] = token
 	}
 	config.url = `${process.env.NODE_ENV === "development" ? '/url' : 'https://www.zixinhui.com'}/api${config.url}`
 	// config.url = `${process.env.NODE_ENV === "development" ? '/url' : 'https://www.maxiangdong.com'}/api${config.url}`
 	config.method === 'post' ? JSON.stringify(config.data) : config.params
 	config.headers['Content-Type'] = 'application/json'
 	config.headers['X-Requested-With'] = 'XMLHttpRequest'
 	return config
 }, error => {
 	Toast.fail(error)
 	Promise.reject(error)
 })

 service.interceptors.response.use(
 	response => {
 		Toast.clear();
 		if (response.status === 200) {
 			if (response.data.code === 200) {
 				return response.data
 			} else if (response.data.code === -100) {
 				store.commit('CHANGEUSERINFO', null)
 				localStorage.setItem('token', '')
 				store.commit('CAHNGELOGINSHOW', true)
 			} else {
 				Toast.fail(response.data.msg)
 			}
 		}
 	},

 	error => {
 		if (error.response && error.response.data.code === -100) {
 			store.commit('CHANGEUSERINFO', null)
 			localStorage.setItem('token', '')
 			Toast.fail('请先登录')
 			store.commit('CHANGELOGINSHOW', true)
 		} else {
 			Toast.fail('网络错误，请您重试')
 			return Promise.reject(error)
 		}
 	}
 )

 export default service;