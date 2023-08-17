import Layout from '@/layout'

export default {
    path: '/role',
  component: Layout,
  name: 'role',
    children: [{
      path: '',
      name: 'role',
      component: () => import('@/views/role/index'),
      meta: { title: '角色', icon: 'el-icon-setting' }
    }]
  }