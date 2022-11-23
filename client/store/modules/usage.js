import * as types from '../mutation-types'

const state = {
  usage: []
}

const getters = {
  usage: state => state.usage
}

const mutations = {
  [types.SET_USAGE] (state, data) {
    state.usage = data
  }
}

const actions = {
  loadUsage ({getters, dispatch}, showNotification = true) {
    return dispatch('fetch', {
      group: 'app',
      type: 'usage',
      message: 'load usage statistics',
      url: getters.endpoints.usage,
      mutation: types.SET_USAGE,
      showNotification
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
