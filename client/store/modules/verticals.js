import * as types from 'client/store/mutation-types'
import { DialogProgrammatic as Dialog } from 'buefy'
import router from 'client/router'
import Vue from 'vue'

const state = {
  verticals: [],
  selectedVerticalId: '',
  vertical: {}
}

const getters = {
  verticals: state => state.verticals,
  selectedVerticalId: state => state.selectedVerticalId,
  vertical: state => state.vertical,
  disableSave: (state, getters) => {
    // any template has been selected
    if (getters.vertical.owner === getters.user.username || getters.user.admin) {
      // this user owns this template or is an admin
      // save is not disabled
      return false
    } else {
      // saving is disabled
      return true
    }
  }
}

const mutations = {
  [types.SET_SELECTED_VERTICAL] (state, data) {
    state.selectedVerticalId = data
  },
  [types.SET_VERTICAL_DETAILS] (state, data) {
    state.vertical = data
  },
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  },
  [types.SET_VERTICAL] (state, data) {
    // find the matching vertical already in state
    const index = state.verticals.findIndex(v => v._id === data.id)
    if (index >= 0) {
      // found - replace in state
      state.verticals.splice(index, 1, data)
    } else {
      // not found - add to state
      state.verticals.push(data)
    }
  },
  [types.UNSET_VERTICAL] (state, id) {
    // find the matching vertical already in state
    const index = state.verticals.findIndex(v => v._id === id)
    if (index >= 0) {
      // found - remove from state
      state.verticals.splice(index, 1)
    }
  },
}

const actions = {
  setSelectedVerticalId ({commit}, id) {
    commit(types.SET_SELECTED_VERTICAL, id)
    // if current URL query param for vertical
    try {
      if (router.currentRoute.query.vertical !== id) {
        // update browser URL with vertical ID in query
        router.push({
          query: {
            vertical: id
          }
        })
      }
    } catch (e) {
      // continue
    }
  },
  async uploadImage ({dispatch, getters}, {data, showNotification = true}) {
    const response = await dispatch('fetch', {
      group: 'images',
      type: data.node,
      url: getters.endpoints.images,
      message: 'uploaded file',
      options: {
        method: 'POST',
        body: data
      },
      showNotification
    })
    // run emitter callback
    if (typeof data.callback === 'function') {
      data.callback(response)
    }
  },
  async createVertical ({getters, dispatch}, data) {
    const response = await dispatch('fetch', {
      group: 'app',
      type: 'verticals',
      message: 'create vertical',
      url: getters.endpoints.verticals,
      options: {
        method: 'POST',
        body: data
      },
      showNotification: true
    })
    // make sure the the new vertical is the selected one
    dispatch('setSelectedVerticalId', response.id)
    // load the selected vertical - so that after Save As, the vertical ID
    // will be correctly displayed
    // load new data for this vertical from the server
    await dispatch('loadVertical')
    // get user's new vertical into the list fo verticals 
    await dispatch('listVerticals', {})
    return response
  },
  async confirmSaveVertical ({dispatch, getters}) {
    // confirm first
    Dialog.confirm({
      title: `Save Vertical?`,
      message: `Are you sure you want to save your changes to vertical ${getters.vertical.name}?`,
      confirmText: 'Save',
      type: 'is-success',
      rounded: true,
      onConfirm: () => {
        dispatch('saveVertical')
      }
    })
  },
  async saveVertical ({dispatch, getters}) {
    const response = await dispatch('fetch', {
      group: 'app',
      type: 'verticals',
      message: 'save vertical',
      url: getters.endpoints.verticals + '/' + getters.vertical.id,
      options: {
        method: 'PUT',
        body: getters.vertical
      },
      showNotification: true
    })
    // make sure the saved vertical is the selected one
    // await dispatch('setSelectedVerticalId', response.id)
    // load the selected vertical - so that after Save As, the vertical ID
    // will be correctly displayed
    // load new data for this vertical from the server
    // await dispatch('loadVertical')
    return response
  },
  async confirmDeleteVertical ({dispatch, getters}) {
     Dialog.confirm({
      title: `Delete Vertical?`,
      message: `Are you sure you want to delete the vertical ${getters.vertical.name} (${getters.vertical.id})?`,
      confirmText: 'Confirm Delete',
      type: 'is-danger',
      rounded: true,
      onConfirm: () => {
        dispatch('deleteVertical')
      }
    })
  },
  async deleteVertical ({getters, commit, dispatch}) {
    const response = await dispatch('fetch', {
      group: 'app',
      type: 'verticals',
      message: 'delete vertical',
      url: getters.endpoints.verticals + '/' + getters.vertical.id,
      options: {
        method: 'DELETE'
      },
      showNotification: true
    })
    // remove that vertical from state verticals list
    commit(types.UNSET_VERTICAL, getters.vertical.id)
    // unset full vertical data from state
    commit(types.SET_VERTICAL_DETAILS, {})
    // set vertical ID to null so modal will pop for user to select another
    await dispatch('setSelectedVerticalId', null)
    // return delete request response
    return response
  },
  listVerticals ({getters, dispatch}, {owner, showNotification = false}) {
    const options = {}
    if (owner) {
      options.query = {
        owner
      }
    }
    return dispatch('fetch', {
      group: 'app',
      type: 'verticals',
      message: 'load verticals list',
      url: getters.endpoints.verticals,
      mutation: types.SET_VERTICALS,
      showNotification,
      options
    })
  },
  async loadVertical ({commit, getters, dispatch}, showNotification = false) {
    const response = await dispatch('fetch', {
      group: 'app',
      type: 'verticals',
      message: 'get vertical details',
      url: getters.endpoints.verticals + '/' + getters.selectedVerticalId,
      mutation: types.SET_VERTICAL_DETAILS,
      showNotification
    })
    if (response instanceof Error) {
      // failed
      if (response.status === 404) {
        // set vertical ID to null so user can try again
        dispatch('setSelectedVerticalId', null)
      }
    } else {
      // successful
      // get default vertical JSON
      const defaultVertical = getters.defaults.verticals
      // copy current vertical data
      const copy = JSON.parse(JSON.stringify(getters.vertical))
      // fix wxcc section in copy
      fixVerticalSection(copy, defaultVertical, 'wxcc')
      // fix webexconnect section in copy
      fixVerticalSection(copy, defaultVertical, 'webexconnect')
      // fix surveys section in copy
      fixVerticalSection(copy, defaultVertical, 'surveys')
      // fix webexconnect root in copy
      fixVerticalRoot(copy, defaultVertical)
      // update vertical in state with copy
      dispatch('setVertical', copy)
    }
  },
  setVertical ({commit}, data) {
    console.log('setVertical', data)
    // update vertical data in state
    commit(types.SET_VERTICAL_DETAILS, data)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

// copy any missing or invalid values in the 'to' object from 'from' object, 
// if they are string or boolean type and on the root of the objects
function fixVerticalRoot (to, from) {
  for (const key of Object.keys(from)) {
    if (
      (typeof from[key] === 'string' && typeof to[key] !== 'string') ||
      (typeof from[key] === 'boolean' && typeof to[key] !== 'boolean')
    ) {
      to[key] = from[key]
      continue
    }
  }
}

function fixVerticalSection (currentValue, defaultValue, section) {
  console.log(`fixing vertical section "${section}"`)
  if (
    // if current vertical does not have this section
    typeof currentValue[section] === 'undefined' ||
    // or if current vertical section is not an object
    typeof currentValue[section] !== 'object' ||
    // or current vertical section is null
    currentValue[section] === null
  ) {
    // set it to an object
    Vue.set(currentValue, section, {})
    // currentVaule[section] = {}
  }

  // fill any missing parts in current value
  fillObject(defaultValue[section], currentValue[section])
}

function fillObject (from, to) {
  // for each key in the default value section
  for (const key of Object.keys(from)) {
    // if default value is an array
    if (Array.isArray(from[key])) {
      // if copy value is not an array
      if (!Array.isArray(to[key])) {
        // set copy value to a clone of default value
        to[key] = JSON.parse(JSON.stringify(from[key]))
      }
      // continue to next key
      continue
    }
    
    if (
      // if default value is a string
      typeof from[key] === 'string' &&
      // and copy value is not a string
      typeof to[key] !== 'string'
    ) {
      // set the string value
      to[key] = from[key]
      // continue to next key
      continue
    }

    // if default value is an object
    if (typeof from[key] === 'object') {
      // if copy value is also not an object
      if (typeof to[key] !== 'object') {
        // set copy value to a clone of default value
        to[key] = JSON.parse(JSON.stringify(from[key]))
      } else {
        // copy value is also an object, so recurse into it
        fillObject(from[key], to[key])
      }
      // continue to next key
      continue
    }
  }
}