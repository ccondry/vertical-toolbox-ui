import { load } from '../../utils'
import * as types from '../mutation-types'
import config from '../../config'

const getters = {
  vpnAddress: state => state.vpnAddress,
  tftp1: state => state.tftp1,
  domain: state => state.upnDomain[state.instance]
}

const state = {
  instance: 'pcce',
  upnDomain: {
    pcce: config.lab.upnDomain
  },
  shortDomain: config.lab.shortDomain,
  vpnAddress: config.lab.vpnAddress,
  tftp1: '198.18.133.3',
  // returnPage: 'home',
  apiBase: config.app.apiBase[process.env.NODE_ENV],
  sessionId: '',
  datacenter: '',
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
  }
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
  }
}

const actions = {
  async getSession ({getters, commit, dispatch}, showNotification = true) {
    try {
      const response = await load(getters, 'session')
      console.log('load DIDs:', response)
      commit(types.SET_SESSION, response.data)
      if (showNotification) {
        dispatch('successNotification', 'Successfully loaded dCloud session info')
      }
    } catch (e) {
      console.log('error loading defaults', e)
      dispatch('errorNotification', {title: 'Failed to load dCloud session info', error: e})
    }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
