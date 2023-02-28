// 首先 一个获取 小说列表的接口，然后是分类
// 但如果是爬取，分类貌似是天生的

// 然后重中之重是 小说内容的获取

import axios from 'axios';
import iconv from "iconv-lite"
import { JSDOM } from "jsdom"
import {knex} from "./config/knex.mjs";
import {get_book_id, get_chapter_id} from "./id.mjs";

async function get_book_details() {
    let base_url = "https://www.xbiquge.so/book/7059/";
    let dom = await JSDOM.fromURL(base_url);
    let document = dom.window.document;
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
                console.log("loading: ", title)
                // 爬取小说内容
                let dom = await JSDOM.fromURL(base_url + "/" + 相对_url);
                let 小说内容_document = dom.window.document;
                let innerHTML = 小说内容_document.querySelector("#content").innerHTML;
                innerHTML = innerHTML.replaceAll("&nbsp;&nbsp;", " ");
                innerHTML = innerHTML.replaceAll("<br><br>", "\n");
                const regex = /笔趣阁.*?\n/gms;
                innerHTML = innerHTML.replace(regex, "");
                book.章节列表.push({
                    title,
                    content: innerHTML,
                })
            }
        }
    }
    return book
}

async function main() {
    let bookDetails = await get_book_details();
    let bookId = get_book_id();
    await knex("book").insert({
        id: bookId,
        title: bookDetails.标题,
        description: bookDetails.简介,
        cover_url: bookDetails.封面_URL,
        author: bookDetails.作者名,
        created_time: new Date(),
        updated_time: new Date()
    })
    for (let 章节 of bookDetails.章节列表) {
        await knex("chapter").insert({
            id: get_chapter_id(),
            book_id: bookId,
            title: 章节.title,
            content: 章节.content,
            created_time: new Date(),
            updated_time: new Date()
        });
    }
}

await main()
