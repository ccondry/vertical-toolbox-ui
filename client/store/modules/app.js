import Vue from 'vue'
import * as types from '../mutation-types'
import pkg from '../../../package.json'

const state = {
  pkg,
  working: {
    app: {},
    images: {},
    cvp: {},
    admin: {},
    facebook: {},
    finesse: {},
    templates: {}
  },
  loading: {
    app: {},
    images: {},
    cvp: {},
    admin: {},
    facebook: {},
    finesse: {},
    templates: {}
  },
  defaultChatEntryPointId: '1005',
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
  apiVersion: 'Loading...',
  authApiVersion: 'Loading...'
}

const getters = {
  pkg: state => state.pkg,
  app: state => state.app,
  device: state => state.device,
  sidebar: state => state.sidebar,
  effect: state => state.effect,
  instance: (state) => state.instance,
  authEnabled: () => true,
  loading: state => state.loading,
  working: state => state.working,
  production: () => process.env.NODE_ENV === 'production',
  uiVersion: () => pkg.version,
  apiVersion: state => state.apiVersion,
  authApiVersion: state => state.authApiVersion
}

const mutations = {
  [types.SET_WORKING] (state, data) {
    // if state container for this group is not existing, create it
    if (!state.working[data.group]) {
      Vue.set(state.working, data.group, {})
    }

    // if state container for this type is not existing, create it
    if (!state.working[data.group][data.type]) {
      Vue.set(state.working[data.group], data.type, data.value)
    } else {
      state.working[data.group][data.type] = data.value
    }
  },

  [types.SET_LOADING] (state, data) {
    // if state container for this group is not existing, create it
    if (!state.loading[data.group]) {
      Vue.set(state.loading, data.group, {})
    }

    // if state container for this type is not existing, create it
    if (!state.loading[data.group][data.type]) {
      Vue.set(state.loading[data.group], data.type, data.value)
    } else {
      state.loading[data.group][data.type] = data.value
    }
  },

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

  [types.SET_API_VERSION] (state, data) {
    state.apiVersion = data.version
  },

  [types.SET_AUTH_API_VERSION] (state, data) {
    state.authApiVersion = data.version
  }
}

const actions = {
  expandMenu ({ commit }, data) {
    if (data) {
      data.expanded = data.expanded || false
      commit(types.EXPAND_MENU, data)
    }
  },

  setWorking ({commit}, {group, type, value = true}) {
    commit(types.SET_WORKING, {group, type, value})
  },
  
  setLoading ({commit}, {group, type, value = true}) {
    commit(types.SET_LOADING, {group, type, value})
  },
  
  getApiVersion ({getters, dispatch}) {
    return dispatch('fetch', {
      group: 'app',
      type: 'apiVersion',
      message: 'get API server version',
      url: getters.endpoints.version,
      mutation: types.SET_API_VERSION,
      showNotification: false
    })
  },
  getAuthApiVersion ({getters, dispatch}) {
    return dispatch('fetch', {
      group: 'app',
      type: 'authApiVersion',
      message: 'get auth API server version',
      url: getters.endpoints.authApiVersion,
      mutation: types.SET_AUTH_API_VERSION,
      showNotification: false
    })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
