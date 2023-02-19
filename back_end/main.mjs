// 先处理环境变量
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import Koa from "koa"

import {knex} from "config/knex.mjs"

// 服务器配置
const app = new Koa();

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});


let port = 30000;

app.listen(port);

console.log(`应用启动成功: http://localhost:${port}`)
