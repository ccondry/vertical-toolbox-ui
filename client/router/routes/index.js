import home from 'client/views/main/home.vue'
import ivr from 'client/views/main/ivr.vue'
import brandedWebsite from 'client/views/main/brands.vue'
import mobileWebsite from 'client/views/main/mobile.vue'
import ai from 'client/views/main/ai.vue'
import connect from 'client/views/main/connect.vue'
import usage from 'client/views/admin/usage.vue'
import cumulus from 'client/views/admin/cumulus.vue'

const routes = [{
  // catch-all to redirect to home view if no route matched
  path: '*',
  redirect: '/branding/home'
}, {
  name: 'Main',
  path: '/branding/home',
  component: home
}, {
  name: 'IVR Prompts',
  path: '/branding/ivr',
  component: ivr
}, {
  name: 'Branded Website',
  path: '/branding/brand',
  component: brandedWebsite
}, {
  name: 'Mobile App',
  path: '/branding/mobile',
  component: mobileWebsite
}, {
  name: 'AI',
  path: '/branding/ai',
  component: ai
}, {
  name: 'Connect',
  path: '/branding/connect',
  component: connect
}, {
  name: 'Usage',
  path: '/branding/admin/usage',
  component: usage
}, {
  name: 'Cumulus Website',
  path: '/branding/admin/cumulus',
  component: cumulus
}]

export default routes
