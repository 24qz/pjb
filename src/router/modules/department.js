import Layout from '@/layout'

export default {
    path: '/department',
  component: Layout,
  name: 'department',
    children: [{
      path: '',
      name: 'department',
      component: () => import('@/views/department/index'),
      meta: { title: '组织', icon: 'el-icon-office-building' }
    }]
  }