import lazyLoading from './lazyLoading'
import config from '../../../../config'
const publicPath = config.dev.assetsPublicPath

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
      path: publicPath + '/main/home',
      meta: {
        icon: 'home',
        description: 'Home',
        created: '2018-10-29',
        modified: '2018-10-29'
      },
      component: lazyLoading('main/Home')
    },
    {
      name: 'Verticals',
      path: publicPath + '/main/verticals',
      meta: {
        icon: 'copyright',
        description: 'Custom branded demo website configuration',
        created: '2018-10-29',
        modified: '2018-10-29'
      },
      component: lazyLoading('main/verticals')
    }
  ]
}
