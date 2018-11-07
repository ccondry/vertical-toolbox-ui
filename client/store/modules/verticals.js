import * as types from '../mutation-types'

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
  async saveVertical ({getters, commit, dispatch}, data) {
    console.log('saving vertical (not implemented) - data:', data)
    // try {
    //   const response = await post(getters, 'branding/templates', null, data)
    //   console.log('saved branding template:', response)
    //   commit(types.SET_VERTICALS, response.data)
    //   dispatch('successNotification', 'Successfully saved branding template')
    // } catch (e) {
    //   console.log('error saving branding template', e)
    //   // console.log(e)
    //   // dispatch('errorNotification', {title: 'Failed to save branding template', error: e.response.data})
    //   console.log(e.response)
    //   dispatch('notification', {
    //     title: 'Failed to save branding template',
    //     message: e.response.data.message,
    //     type: 'danger'
    //   })
    // }
  },
  async loadVerticals ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'app', type: 'verticals', value: true})
    try {
      await dispatch('loadToState', {
        name: 'verticals',
        endpoint: getters.endpoints.verticals,
        mutation: types.SET_VERTICALS,
        showNotification
      })
    } catch (e) {
      console.log('error loading verticals', e)
      dispatch('errorNotification', {title: 'Failed to load verticals', error: e})
    } finally {
      dispatch('setLoading', {group: 'app', type: 'verticals', value: false})
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
