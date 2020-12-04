const mutations = {
  CHANGEUSERINFO(state, data) {
    state.userInfo = data
  },
  CHANGESERCHTYPE(state, data) {
    state.searchType = data
  },
  CAHNGELOGINSHOW(state, data) {
    state.loginShow = data
  },
  CHANGEFROMURL(state, data) {
    state.fromUrl = data
  },
}

export default mutations
