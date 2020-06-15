import * as types from '../mutation-types'
import {load} from '../../utils'

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  query: null
}

const getters = {
  query: state => state.query
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, config) {
    if (state.device.isMobile && config.hasOwnProperty('opened')) {
      state.sidebar.opened = config.opened
    } else {
      state.sidebar.opened = true
    }

    if (config.hasOwnProperty('hidden')) {
      state.sidebar.hidden = config.hidden
    }
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  },

  [types.SET_SESSION] (state, data) {
    state.sessionId = data.sessionId
    state.datacenter = data.datacenter
  },

  [types.SET_QUERY_PARAMETERS] (state, data) {
    console.log('SET_QUERY_PARAMETERS - set query to', data)
    state.query = data
  }
}

const actions = {
  setQuery ({commit}, data) {
    commit(types.SET_QUERY_PARAMETERS, data)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
