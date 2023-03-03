
import Router from "koa-better-router"
import {knex} from "./config/knex.mjs";
import {web_get_book_details} from "./book_source.mjs";

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
            .select("id")
            .where("book_id", id)
            .orderBy('updated_time', 'asc');
        book.chapter = chapter;
        success(ctx, book)
    } else {
        err(ctx, "不能找到对应的书籍！")
    }
    return next()
})

router.post('/book/content', async (ctx, next) => {
    let { book_id, id } = ctx.request.body;

    let chapter = await knex("chapter")
        .select("title")
        .select("content")
        .where("book_id", book_id)
        .where("id", id)
        .first();
    success(ctx, chapter)
    return next()
})

router.post('/book/craw/details', async (ctx, next) => {
    let { book_id } = ctx.request.body;
    // 首先 爬取书籍的详细信息
    let details = await web_get_book_details(book_id);
    //
    success(ctx, details)
    return next()
})

router.post('/book/craw/start', async (ctx, next) => {
    let { book_id } = ctx.request.body;
    // 首先 爬取书籍的详细信息
    let details = await web_get_book_details(book_id);
    //
    success(ctx, chapter)
    return next()
})

router.post('/book/craw/getStatus', async (ctx, next) => {
    let { book_id, id } = ctx.request.body;

    let chapter = await knex("chapter")
        .select("title")
        .select("content")
        .where("book_id", book_id)
        .where("id", id)
        .first();
    success(ctx, chapter)
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
