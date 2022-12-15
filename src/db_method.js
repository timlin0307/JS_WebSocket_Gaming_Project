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

const updateStatusLogin = async function (username) {
    let user = await db.model.Account.update(
        { status: "login" },
        { where: { username: username } })
    if (username != "unknown") { // only show player message
        console.log(username + "'s status updated to login")
    }
}

const updateStatusLogout = async function (username) {
    let user = await db.model.Account.update(
        { status: "logout" },
        { where: { username: username } })
    if (username != "unknown") { // only show player message
        console.log(username + "'s status updated to logout")
    }
}

const updateXY = async function (username, xx, yy) {
    let user = await db.model.Account.update(
        { x: xx, y: yy },
        { where: { username: username } })
    console.log(username + "'s XY updated to " + xx + ", " + yy)
}

const updateDirection = async function (username, direct) {
    let user = await db.model.Account.update(
        { direction: direct },
        { where: { username: username } })
    console.log(username + "'s direction updated to " + direct)
}

module.exports = { findByUsername, countRows, findAllRows, updateStatusLogin, updateStatusLogout, updateXY, updateDirection }