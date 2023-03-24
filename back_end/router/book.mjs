import Router from "koa-better-router"
// 添加一个路由
import {knex} from "../config/knex.mjs";
import {web_craw_book, web_get_book_details} from "../book_source.mjs";
import {success, err} from "../utils.mjs";

export let book_router = Router().loadMethods();

book_router.get('/', (ctx, next) => {
    ctx.body = `Hello world! Prefix: ${ctx.route.prefix}`
    return next()
})

// 添加一个路由
//查找书籍列表
book_router.post('/book/list', async (ctx, next) => {
    let books = await knex("book").select();
    success(ctx, books)
    return next()
})

//查找书籍详情内容 章节名
book_router.post('/book/details', async (ctx, next) => {
    let { id } = ctx.request.body; //获取前端请求的body中的id
    //在book库中查询一个id = 传入的id
    let book = await knex("book")
        .where("id", id)
        .first(); //只返回一个
    if(book !== undefined) {
        let chapter = await knex("chapter")
            .select("title")
            .select("id")
            .where("book_id", id)
            .orderBy('updated_time', 'asc');
        book.chapter = chapter;

        //根据书本id
        let 字数 = await knex("chapter")
            .selectRaw('sum(word_count) as wordTotal')
            .where("book_id", id)
            .first()

        book.words_account = 字数

        await knex('book')
            .where('id',id)
            .increment('visit_count',1)

        success(ctx, book)
    } else {
        err(ctx, "不能找到对应的书籍！")
    }
    return next()
})
//查找小说章节内容
book_router.post('/book/content', async (ctx, next) => {
    let { book_id, id } = ctx.request.body;

    let chapter = await knex("chapter")
        .select("title")
        .select("content")
        .select("updated_time")
        .where("book_id", book_id)
        .where("id", id)
        .first();
    let book = await knex("book")
        .select("title")
        .select("author")
        .where("id",book_id)
        .first()
    book.chapter = chapter
    success(ctx, book)
    return next()
})
//爬取书籍（未完成）
book_router.post('/book/craw/details', async (ctx, next) => {
    let { book_id } = ctx.request.body;
    // 首先 爬取书籍的详细信息
    let details = await web_get_book_details(book_id);
    //
    success(ctx, details)
    return next()
})

let task_map = {}

book_router.post('/book/craw/start', async (ctx, next) => {
    let { book_details } = ctx.request.body;
    // 新建一个任务
    task_map[book_details.标题] = book_details;
    web_craw_book(task_map, book_details.标题)
    //
    success(ctx, {
        task_id : book_details.标题
    })
    return next()
})

book_router.post('/book/craw/getStatus', async (ctx, next) => {
    let { task_id } = ctx.request.body;

    success(ctx, task_map[task_id])
    return next()
})



//删除小说
book_router.post("/book/delete", async (ctx, next) =>{
    const {id} = ctx.request.body;

    await knex('book')
        .del()
        .where("id",id)

    await knex('chapter')
        .del()
        .where("book_id",id)

    return success(ctx,{})
})

//查找小说 书名
book_router.post("/book/inquire", async (ctx, next) =>{
    const {title} = ctx.request.body;

    const inquire = await knex('book')
        .select()
        .where("title",title)
    return success(ctx,inquire)
})

//获取下一章节章节id
book_router.post("/book/next_chapter_id", async(ctx, next) =>{
    const { book_id, id} = ctx.request.body;

    const chapter_id = await knex("chapter")
        .select("id")
        .where("book_id", book_id)
        .whereRaw(`
            created_time >  (
select created_time  from chapter where book_id = ? and id = ?
) 
        `, [book_id, id])
        .orderBy("created_time")
        .first()
    return success(ctx, {
        chapter_id:chapter_id.id
    })
} )

//获取上一章节章节id
book_router.post("/book/last_chapter_id", async(ctx, next) =>{
    const { book_id, id} = ctx.request.body;

    const chapter_id = await knex("chapter")
        .select("id")
        .where("book_id", book_id)
        .whereRaw(`
            created_time <  (
select created_time  from chapter where book_id = ? and id = ?
) 
        `, [book_id, id])
        .orderBy("created_time","desc")
        .first()
    return success(ctx, {
        chapter_id: chapter_id.id
    })
} )