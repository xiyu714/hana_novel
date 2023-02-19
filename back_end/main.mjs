import Koa from "koa"
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
