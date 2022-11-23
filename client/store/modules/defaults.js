import defaultVertical from './default-vertical.json'

const state = {
  defaults: {
    verticals: defaultVertical
  }
}

const getters = {
  defaults: state => state.defaults
}

const mutations = {
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
