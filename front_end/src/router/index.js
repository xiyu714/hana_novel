import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Library from "../views/Library.vue"
import Ranking from "../views/Ranking.vue"
import BookShelf from "../views/BookShelf.vue";
import BookDetail from "../views/BookDetail.vue";
import Admin from "../views/Admin.vue";
import Chapter from "../views/Chapter.vue";
import UserManage from "../views/admin/UserManage.vue";
import AddnovelManage from "../views/admin/AddnovelManage.vue";
import NovelManage from "../views/admin/NovelManage.vue";
import TagnovelManage from "../views/admin/TagnovelManage.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path:'/library',
          name:'library',
          component: Library
        },{
          path:'/ranking',
          name:'ranking',
          component: Ranking
        },{
          path:'/bookshelf',
          name:'bookshelf',
          component: BookShelf,
        },
        {
          path: '/book/:id',
          name: 'book',
          component: BookDetail,
        }
      ]
    },{
      path: '/admin',
      name: 'admin',
      component: Admin,
      children:[
        {
          path:'user_manage',
          component: UserManage
        },
        {
          path:'addnovel_manage',
          component: AddnovelManage
        },
        {
          path:'novel_manage',
          component: NovelManage
        },{
          path:'tagnovel_manage',
          component: TagnovelManage
        }
      ]
    },{
      path: '/book/:id/:chapter_id',
      name: 'chapter',
      component: Chapter,
    }

  ]
})

export default router
