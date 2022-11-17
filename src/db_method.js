const db = require("./db")

async function findByUsername(username) {
    await db.model.Account.findOne({
        where: { username: username }
    }).then(note => {
        console.log(note.get({ plain: true }))
    })
}

async function countRows() {
    const n = await db.model.Account.count()
    // console.log(`There are ${n} rows`)
    return n
}

async function findAllRows() {
    let accounts = await db.model.Account.findAll({ raw: true })
    console.log(accounts)
}

async function userVerify(id) {
    let accounts = await db.model.Account.findAll({ raw: true })
    // console.log(accounts[id].username, accounts[id].password)
    return [accounts[id].username, accounts[id].password]
}

module.exports = { findByUsername, countRows, findAllRows, userVerify }