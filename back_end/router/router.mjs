
import Router from "koa-better-router"
import {knex} from "../config/knex.mjs";
import {web_craw_book, web_get_book_details} from "../book_source.mjs";
import {book_router} from "./book.mjs";

// 添加api路由，所有api都在路由下面
export let api = Router({ prefix: '/api' })

// add `router`'s routes to api router
api.extend(book_router)
