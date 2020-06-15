// default to production url prefixes
let urlPrefix = '/api/v1/verticals/'
let authUrlPrefix = '/api/v1/auth/'

// if development, use localhost url prefixes
if (process.env.NODE_ENV === 'development') {
  urlPrefix = 'http://localhost:3032/api/v1/auth/'
  authUrlPrefix = 'http://localhost:3033/api/v1/verticals/'
}

const state = {
  endpoints: {
    login: authUrlPrefix + 'login',
    logout: authUrlPrefix + 'logout',
    authApiVersion: authUrlPrefix + 'version',
    verticals: urlPrefix + 'verticals',
    endpoints: urlPrefix + 'endpoints',
    images: urlPrefix + 'images',
    usage: urlPrefix + 'usage',
    version: urlPrefix + 'version'
  }
}

const getters = {
  endpoints: state => state.endpoints
}

export default {
  state,
  getters
}
