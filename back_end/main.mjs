// 先处理环境变量
import 'dotenv/config'
import Koa from "koa"
import server from "koa-better-serve"
import cors from '@koa/cors'

import {knex} from "./config/knex.mjs"
import {api} from "./router/router.mjs"
import { koaBody } from "koa-body";
import {get_session_id} from "./id.mjs";

// 服务器配置
const app = new Koa();

let session_store = {};
// session
app.use(async (ctx, next) => {
    let sessionId = ctx.cookies.get("session_id");
    let create_session = () => {
        sessionId = get_session_id();
        let session = {
            is_Login: false
        }
        session_store[sessionId] = session
        ctx.cookies.set("session_id", sessionId,{
            maxAge:30 * 24 *60*60*1000
        })
        return session
    }
    // 如果sessionId 为空
    if (!sessionId) {
        create_session()
    }
    let current_session = session_store[sessionId]
    if(!current_session) {
        console.log(`${sessionId} 已过期！`)
        current_session = create_session()
    }
    ctx.session = {
        current_session,
        store: session_store,
        get: (key) => {
            return current_session[key]
        },
        set: (key, value) => {
            current_session[key] = value
        }
    }
    await next();
});

// 允许跨域请求
app.use(cors());

app.use(koaBody());

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 处理路由
let static_server = server("../front_end/dist", "/");
app.use(async (ctx, next) => {
    if (ctx.url.startsWith("/api")) {
        await next();
    } else {
        if(ctx.url === "/" || (!ctx.url.startsWith("/assets/") && ctx.url !== "/favicon.ico")) {
            ctx.url = "/index.html"
        }
        await static_server(ctx, next)
    }
});

// 加载路由
app.use(api.middleware())

let port = 30000;

app.listen(port);

console.log(`应用启动成功: http://localhost:${port}`)
