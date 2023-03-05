import Router from "koa-better-router"
// 添加一个路由
import {knex} from "../config/knex.mjs";
import {web_craw_book, web_get_book_details} from "../book_source.mjs";
import {success, err} from "../utils.mjs";
import bcrypt from "bcrypt";
import {get_user_id} from "../id.mjs";
const saltRounds = 10;
export let user_router = Router().loadMethods();

user_router.post("/user/admin/list", async (ctx, next) => {
    return success(ctx, await knex('user').select());
})

user_router.post("/user/register", async (ctx, next) => {
        const { name, email, password } = ctx.request.body;
        // 用户是否注册
        if (await knex('user').where('name', name).isExist()) {
            return this.error('此用户名已被使用');
        }
        const hash_password = await bcrypt.hash(password, saltRounds);

        let userId = get_user_id();

        await knex('user').insert({
            id: userId,
            name, email, password: hash_password, created_time: new Date(), permission: '[]',
            avatar: '/images/default_avatar.jpg',
        })
        return success(ctx, {
            id: userId,
        });
})

