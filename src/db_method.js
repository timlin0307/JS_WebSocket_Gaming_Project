const db = require("./db")

const findByUsername = async function (username) {
    await db.model.Account.findOne({
        where: { username: username }
    }).then(res => {
        console.log(res.get({ plain: true }))
    })
}

const countRows = async function () {
    let n = await new Promise((resolve, reject) => {
        resolve(db.model.Account.count())
    })

    // console.log(`There are ${n} rows`)
    return n
}

const findAllRows = async function () {
    let accounts = await new Promise((resolve, reject) => {
        resolve(db.model.Account.findAll({ raw: true }))
    })

    // console.log(accounts[id].username, accounts[id].password)
    return accounts
}

const updateRow = async function (username) {
    let user = await db.model.Account.update(
        { status: "login" },
        { where: { username: username } })
    console.log(username + "'s status updated")
}

module.exports = { findByUsername, countRows, findAllRows, updateRow }