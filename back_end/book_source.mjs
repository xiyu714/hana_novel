// 首先 一个获取 小说列表的接口，然后是分类
// 但如果是爬取，分类貌似是天生的

// 然后重中之重是 小说内容的获取

import axios from 'axios';
import iconv from "iconv-lite"
import { JSDOM } from "jsdom"
import {knex} from "./config/knex.mjs";
import {get_book_id, get_chapter_id} from "./id.mjs";

let Axios = axios.create({
    responseType: "arraybuffer"
});

Axios.interceptors.response.use(function (response) {
    var ctype = response.headers["content-type"].toLowerCase();
    response.data = ctype.includes("charset=gbk") || ctype.includes("charset=gb2312") ?
        iconv.decode(response.data, 'gbk') :
        iconv.decode(response.data, 'utf-8');
    return response;
})

async function get_document(book_url) {
    // 获取页面内容
    let response = await Axios.get(book_url)
    // 获取jsdom
    let dom = new JSDOM(response.data);
    let document = dom.window.document;
    return document;
}

let baseUrl = "https://www.xbiquge.so/book/";
async function get_book_details(book_url) {
    let document = await get_document(book_url);
    let book = {};
    // 获取小说封面URL
    book.封面_URL = document.querySelector("#fmimg > img").getAttribute("src");
    book.标题 = document.querySelector("#info h1").textContent;
    book.作者名 = document.querySelector("#info > p > a").textContent;
    book.简介 = document.querySelector("#intro").textContent;
    book.章节列表 = []
    // 获取章节目录
    let nodeList = document.querySelectorAll("#list > dl > *");
    let dt_count = 0;
    for (let nodeListElement of nodeList) {
        if (nodeListElement.localName === "dt") {
            dt_count += 1;
            continue;
        }
        if (dt_count >= 2) {
            let a = nodeListElement.children[0];
            if(a !== undefined) {
                let 相对_url = a.getAttribute("href");
                let title = a.textContent;

                book.章节列表.push({
                    title,
                    url: book_url + "/" + 相对_url
                })
            }
        }
    }
    return book
}

export async function web_get_book_details(book_id) {
    return await get_book_details(baseUrl + book_id);
}

// 爬取小说
export async function web_craw_book(task_map, task_key) {
    let task = task_map[task_key];
    try {
        let bookId = get_book_id();
        await knex("book").insert({
            id: bookId,
            title: task.标题,
            description: task.简介,
            cover_url: task.封面_URL,
            author: task.作者名,
            created_time: new Date(),
            updated_time: new Date()
        })
        task.log = "插入书籍到数据库</br>";
        for (let 章节列表Element of task.章节列表) {
            章节列表Element.进度 = 25;
            // 爬取小说内容
            let 小说内容_document = await get_document(章节列表Element.url);
            let innerHTML = 小说内容_document.querySelector("#content").innerHTML;
            innerHTML = innerHTML.replaceAll("&nbsp;&nbsp;", " ");
            innerHTML = innerHTML.replaceAll("<br><br>", "\n");
            const regex = /笔趣阁.*?\n/gms;
            innerHTML = innerHTML.replace(regex, "");


            章节列表Element.content = innerHTML
            章节列表Element.进度 = 50;
            await knex("chapter").insert({
                id: get_chapter_id(),
                book_id: bookId,
                title: 章节列表Element.title,
                content: 章节列表Element.content,
                word_count: 章节列表Element.content.length,
                created_time: new Date(),
                updated_time: new Date()
            });
            章节列表Element.进度 = 100;
            task.log += `插入章节${章节列表Element.title}</br>`;

        }
        task.is_完成 = true;
    } catch (e) {
        task.is_完成 = true;
        task.log += e;
    }
}

async function main() {
}

await main()


