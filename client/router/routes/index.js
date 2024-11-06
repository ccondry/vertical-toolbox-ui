import home from 'client/views/main/home.vue'
import ivr from 'client/views/main/ivr.vue'
import brandedWebsite from 'client/views/main/brands.vue'
import mobileWebsite from 'client/views/main/mobile.vue'
import ai from 'client/views/main/ai.vue'
import connect from 'client/views/main/connect.vue'
import wxcc from 'client/views/main/wxcc.vue'
import surveys from 'client/views/main/surveys.vue'
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
  name: 'Webex Contact Center',
  path: '/branding/wxcc',
  component: wxcc,
  meta: {
    groups: ['admin', 'QA']
  }
}, {
  name: 'Webex Connect',
  path: '/branding/connect',
  component: connect,
  meta: {
    groups: ['admin', 'QA']
  }
}, {
  name: 'Surveys',
  path: '/branding/surveys',
  component: surveys,
  meta: {
    groups: ['admin', 'QA']
  }
}, {
  name: 'Usage',
  path: '/branding/admin/usage',
  component: usage,
  meta: {
    groups: ['admin']
  }
}, {
  name: 'Cumulus Website',
  path: '/branding/admin/cumulus',
  component: cumulus,
  meta: {
    groups: ['admin']
  }
}]

export default routes
