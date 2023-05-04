# 基础

## 入门

##### HTML

```
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>

```

##### router-link

- 创建链接
- 通过传递 'to'来指定链接

##### router-view

- 显示与链接相对应的组件
- 渲染出来的组件位置

## 带参数的动态路由匹配

#### 路径参数

- *路径参数* 用冒号 `:` 表示。
- 当一个路由被匹配时，它的 *params* 的值将在每个组件中以 `this.$route.params` 的形式暴露出来。

- 可能有一个 `User` 组件，它应该对所有用户进行渲染，但用户 ID 不同。在路径中使用一个动态字段来实现（路径参数）；

```
const User = {
  template: '<div>User</div>',
}

// 这些都会传递给 `createRouter`
const routes = [
  // 动态字段以冒号开始
  { path: '/users/:id', component: User },
]
```

## 路由的匹配语法 

- **在参数中自定义正则** ：当定义像 `:userId` 这样的参数时，我们内部使用以下的正则 `([^/]+)` (至少有一个字符不是斜杠 `/` )来从 URL 中提取参数。

```
const routes = [
  // 匹配 /o/3549
  { path: '/o/:orderId' },
  // 匹配 /p/books
  { path: '/p/:productName' },
]

const routes = [
  // /:orderId -> 仅匹配数字
  { path: '/:orderId(\\d+)' },
  // /:productName -> 匹配其他任何内容
  { path: '/:productName' },
]
```

- **可重复的参数** ：需要匹配具有多个部分的路由，如 `/first/second/third`，你应该用 `*`（0 个或多个）和 `+`（1 个或多个）将参数标记为可重复。

```
const routes = [
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: '/:chapters+' },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: '/:chapters*' },
]
```

- **Sensitive 与 strict 路由配置** ：默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。可以通过 `strict` 和 `sensitive` 选项来修改。

```
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 将匹配 /users/posva 而非：
    // - /users/posva/ 当 strict: true
    // - /Users/posva 当 sensitive: true
    { path: '/users/:id', sensitive: true },
    // 将匹配 /users, /Users, 以及 /users/42 而非 /users/ 或 /users/42/
    { path: '/users/:id?' },
  ],
  strict: true, // applies to all routes
})
```

#### **可选参数** 

可以通过使用 `?` 修饰符(0 个或 1 个)将一个参数标记为可选。`*` 在技术上也标志着一个参数是可选的，但 `?` 参数不能重复。

```
const routes = [
  // 匹配 /users 和 /users/posva
  { path: '/users/:userId?' },
  // 匹配 /users 和 /users/42
  { path: '/users/:userId(\\d+)?' },
]
```

## 编程式导航 

#### **导航到不同的位置** 

可以通过 `$router` 访问路由实例。因此你可以调用 `this.$router.push`

```
// 字符串路径
router.push('/users/eduardo')

// 带有路径的对象
router.push({ path: '/users/eduardo' })

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })
```

- **替换当前位置** ：在导航时不会向 history 添加新记录。`router.replace(...)`

```
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```

- **横跨历史** ：采用一个整数作为参数，表示在历史堆栈中前进或后退多少步

```
// 向前移动一条记录，与 router.forward() 相同
router.go(1)

// 返回一条记录，与 router.back() 相同
router.go(-1)

// 前进 3 条记录
router.go(3)

// 如果没有那么多记录，静默失败
router.go(-100)
router.go(100)
```

## 命名路由 

- 除了 `path` 之外，为任何路由提供 `name`。

```
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User,
  },
]

//链接到一个命名的路由，可以向 router-link 组件的 to 属性传递一个对象
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>

//类似于代码调用 router.push() 
router.push({ name: 'user', params: { username: 'erina' } })
```

## 命名视图

- 在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。
- 给`router-view` 设置名字（`name`）

```
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

## 重定向和别名

#### 重定向 

- 通过 `routes` 配置来完成，用 `redirect`

```
//从 /home 重定向到 /
const routes = [{ path: '/home', redirect: '/' }]

//一个方法，动态返回重定向目标
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

#### 别名

- 将 `/` 别名为 `/home`，意味着当用户访问 `/home` 时，URL 仍然是 `/home`，但会被匹配为用户正在访问 `/`。

```
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

## 将 props 传递给路由组件

- 在你的组件中使用 `$route` 会与路由紧密耦合，这限制了组件的灵活性，因为它只能用于特定的 URL。虽然这不一定是件坏事，但我们可以通过 `props` 配置来解除这种行为.

```
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const routes = [{ path: '/user/:id', component: User }]

//更换成

const User = {
  // 请确保添加一个与路由参数完全相同的 prop 名
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const routes = [{ path: '/user/:id', component: User, props: true }]
```

- **布尔模式** ：当 `props` 设置为 `true` 时，`route.params` 将被设置为组件的 props。

#### 函数模式 

- 可以创建一个返回 props 的函数。这允许你将参数转换为其他类型，将静态值与基于路由的值相结合等等。

```
//URL /search?q=vue 将传递 {query: 'vue'} 作为 props 传给 SearchUser 组件。
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

## 不同的历史模式

- **Hash 模式** :用 `createWebHashHistory()` 创建的

```
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

- **HTML5 模式** :用 `createWebHistory()` 创建 HTML5 模式

```
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

# 进阶

## 路由守卫？

- vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。

#### 全局前置守卫 

- 使用 `router.beforeEach` 注册一个全局前置守卫。
- 当一个导航触发时，全局前置守卫按照创建顺序调用。

```
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

## 路由元信息

- 配置 `meta` 字段 。将任意信息附加到路由上，如过渡名称、谁可以访问路由等

```
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 只有经过身份验证的用户才能创建帖子
        meta: { requiresAuth: true }
      },
      {
        path: ':id',
        component: PostsDetail
        // 任何人都可以阅读文章
        meta: { requiresAuth: false }
      }
    ]
  }
]
```

## Vue Router 和 组合式 API 

### 在 `setup` 中访问路由和当前路由 

- 在 `setup` 里面没有访问 `this`，所以我们不能再直接访问 `this.$router` 或 `this.$route`。作为替代，我们使用 `useRouter` 和 `useRoute` 函数。

```
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query,
          ...query,
        },
      })
    }
  },
}
```

- `route` 对象是一个响应式对象，所以它的任何属性都可以被监听。

```
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const userData = ref()

    // 当参数更改时获取用户信息
    watch(
      () => route.params.id,
      async newId => {
        userData.value = await fetchUser(newId)
      }
    )
  },
}
```

## 滚动行为 

-  vue-router 能自定义路由切换时页面如何滚动。
- `scrollBehavior` 函数接收 `to`和` from` 路由对象，如 [Navigation Guards](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)。第三个参数 `savedPosition`，只有当这是一个 `popstate` 导航时才可用（由浏览器的后退/前进按钮触发）。

```
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})


const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})
```

## 动态路由

#### 添加路由 

- `router.addRoute()` 和 `router.removeRoute() 只注册一个新的路由`。
- 需要用 `router.push()` 或 `router.replace()` 来**手动导航**，才能显示该新路由。

#### 