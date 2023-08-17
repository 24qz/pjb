import Layout from '@/layout'

export default {
    path: '/attendance',
  component: Layout,
  name: 'attendance',
    children: [{
      path: '',
      name: 'attendance',
      component: () => import('@/views/attendance/index'),
      meta: { title: '考勤', icon: 'el-icon-s-claim' }
    }]
  }