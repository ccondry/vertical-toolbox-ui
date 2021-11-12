import * as types from '../mutation-types'
import { ToastProgrammatic as Toast } from 'buefy'

const state = {
  verticals: [],
  selectedVerticalId: '',
  vertical: {}
}

const getters = {
  verticals: state => state.verticals,
  selectedVerticalId: state => state.selectedVerticalId,
  vertical: state => state.vertical
}

const mutations = {
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  },
  [types.SET_SELECTED_VERTICAL] (state, data) {
    state.selectedVerticalId = data
  },
  [types.SET_VERTICAL] (state, data) {
    state.vertical = data
  }
}

const actions = {
  setSelectedVertical ({commit, dispatch}, data) {
    console.log('setSelectedVertical action', data)
    commit(types.SET_SELECTED_VERTICAL, data)
    // if selected vertical was set to a value...
    if (data) {
      // set loading now, because setting the vertical will trigger loading
      // dispatch('setLoading', {group: 'app', type: 'verticals', value: true})
    }
  },
  async uploadImage ({dispatch, commit, getters}, {data, showNotification = true}) {
    dispatch('setWorking', {group: 'images', type: data.node, value: true})
    console.log(`uploading file`, data)
    try {
      const response = await dispatch('postData', {
        endpoint: getters.endpoints.images,
        data
      })
      console.log('upload file successful. path = ', response.data.url)
      if (showNotification) {
        Toast.open({
          message: 'Successfully uploaded file.',
          type: 'is-success'
        })
      }
      // run emitter callback
      if (typeof data.callback === 'function') {
        data.callback(response.data)
      }
    } catch (e) {
      console.log(e)
      Toast.open({
        message: 'Failed to upload file: ' + e.message,
        type: 'is-success'
      })
    } finally {
      // stop working indicator
      dispatch('setWorking', {group: 'images', type: data.node, value: false})
    }
  },
  async createVertical ({getters, dispatch}, {data, showNotification}) {
    dispatch('setWorking', {group: 'app', type: 'verticals', value: true})
    const response = await dispatch('postData', {
      name: 'vertical',
      endpoint: getters.endpoints.verticals,
      data,
      showNotification,
      success: 'Successfully created vertical',
      fail: 'Failed to create vertical'
    })
    console.log('successfully created vertical:', response)
    dispatch('setWorking', {group: 'app', type: 'verticals', value: false})
    // make sure the the new vertical is the selected one
    dispatch('setSelectedVertical', response.data.id)
    // load the selected vertical - so that after Save As, the vertical ID
    // will be correctly displayed
    // load new data for this vertical from the server
    dispatch('loadVertical')

    return response
  },
  async saveVertical ({getters, commit, dispatch}, {id, data, showNotification}) {
    dispatch('setWorking', {group: 'app', type: 'verticals', value: true})
    delete data._id
    const response = await dispatch('putData', {
      name: 'vertical',
      endpoint: getters.endpoints.verticals + '/' + id,
      data,
      showNotification,
      success: 'Successfully saved vertical',
      fail: 'Failed to save vertical'
    })
    dispatch('setWorking', {group: 'app', type: 'verticals', value: false})
    return response
  },
  async deleteVertical ({getters, commit, dispatch}, {id, showNotification}) {
    dispatch('setWorking', {group: 'app', type: 'verticals', value: true})
    const response = await dispatch('deleteData', {
      name: 'vertical',
      endpoint: getters.endpoints.verticals + '/' + id,
      showNotification,
      success: 'Successfully deleted vertical ' + id,
      fail: 'Failed to delete vertical ' + id
    })
    dispatch('setWorking', {group: 'app', type: 'verticals', value: false})
    return response
  },
  async loadVerticals ({getters, commit, dispatch}, showNotification = true) {
    console.log('starting loadVerticals')
    dispatch('setLoading', {group: 'app', type: 'verticals', value: true})
    const response = await dispatch('loadToState', {
      name: 'verticals',
      endpoint: getters.endpoints.verticals,
      query: {all: true, summary: true},
      mutation: types.SET_VERTICALS,
      success: 'Successfully loaded verticals list',
      fail: 'Failed to load verticals list',
      showNotification
    })
    dispatch('setLoading', {group: 'app', type: 'verticals', value: false})
    return response
  },
  async loadVertical ({getters, commit, dispatch}, showNotification = true) {
    console.log('starting loadVertical')
    dispatch('setLoading', {group: 'app', type: 'verticals', value: true})
    const response = await dispatch('loadToState', {
      name: 'vertical',
      endpoint: getters.endpoints.verticals + '/' + getters.selectedVerticalId,
      mutation: types.SET_VERTICAL,
      success: 'Successfully loaded vertical ' + getters.selectedVerticalId,
      fail: 'Failed to load vertical ' + getters.selectedVerticalId,
      showNotification
    })
    if (!response) {
      // probably a 404 - set vertical ID to null so user can try again
      dispatch('setSelectedVertical', null)
    }
    // console.log('loadVertical response:', response)
    dispatch('setLoading', {group: 'app', type: 'verticals', value: false})
    return response
  },
  setVertical ({commit}, data) {
    console.log('setVertical')
    // update vertical data in state
    commit(types.SET_VERTICAL, data)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
