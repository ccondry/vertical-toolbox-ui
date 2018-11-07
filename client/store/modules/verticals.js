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
  async saveVertical ({getters, commit, dispatch}, {id, data, showNotification}) {
    console.log('saving vertical (not implemented) - params:', {id, data})
    delete data._id
    try {
      const response = await dispatch('putData', {
        name: 'vertical',
        endpoint: getters.endpoints.verticals + '/' + id,
        data,
        showNotification
      })

      console.log('saved vertical. response:', response)
      dispatch('successNotification', 'Successfully saved vertical')
    } catch (e) {
      console.log('error saving vertical', e)
      dispatch('notification', {
        title: 'Failed to save vertical',
        message: e.response.data.message,
        type: 'danger'
      })
    }
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
