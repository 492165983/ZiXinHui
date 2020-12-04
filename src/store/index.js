import Vue from "vue"
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
export default new Vuex.Store({
	plugins: [createPersistedState({
		storage: window.sessionStorage,
		reducer(val) {
			return {
				// 只储存state中的assessmentData
				userInfo: val.userInfo,
			}
		}
	})],
	state,
	mutations,
	actions
})