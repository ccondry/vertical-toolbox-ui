const state = {
  items: [
    {
      name: 'Home',
      path: '/branding/home',
      meta: {
        icon: 'home',
        description: 'Home'
      }
    },
    {
      name: 'IVR Prompts',
      path: '/branding/ivr',
      meta: {
        icon: 'phone',
        label: 'IVR Prompts',
        description: 'IVR prompts customization'
      }
    },
    {
      name: 'Surveys',
      path: '/branding/surveys',
      meta: {
        icon: 'comment-question',
        label: 'Surveys',
        description: 'Surveys customization',
        // groups: ['admin', 'QA']
      }
    },
    {
      name: 'Branded Website',
      path: '/branding/brand',
      meta: {
        icon: 'copyright',
        description: 'Branded website customization'
      }
    },
    {
      name: 'Mobile App',
      path: '/branding/mobile',
      meta: {
        icon: 'cellphone',
        description: 'Mobile app customization'
      }
    },
    {
      name: 'AI',
      path: '/branding/ai',
      meta: {
        icon: 'robot',
        label: 'Chat/AI/Bot',
        description: 'Chat and AI/Bot customization'
      }
    },
    {
      name: 'Webex Contact Center',
      path: '/branding/wxcc',
      meta: {
        icon: 'headphones',
        description: 'Webex Contact Center customization',
        // groups: ['admin', 'QA']
      }
    },
    {
      name: 'Webex Connect',
      path: '/branding/connect',
      meta: {
        icon: 'whatsapp',
        description: 'Webex Connect customization',
        // groups: ['admin', 'QA']
      }
    },
    {
      name: 'Usage',
      path: '/branding/admin/usage',
      meta: {
        icon: 'finance',
        groups: ['admin']
      }
    },
    {
      name: 'Cumulus Website',
      path: '/branding/admin/cumulus',
      meta: {
        icon: 'cloud',
        description: 'Cumulus website customization',
        groups: ['admin']
      }
    }
  ]
}

const getters = {
  menu: state => state.items
}

export default {
  getters,
  state
}
