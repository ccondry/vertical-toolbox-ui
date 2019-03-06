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
  async saveBrand ({getters, commit, dispatch}, {id, data, showNotification}) {
    // remove database ID, if any
    delete data._id
    try {
      const response = await dispatch('putData', {
        name: 'brand',
        endpoint: getters.endpoints.brands + '/' + id,
        data,
        showNotification
      })

      console.log('saved brand. response:', response)
      dispatch('successNotification', 'Successfully saved brand')
    } catch (e) {
      console.log('error saving brand', e)
      dispatch('notification', {
        title: 'Failed to save brand',
        message: e.response.data.message,
        type: 'danger'
      })
    }
  },
  async deleteBrand ({getters, commit, dispatch}, {id, showNotification}) {
    try {
      const response = await dispatch('deleteData', {
        name: 'brand',
        endpoint: getters.endpoints.brands + '/' + id,
        showNotification
      })

      console.log('deleted brand. response:', response)
      dispatch('successNotification', 'Successfully deleted brand')
    } catch (e) {
      console.log('error deleting brand', e)
      dispatch('notification', {
        title: 'Failed to delete brand',
        message: e.response.data.message,
        type: 'danger'
      })
    }
  },
  async loadBrands ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'app', type: 'brands', value: true})
    try {
      await dispatch('loadToState', {
        name: 'brands',
        endpoint: getters.endpoints.brands,
        mutation: types.SET_BRANDS,
        showNotification
      })
    } catch (e) {
      console.log('error loading brands', e)
      dispatch('errorNotification', {title: 'Failed to load brands', error: e})
    } finally {
      dispatch('setLoading', {group: 'app', type: 'brands', value: false})
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
