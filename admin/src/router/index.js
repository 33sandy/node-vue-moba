import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdvEdit from '../views/AdvEdit.vue'
import AdvList from '../views/AdvList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  { path: '/login',name:'login' , component: Login,meta: { isPubile:true } },       //是否公开
  {
    path: '/',
    name: 'Main',
    component: Main,  
    children: [
        { path: '/categories/create', name: 'CategoryEdit', component: CategoryEdit,},
        { path: '/categories/edit/:id', name: 'CategoryEdit', component: CategoryEdit,props: true},
        { path: '/categories/list', name: 'CategoryList', component: CategoryList,},

        { path: '/items/create', name: 'ItemEdit', component: ItemEdit,},
        { path: '/items/edit/:id', name: 'ItemEdit', component: ItemEdit,props: true},
        { path: '/items/list', name: 'ItemList', component: ItemList,},

        { path: '/heros/create', name: 'HeroEdit', component: HeroEdit,},
        { path: '/heros/edit/:id', name: 'HeroEdit', component: HeroEdit,props: true},
        { path: '/heros/list', name: 'HeroList', component: HeroList,},

        { path: '/articles/create', name: 'ArticleEdit', component: ArticleEdit,},
        { path: '/articles/edit/:id', name: 'ArticleEdit', component: ArticleEdit,props: true},
        { path: '/articles/list', name: 'ArticleList', component: ArticleList,},

        { path: '/advs/create', name: 'AdvEdit', component: AdvEdit,},
        { path: '/advs/edit/:id', name: 'AdvEdit', component: AdvEdit,props: true},
        { path: '/advs/list', name: 'AdvList', component: AdvList,},

        { path: '/admin_user/create', name: 'AdminUserEdit', component: AdminUserEdit,},
        { path: '/admin_user/edit/:id', name: 'AdminUserEdit', component: AdminUserEdit,props: true},
        { path: '/admin_user/list', name: 'AdminUserList', component: AdminUserList,},

      ]

  },
  
]

// 在vue里面全局注入
Vue.mixin({
  computed:{
    uploadURl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods:{
    getAuthHeaders(){
      return{
        Authorization:`Bearer ${localStorage.token || ''}  `
      }
    }
  }
})

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPubile && !localStorage.token){
  console.log('need login')
  return next('/login');
  }
  next()
})

export default router
