import lazyLoading from './lazyLoading'

export default {
  name: 'Admin',
  // path: '/admin',
  meta: {
    icon: 'folder',
    iconExpanded: 'folder-open',
    expanded: false
  },
  children: [
    {
      name: 'Usage',
      path: '/branding/admin/usage',
      component: lazyLoading('admin/usage'),
      meta: {
        icon: 'finance'
      }
    },
    {
      name: 'Cumulus Website',
      path: '/branding/cumulus',
      meta: {
        icon: 'cloud',
        description: 'Cumulus website customization'
      },
      component: lazyLoading('main/cumulus')
    }
  ]
}
