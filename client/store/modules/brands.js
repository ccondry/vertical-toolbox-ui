import * as types from '../mutation-types'
// import {post} from '../../utils'
// import Vue from 'vue'

const state = {
  brands: []
}

const getters = {
  brands: state => state.brands
}

const mutations = {
  [types.SET_BRANDS] (state, data) {
    state.brands = data
  }
}

const actions = {
  saveBrand ({getters, commit, dispatch}, {id, data, showNotification = true}) {
    dispatch('setWorking', {group: 'app', type: 'brands', value: true})
    // remove database ID, if any
    delete data._id
    return dispatch('putData', {
      name: 'brand',
      endpoint: getters.endpoints.brands + '/' + id,
      data,
      showNotification,
      success: 'Successfully saved brand ' + id,
      fail: 'Failed to save brand ' + id
    }).finally(() => {
      dispatch('setWorking', {group: 'app', type: 'brands', value: false})
    })
  },
  deleteBrand ({getters, commit, dispatch}, {id, showNotification = true}) {
    dispatch('setWorking', {group: 'app', type: 'brands', value: true})
    return dispatch('deleteData', {
      name: 'brand',
      endpoint: getters.endpoints.brands + '/' + id,
      showNotification,
      success: 'Successfully deleted brand ' + id,
      fail: 'Failed to delete brand ' + id
    }).finally(() => {
      dispatch('setWorking', {group: 'app', type: 'brands', value: false})
    })
  },
  loadBrands ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'app', type: 'brands', value: true})
    return dispatch('loadToState', {
      name: 'brands',
      endpoint: getters.endpoints.brands,
      mutation: types.SET_BRANDS,
      showNotification,
      success: 'Successfully loaded brands',
      fail: 'Failed to load brands'
    }).finally(() => {
      dispatch('setLoading', {group: 'app', type: 'brands', value: false})
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
