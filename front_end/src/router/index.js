import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Library from "../views/Library.vue"
import Ranking from "../views/Ranking.vue"
import Sort from "../views/Sort.vue";
import AuthorColumn from "../views/AuthorColumn.vue";
import BookDetail from "../views/BookDetail.vue";
import Admin from "../views/Admin.vue";
import Chapter from "../views/Chapter.vue";
import Author from "../views/Author.vue";
import UserManage from "../views/admin/UserManage.vue";
import AuthorManage from "../views/admin/AuthorMange.vue";
import AddnovelManage from "../views/admin/AddnovelManage.vue";

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
          path:'/sort',
          name:'sort',
          component: Sort
        },
        {
          path:'/authorcolumn',
          name:'authorcolumn',
          component: AuthorColumn
        },
        {
          path: '/book/:id',
          name: 'book',
          component: BookDetail,
        },{
          path:'/author/:id',
          name:'author',
          component:Author
        }
      ]
    },{
      path: '/admin',
      name: 'admin',
      component: Admin,
      children:[
        {
          path:'author_manage',
          component: AuthorManage
        },
        {
          path:'user_manage',
          component: UserManage
        },
        {
          path:'addnovel_manage',
          component: AddnovelManage
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
