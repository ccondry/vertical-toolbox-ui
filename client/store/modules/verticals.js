import * as types from '../mutation-types'
// import {post} from '../../utils'
// import Vue from 'vue'

const state = {
  verticals: []
}

const getters = {
  verticals: state => state.verticals
}

const mutations = {
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  }
}

const actions = {
  async uploadImage ({dispatch, commit, getters}, {data, showNotification = true}) {
    dispatch('setWorking', {group: 'images', type: data.node, value: true})
    console.log(`uploading file`, data)
    dispatch('postData', {
      endpoint: getters.endpoints.images,
      data
    }).then(response => {
      console.log('upload file successful. path = ', response.data)
      // callback to the emitter
      data.callback(response.data)
    }).finally(() => {
      dispatch('setWorking', {group: 'images', type: data.node, value: false})
    })
  },
  async saveVertical ({getters, commit, dispatch}, {id, data, showNotification}) {
    dispatch('setWorking', {group: 'app', type: 'verticals', value: true})
    delete data._id
    dispatch('putData', {
      name: 'vertical',
      endpoint: getters.endpoints.verticals + '/' + id,
      data,
      showNotification,
      success: 'Successfully saved vertical',
      fail: 'Failed to save vertical'
    }).finally(() => {
      dispatch('setWorking', {group: 'app', type: 'verticals', value: false})
    })
  },
  async deleteVertical ({getters, commit, dispatch}, {id, showNotification}) {
    dispatch('setWorking', {group: 'app', type: 'verticals', value: true})
    dispatch('deleteData', {
      name: 'vertical',
      endpoint: getters.endpoints.verticals + '/' + id,
      showNotification,
      success: 'Successfully deleted vertical ' + id
      fail: 'Failed to delete vertical ' + id
    }).finally(() => {
      dispatch('setWorking', {group: 'app', type: 'verticals', value: false})
    })
  },
  loadVerticals ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'app', type: 'verticals', value: true})
    dispatch('loadToState', {
      name: 'verticals',
      endpoint: getters.endpoints.verticals,
      mutation: types.SET_VERTICALS,
      showNotification
    }).finally(() => {
      dispatch('setLoading', {group: 'app', type: 'verticals', value: false})
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
