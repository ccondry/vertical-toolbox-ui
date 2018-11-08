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
      path: '/verticals',
      meta: {
        icon: 'home',
        description: 'Home',
        created: '2018-11-07',
        modified: '2018-11-07'
      },
      component: lazyLoading('main/Home')
    }
    // {
    //   name: 'Verticals',
    //   path: '/verticals/main/verticals',
    //   meta: {
    //     icon: 'copyright',
    //     description: 'Custom branded demo website configuration',
    //     created: '2018-10-29',
    //     modified: '2018-10-29'
    //   },
    //   component: lazyLoading('main/verticals')
    // }
  ]
}
