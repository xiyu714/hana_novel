import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Library from "../views/Library.vue"
import Ranking from "../views/Ranking.vue"
import Sort from "../views/Sort.vue";
import AuthorColumn from "../views/AuthorColumn.vue";

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
        },{
          path:'/authorcolumn',
          name:'authorcolumn',
          component: AuthorColumn
        }
      ]
    }

  ]
})

export default router
