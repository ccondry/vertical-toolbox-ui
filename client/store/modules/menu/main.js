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
        description: 'IVR prompt customization'
      },
      component: lazyLoading('main/ivr')
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
      name: 'Branded Website',
      path: '/branding/brand',
      meta: {
        icon: 'copyright',
        description: 'Branded website customization'
      },
      component: lazyLoading('main/brands')
    },
    {
      name: 'Mobile App',
      path: '/branding/mobile',
      meta: {
        icon: 'cellphone',
        description: 'Mobile app customization'
      },
      component: lazyLoading('main/mobile')
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
