
import Router from "koa-better-router"
import {knex} from "./config/knex.mjs";

let router = Router().loadMethods();
// 添加一个路由
router.get('/', (ctx, next) => {
    ctx.body = `Hello world! Prefix: ${ctx.route.prefix}`
    return next()
})

// 添加一个路由
router.post('/book/list', async (ctx, next) => {
    let books = await knex("book").select();
    success(ctx, books)
    return next()
})

router.post('/book/details', async (ctx, next) => {
    let { id } = ctx.request.body;
    let book = await knex("book").where("id", id).first();
    if(book !== undefined) {
        let chapter = await knex("chapter")
            .select("title")
            .where("book_id", id)
            .orderBy('updated_time', 'asc');
        book.chapter = chapter;
        success(ctx, book)
    } else {
        err(ctx, "不能找到对应的书籍！")
    }
    return next()
})

function success(ctx, data) {
    ctx.body = {
        data,
        status_code: 200
    }
}

function err(ctx, message) {
    ctx.body = {
        message,
        status_code: -1
    }
}

// 添加api路由，所有api都在路由下面
export let api = Router({ prefix: '/api' })

// add `router`'s routes to api router
api.extend(router)
