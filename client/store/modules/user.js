import * as types from '../mutation-types'

const state = {
  user: {}
}

const getters = {
  user: state => state.user,
  isAdmin: state => state.user.admin,
  isQa: state => {
    try {
      return state.user.groups.includes('QA')
    } catch (e) {
      return false
    }
  }
}

const mutations = {
  [types.SET_USER] (state, data) {
    state.user = data
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
