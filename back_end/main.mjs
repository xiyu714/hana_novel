// 先处理环境变量
import 'dotenv/config'
import Koa from "koa"
import server from "koa-better-serve"
import cors from '@koa/cors'

import {knex} from "./config/knex.mjs"
import {api} from "./router/router.mjs"
import { koaBody } from "koa-body";

// 服务器配置
const app = new Koa();

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
