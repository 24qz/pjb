import Layout from '@/layout'

export default {
  path: '/employee',
  name: 'employee',
    component: Layout,
    children: [{
      path: '',
      name: 'employee',
      component: () => import('@/views/employee/index'),
      meta: { title: '员工', icon: 'el-icon-user' }
    },{
      path: 'detail:id?',
      name: 'detail',
      hidden: true,
      component: () => import('@/views/employee/addDetail'),
      meta: { title: '添加员工', icon: 'el-icon-user' }
    }
    ]
  }