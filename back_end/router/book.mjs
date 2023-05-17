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
    const {currentPage, pageSize} = ctx.request.body;
    let total = {}
    let books = {}
    if(currentPage === undefined && pageSize === undefined){
        books = await knex("book").select()
    }else {
        //查询当前页面显示的书籍数据
        books = await knex("book").limit(pageSize).offset((currentPage-1) * pageSize).select()
    }
    //获取书本总数
     total = await knex("book").countValue()
    success(ctx, {
        books,
        total
    })
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

        //找到书本最近更新的章节
        let 最新章节 = await knex("chapter")
            .select("title")
            .select("updated_time")
            .where("book_id", id)
            .orderBy('updated_time', 'desc')
            .first();
        book.new_chapter = 最新章节;


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

//查找小说 书名  作者名
book_router.post("/book/inquire", async (ctx, next) =>{
    const {likebook} = ctx.request.body;

    const inquire = await knex('book')
        .select()
        .where("title","like","%"+likebook+"%")
        .orWhere("author","like","%"+likebook+"%")
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
    if(chapter_id) {
        return success(ctx, {
            chapter_id:chapter_id.id
        })
    } else {
        return err(ctx, "没有下一章！")
    }
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

    if(chapter_id) {
        return success(ctx, {
            chapter_id:chapter_id.id
        })
    } else {
        return err(ctx, "没有上一章！")
    }
} )

//最新
book_router.post("/book/new_sort",async (ctx, next) => {
    const {currentPage, pageSize} = ctx.request.body;
    let total = {}
    let new_sort = {}
    if(currentPage === undefined && pageSize === undefined){
        new_sort = await knex("book").orderBy("updated_time","desc").select()
    }
    else {
        //查询当前页面显示的书籍数据
        new_sort = await knex("book").limit(pageSize).offset((currentPage-1) * pageSize).orderBy("updated_time","desc").select()
    }
    //获取书本总数
    total = await knex("book").countValue()
    success(ctx, {
        new_sort,
        total
    })
    return next()
})

//查找点击量
book_router.post("/book/hot_sort",async (ctx, next) => {
    const {currentPage, pageSize} = ctx.request.body;
    let total = {}
    let hot = {}
    if(currentPage === undefined && pageSize === undefined){
        hot = await knex("book").orderBy("visit_count","desc").select()
    }
    else {
        //查询当前页面显示的书籍数据
        hot = await knex("book").limit(pageSize).offset((currentPage-1) * pageSize).orderBy("visit_count","desc").select()
    }
    //获取书本总数
    total = await knex("book").countValue()
    success(ctx, {
        hot,
        total
    })
    return next()
})






//书架
//遍历该用户书架中的书
book_router.post("/book/userlist",async (ctx, next) => {
    const {likebook_title,user_id} = ctx.request.body
    let user_books = {}
    if(likebook_title == undefined){
        user_books = await knex("bookshelf")
            .join("book","bookshelf.book_id",'=',"book.id")
            .where("user_id",user_id)
            .where("exist_bookshelf","exist" )
            .select()


    }else {
        user_books = await knex("bookshelf")
            .join("book","bookshelf.book_id",'=',"book.id")
            .where("user_id",user_id)
            .where("exist_bookshelf","exist" )
            .where('title','like','%' + likebook_title + '%')
            .select()
    }
    success(ctx, user_books)
    return next()
})

//用户往书架中添加书籍
book_router.post("/book/useradd",async (ctx, next) =>{
    const {user_id,book_id} = ctx.request.body

    const is_exist = await knex("bookshelf").where({user_id:user_id,book_id:book_id}).isExist()
    const exist = await knex("bookshelf").where({user_id:user_id,book_id:book_id})
                                        .where("exist_bookshelf","exist").isExist()
//在数据库中找到 + exist ->在书架中；
//在数据库中找到 无exist  ->添加过但被删除   只需exist_bookshelf修改为exist
    if(is_exist){
        if(exist){
            return err(ctx,"该书已在书架中")
        }else {
            let user_insert_book = await knex("bookshelf").where({user_id:user_id,book_id:book_id})
                                .update("exist_bookshelf","exist")
            return success(ctx,user_insert_book)
        }
    }else {
        let user_insert_book = await knex("bookshelf").insert({user_id: user_id,book_id: book_id,exist_bookshelf:"exist"})
        return success(ctx, user_insert_book)
    }
})

//用户从书架中移走书籍(批量删除)
book_router.post("/book/alldelete",async (ctx, next) =>{
    const {user_id,book_idList} = ctx.request.body

    for(let i = 0;i<book_idList.length;i++){
        await knex("bookshelf").where({user_id:user_id,book_id:book_idList[i]})
                            .update("exist_bookshelf","")

    }
    return success(ctx,book_idList)

})

//书架中书本阅读记录
// book_router.post("/book/records",async (ctx,next) =>{
//     const {user_id} = ctx.request.body;
//
//     //获取书架中所有书本id
//     let book_list = await knex("bookshelf").where("user_id",user_id)
//             .column("book_id")
//             .select()
//     //查找章节总数
//     for(let i=0;i<book_list.length;i++){
//         let count = await knex("chapter").where("book_id",book_list[i].book_id).countValue()
//         book_list[i].chapter_count = count
//     }
//     //获取当前阅读章节id
//
//
//     return success(ctx,book_list)
//
// })


//标签管理
//测试
book_router.post("/book/updatetag",async (ctx, next) =>{
    const {book_id,tag} = ctx.request.body

    let t_tag = await knex("book").where('id',book_id).update({tag:JSON.stringify(tag)})

    return success(ctx,t_tag)
})

//测试(未完成)
book_router.post("/book/searchtag",async (ctx, next) =>{
    const {tag,currentPage, pageSize} = ctx.request.body

    let total = {}
    let t_tag = {}
    if(currentPage === undefined && pageSize === undefined){
        t_tag = await knex("book").whereRaw(`JSON_CONTAINS(tag, '"${tag}"')`).select();
    }else{
        t_tag = await knex("book").limit(pageSize).offset((currentPage-1) * pageSize).whereRaw(`JSON_CONTAINS(tag, '"${tag}"')`).select();
    }

    total = await knex("book").whereRaw(`JSON_CONTAINS(tag, '"${tag}"')`).countValue();
    return success(ctx,{
        t_tag,
        total
    })
})