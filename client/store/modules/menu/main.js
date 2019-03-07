import lazyLoading from './lazyLoading'

export default {
  name: 'Main',
  // path: '/demos',
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
      name: 'Brands',
      path: '/branding/brand',
      meta: {
        icon: 'copyright',
        description: 'brand customization'
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
      name: 'Verticals',
      path: '/branding/verticals',
      meta: {
        icon: 'copyright',
        description: 'cumulus vertical configuration',
        created: '2018-11-07',
        modified: '2018-11-07'
      },
      component: lazyLoading('main/verticals')
    }
  ]
}
