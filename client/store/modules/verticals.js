import * as types from '../mutation-types'

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
      dispatch('setLoading', {group: 'app', type: 'verticals', value: true})
    }
  },
  async uploadImage ({dispatch, commit, getters}, {data, showNotification = true}) {
    dispatch('setWorking', {group: 'images', type: data.node, value: true})
    console.log(`uploading file`, data)
    const response = await dispatch('postData', {
      endpoint: getters.endpoints.images,
      data
    })
    console.log('upload file successful. path = ', response.data)
    // callback to the emitter
    data.callback(response.data)
    // stop working indicator
    dispatch('setWorking', {group: 'images', type: data.node, value: false})
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
