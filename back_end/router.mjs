
import Router from "koa-better-router"

let router = Router().loadMethods();
// 添加一个路由
router.get('/', (ctx, next) => {
    ctx.body = `Hello world! Prefix: ${ctx.route.prefix}`
    return next()
})

// 添加api路由，所有api都在路由下面
export let api = Router({ prefix: '/api' })

// add `router`'s routes to api router
api.extend(router)
