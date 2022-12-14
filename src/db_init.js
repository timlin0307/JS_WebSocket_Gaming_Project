const db = require("./db")

async function initDB() {
    await db.sequelize.sync({ force: true })

    await db.model.Account.create({
        username: "player1",
        password: "player1",
        status: "logout",
        character: "hero",
        x: "80",
        y: "96"
    })

    await db.model.Account.create({
        username: "player2",
        password: "player2",
        status: "logout",
        character: "npc1",
        x: "112",
        y: "144"
    })

    await db.model.Account.create({
        username: "player3",
        password: "player3",
        status: "logout",
        character: "npc2",
        x: "48",
        y: "128"
    })

    await db.model.Account.create({
        username: "player4",
        password: "player4",
        status: "login",
        character: "npc3",
        x: "0",
        y: "0"
    })
}

initDB()
    .then(() => {
        console.log("Database initialized...")
    })