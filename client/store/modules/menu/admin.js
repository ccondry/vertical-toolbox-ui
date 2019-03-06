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
    }
  ]
}
