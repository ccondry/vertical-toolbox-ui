import VueRouter from 'vue-router'
import store from 'client/store'
import routes from './routes'

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  scrollBehavior: (to, from, savedPosition) => {
    // same page name?
    if (to.name === from.name) {
      // don't scroll when navigating same page (for example setting query only)
      return
    } else if (savedPosition) {
      // is the browser going back/forward? use the saved scroll position
      return savedPosition
    } else {
      // scroll to top-left when navigating to different page
      return { x: 0, y: 0 }
    }
  },
  routes
})

// authorize users
router.beforeEach(async (to, from, next) => {
  // admins can view all
  if (store.getters.user && store.getters.user.admin) {
    return next()
  }
  // if the route has a required group and the user is not in that group
  if (
    to.meta &&
    Array.isArray(to.meta.groups) && 
    !to.meta.groups.some(v => {
      try {
        return store.getters.user &&
          Array.isArray(store.getters.user.groups) &&
          store.getters.user.groups.includes(v)
      } catch (e) {
        return false
      }
    })
  ) {
    // console.log('user groups', store.getters.user.groups, 'does not include', to.meta.groups, '- redirecting home')
    // redirect to home page
    return next({name: 'Home'})
  }
  // otherwise continue
  return next()
})

// copy query parameters on navigation, if they are present
router.beforeEach((to, from, next) => {
  if (!hasQueryParams(to) && hasQueryParams(from)) {
    next({name: to.name, query: from.query})
  } else {
    next()
  }
})

function hasQueryParams (route) {
  return !!Object.keys(route.query).length
}

export default router
