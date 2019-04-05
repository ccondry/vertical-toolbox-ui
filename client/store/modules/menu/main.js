import lazyLoading from './lazyLoading'

export default {
  name: 'Main',
  meta: {
    icon: 'folder',
    iconExpanded: 'folder-open',
    created: '2018-10-29',
    modified: '2018-10-29',
    expanded: true
  },
  children: [
    {
      name: 'Home',
      path: '/branding/home',
      meta: {
        icon: 'home',
        description: 'Home'
      },
      component: lazyLoading('main/home')
    },
    {
      name: 'IVR Prompts',
      path: '/branding/ivr',
      meta: {
        icon: 'phone',
        label: 'IVR',
        description: 'IVR customization'
      },
      component: lazyLoading('main/ivr')
    },
    {
      name: 'Branded Website',
      path: '/branding/brand',
      meta: {
        icon: 'copyright',
        description: 'Branded website customization'
      },
      component: lazyLoading('main/brands')
    },
    {
      name: 'Cumulus Website',
      path: '/branding/cumulus',
      meta: {
        icon: 'cloud',
        description: 'Cumulus website customization'
      },
      component: lazyLoading('main/cumulus')
    },
    {
      name: 'Mobile App',
      path: '/branding/mobile',
      meta: {
        icon: 'cellphone',
        description: 'Mobile app customization'
      },
      component: lazyLoading('main/mobile')
    },
    {
      name: 'AI',
      path: '/branding/ai',
      meta: {
        icon: 'robot',
        label: 'AI/Bot',
        description: 'AI Bot customization'
      },
      component: lazyLoading('main/ai')
    }
    // {
    //   name: 'Verticals',
    //   path: '/branding/verticals',
    //   meta: {
    //     icon: 'copyright',
    //     description: 'cumulus vertical configuration',
    //     created: '2018-11-07',
    //     modified: '2018-11-07'
    //   },
    //   component: lazyLoading('main/verticals')
    // }
  ]
}
