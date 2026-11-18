import * as types from '../mutation-types'
import { DialogProgrammatic as Dialog } from 'buefy'

function parseJwt (token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}

function isExpired (user) {
  return typeof user.exp === 'number' && user.exp <= new Date().getTime() / 1000
}

function forwardToLogin () {
  window.location = '/auth/login?destination=' + window.location
}

const state = {
  jwt: null,
  forwardTo: null
}

const getters = {
  jwt: state => state.jwt,
  isLoggedIn: state => state.jwt !== null,
  forwardTo: state => state.forwardTo
}

const mutations = {
  [types.SET_JWT] (state, data) {
    state.jwt = data
  },
  [types.FORWARD_TO] (state, data) {
    state.forwardTo = data
  }
}

const actions = {
  setForwardTo ({commit}, data) {
    commit(types.FORWARD_TO, data)
  },
  setJwt ({commit}, data) {
    commit(types.SET_JWT, data)
    // set authToken in localStorage also
    window.localStorage.setItem('jwt', data)
    // decode jwt and store as user data
    commit(types.SET_USER, parseJwt(data))
  },
  // development only - there is no SSO login page on the local dev server
  promptForJwt ({dispatch}, message = 'Enter your JWT') {
    Dialog.prompt({
      message,
      inputAttrs: {
        placeholder: 'JWT'
      },
      onConfirm: (value) => {
        // strip whitespace and the quotes the browser console shows around localStorage.jwt
        const jwt = value.trim().replace(/^['"]|['"]$/g, '')
        let user
        try {
          user = parseJwt(jwt)
        } catch (e) {
          dispatch('errorNotification', 'That is not a valid JWT')
          return
        }
        if (isExpired(user)) {
          dispatch('errorNotification', 'That JWT has expired. Get a new one and try again.')
          return
        }
        dispatch('setJwt', jwt)
      }
    })
  },
  unsetJwt ({commit}) {
    // unset JWT in state
    commit(types.SET_JWT, null)
    // remove JWT from localStorage
    window.localStorage.removeItem('jwt')
    // unset user in state
    commit(types.SET_USER, null)
  },
  async checkLogin ({dispatch, getters}) {
    console.log('checking localstorage for JWT login token')
    // retrieve auth token from localStorage
    const jwt = window.localStorage.getItem('jwt')
    // if we found a token, check the web service to see if it's still valid
    if (jwt !== null) {
      console.log('JWT login token found in localStorage')
      console.log('saving JWT in state')
      await dispatch('setJwt', jwt)
      if (isExpired(getters.user)) {
        console.log('JWT expired')
        dispatch('unsetJwt')
        if (process.env.NODE_ENV === 'production') {
          forwardToLogin()
        } else {
          dispatch('promptForJwt', 'Your JWT has expired. Paste a new one:')
        }
      }
    } else {
      console.log('JWT not found in localstorage.')
      // forward user to login page, if in production
      if (process.env.NODE_ENV === 'production') {
        forwardToLogin()
      }
      // const error = {
      //   error: 'JWT not found'
      // }
      // throw error
    }
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
