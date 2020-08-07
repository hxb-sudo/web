import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '平台管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '租户管理' },
        children: [
          {
            path: 'table-1',
            component: () => import('@/views/table/user/lessee'),
            name: 'table-1',
            meta: { title: '租户' },
          }
          // ,
          // {
          //   path: 'table-2',
          //   component: () => import('@/views/table/user/menu'),
          //   name: 'table-2',
          //   meta: { title: '菜单管理' }
          // }
          ,
          //  修改租户路由
          {
            path: "usermessage/:id",
            name: "租户详情",
            component: () => import('@/views/table/user/lessee/les/message'),
            meta: { title: '租户详情', noCache: true },
            hidden: true
          },
          //  添加租户路由
          {
            path: "usermessage",
            name: "添加租户",
            component: () => import('@/views/table/user/lessee/les/message'),
            meta: { title: '添加租户', noCache: true },
            hidden: true
          }
        ]
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '用户管理', icon: 'tree' }
      },
      // 修改用户
      {
        path: 'save/:id',
        name: 'save',
        component: () => import('@/views/tree/save'),
        meta: { title: '用户修改' },
        hidden: true
      },
      // 添加用户
      {
        path: 'save',
        name: 'save',
        component: () => import('@/views/tree/save'),
        meta: { title: '添加用户' },
        hidden: true
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/role/index'),
        meta: { title: '权限角色管理', icon: 'user' }
      }
    ]
  },
  // 类别管理
  {
    path: '/classes',
    component: Layout,
    redirect: '/classes/index',
    name: 'classes',
    meta: { title: '产品管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/classes/classes'),
        meta: { title: '产品类别管理', icon: '' }
      },
      // 详情修改页面
      {
        path: 'activesave/:id',
        name: 'activesave',
        component: () => import('@/views/classes/express/saveandupd'),
        meta: { title: '产品详情修改', icon: '' },
        hidden: true
      },
      {
        path: 'activesave',
        name: 'activesave',
        component: () => import('@/views/classes/express/saveandupd'),
        meta: { title: '产品添加', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/basicInformation',
    component: Layout,
    meta: {
      title: '基础信息',
      icon: 'nested'
    },
    children: [
      {
        path: 'position',
        name: 'Position',
        component: () => import('../views/basicInformation/position'),
        meta: { title: '位置信息' }
      },
      {
        path: 'addPosition',
        name: 'addPosition',
        component: () => import('../views/basicInformation/children/addPosition'),
        meta: { title: '添加位置' }
      }
    ]
  },
  //订单管理
  {
    path: '/projectOrders',
    name: 'ProjectOrders',
    component: Layout,
    meta: {
      title: '项目订单管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'productionOrderManagement',
        name: 'ProductionOrderManagement',
        component: () => import('../views/projectorders/productionOrderManagement'),
        meta: { title: '生产订单管理' }
      },
      {
        path: 'position1',
        name: 'Position',
        component: () => import('../views/basicInformation/position'),
        meta: { title: '位置信息' }
      }
    ]
  },
  //互动推广
  {
    path: '/interactivemarketing',
    name: 'Interactivemarketing',
    component: Layout,
    meta: {
      title: '互动推广',
      icon: 'nested'
    },
    children: [
      {
        path: 'specialOffer',
        name: 'SpecialOffer',
        component: () => import('../views/Interactivemarketing/specialOffer'),
        meta: { title: '优惠活动' }
      },
      {
        path: 'advertisingManagement',
        name: 'AdvertisingManagement',
        component: () => import('../views/Interactivemarketing/advertisingManagement'),
        meta: { title: '广告管理' }
      }
    ]
  },
  //工单管理
  {
    path: '/workOrderManage',
    name: 'WorkOrderManage',
    component: Layout,
    meta: {
      title: '工单管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'workOrderTypeManage',
        name: 'WorkOrderTypeManage',
        component: ()=> import('../views/workorderManage/workOrderTypeManage'),
        meta: {title: '工单类型管理'}
      },
      {
        path: 'workOrderInfo',
        name: 'WorkOrderInfo',
        component: ()=> import('../views/workorderManage/workOrderInfo'),
        meta: {title: '工单信息'}
      },
      {
        path: 'engineerManage',
        name: 'EngineerManage',
        component: ()=> import('../views/workorderManage/engineerManage'),
        meta: {title: '工程人员管理'}
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // 打包的时候给解开
  // mode: 'hash', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
