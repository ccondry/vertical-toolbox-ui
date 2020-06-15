import * as types from '../mutation-types'
import {version} from '../../../package'

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
  query: null,
  apiVersion: 'Loading...',
  authApiVersion: 'Loading...'
}

const getters = {
  query: state => state.query,
  uiVersion: () => version,
  apiVersion: state => state.apiVersion,
  authApiVersion: state => state.authApiVersion
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
  },

  [types.SET_API_VERSION] (state, data) {
    state.apiVersion = data.version
  },

  [types.SET_AUTH_API_VERSION] (state, data) {
    state.authApiVersion = data.version
  }
}

const actions = {
  async getApiVersion ({getters, dispatch}) {
    dispatch('setLoading', {group: 'app', type: 'apiVersion', value: true})
    console.log('get API server info...')
    try {
      const endpoint = getters.endpoints.version
      console.log('getting API server info endpoint', endpoint, '...')
      const response = await dispatch('loadToState', {
        name: 'get API server version',
        endpoint,
        mutation: types.SET_API_VERSION,
        showNotification: false
      })
      console.log('get API server info - response:', response)
    } catch (e) {
      console.log('error loading API server info', e)
      // dispatch('errorNotification', {title: 'Failed to load API server info', error: e})
    } finally {
      dispatch('setLoading', {group: 'app', type: 'apiVersion', value: false})
    }
  },
  async getAuthApiVersion ({getters, dispatch}) {
    dispatch('setLoading', {group: 'app', type: 'authApiVersion', value: true})
    const operation = 'auth API server version'
    console.log('getting', operation, '...')
    try {
      const endpoint = getters.endpoints.authApiVersion
      console.log('getting', operation, 'endpoint', endpoint, '...')
      const response = await dispatch('loadToState', {
        name: 'get' + operation,
        endpoint,
        mutation: types.SET_AUTH_API_VERSION,
        showNotification: false
      })
      console.log('get', operation, '- response:', response)
    } catch (e) {
      console.log('error getting', operation, e)
      // dispatch('errorNotification', {title: 'Failed to get ' + operation, error: e})
    } finally {
      dispatch('setLoading', {group: 'app', type: 'authApiVersion', value: false})
    }
  },
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
