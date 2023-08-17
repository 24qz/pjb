import Layout from '@/layout'

export default {
    path: '/approval',
  component: Layout,
  name: 'approval',
    children: [{
      path: '',
      name: 'approval',
      component: () => import('@/views/approval/index'),
      meta: { title: '审批', icon: 'el-icon-s-check' }
    }]
  }