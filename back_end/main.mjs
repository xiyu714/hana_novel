// 先处理环境变量
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import Koa from "koa"
import server from "koa-better-serve"

import {knex} from "./config/knex.mjs"
import {api} from "./router.mjs"

// 服务器配置
const app = new Koa();

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 设置静态资源路径
app.use(async (ctx, next) => {
    if(ctx.url === "/") {
        ctx.url = "/index.html"
    }
    await next();
});
app.use(server("../front_end/dist", "/"))
// 加载路由
app.use(api.middleware())

let port = 30000;

app.listen(port);

console.log(`应用启动成功: http://localhost:${port}`)
