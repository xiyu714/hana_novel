import { knex } from "./config/knex.mjs"

async function main() {
    console.log(await knex("chapter").insert({
        id: 221112,
        book_id: 22,
        title: "33",
        content: "33",
        created_time: new Date(),
        updated_time: new Date()
    }))
    console.log("xx")
}

main()

console.log("e")
