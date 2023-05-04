import Router from "koa-better-router"
// 添加一个路由
import {knex} from "../config/knex.mjs";
import {web_craw_book, web_get_book_details} from "../book_source.mjs";
import {success, err} from "../utils.mjs";
import bcrypt from "bcrypt";
import {get_user_id} from "../id.mjs";
const saltRounds = 10;
export let user_router = Router().loadMethods();

//获取用户列表
user_router.post("/user/admin/list", async (ctx, next) => {
    const {likeUsername} = ctx.request.body;

    let like = {}
    if (likeUsername == undefined){
       like = await knex('user').select()
    }else {
        like = await knex('user').where('name','like','%' + likeUsername + '%').select()
    }
    return success(ctx, like);
})

user_router.post("/user/register", async (ctx, next) => {
        //从body中取出与这些变量同名的属性  并赋值给这些变量
        const { name, email, password } = ctx.request.body;
        // 用户是否注册
        if (await knex('user').where('name', name).isExist()) {
            return err(ctx,'此用户名已被使用');
        }
        const hash_password = await bcrypt.hash(password, saltRounds);

        let userId = get_user_id();

        await knex('user').insert({
            id: userId,
            name, email, password: hash_password, created_time: new Date(), permission: '[]',
            avatar: '/statics/default_avatar.png',
        })
        return success(ctx, {
            id: userId,
        });
})

user_router.post("/user/login", async (ctx, next) => {
    const { name, password } = ctx.request.body;
    const user = await knex('user').where({ name }).first();
    if (!user) {
        return this.error('用户不存在');
    }
    if (!await bcrypt.compare(password, user.password)) {
        return this.error('密码不正确');
    }

    ctx.session.set("user", user);
    return success(ctx, user);
})
//查询用户的基本信息
user_router.post("/user/base_info", async (ctx, next) => {
    let session_user = ctx.session.get("user");
    if (!session_user) {
        return err(ctx, "用户没有登录，请先登录")
    }
    const user = await knex('user').where({ name: session_user.name }).first();
    if (!user) {
        return err(ctx,'用户不存在');
    }

    ctx.session.set("user", user);
    return success(ctx, user);
})

user_router.post("/user/logout", async (ctx, next) => {
    let session_user = ctx.session.get("user");
    if (session_user) {
        ctx.session.set("user", undefined);
        return success(ctx, true)
    } else {
        return success(ctx, false)
    }
})

//根据用户id 编辑用户信息
user_router.post("/user/edit", async (ctx, next) =>{
    const {id,name,email} = ctx.request.body;

    await knex('user')
        .update({
            name: name,
            email: email,
            updated_time: new Date()
        })
        .where("id",id)

    return success(ctx,{

    })

})

//删除用户
user_router.post("/user/delete", async (ctx, next) =>{
    const {id} = ctx.request.body;

    await knex('user')
        .del()
        .where("id",id)

    return success(ctx,{})
})

//查询用户
user_router.post("/user/inquire", async (ctx, next) =>{
    const {name} = ctx.request.body;

    const inquire = await knex('user')
        .select()
        .where("name",name)
    return success(ctx,inquire)
})


