const { findByUsername, countRows, findAllRows, updateStatusLogin, updateStatusLogout, updateXY } = require("../db_method")

const express = require('express') // import express module
const app = express()
const expressWs = require('express-ws')(app) // import express-ws module
// expressWs(app) // mix WebSocket service with app (add ws method for app)
const url = require('url')
const port = 3000
const db = require("../db")

app.use(express.json())

/*const http = require('http') // initialise a server
const WebSocket = require('ws') // import WebSocket module
const server = http.createServer(express) // pass express in server
const wss = new WebSocket.Server({ server }) // assign new WebSocket*/
// const wss = new WebSocket.Server({ // instantiate
//     port: port
// })

console.log("setup server...")

// listen for a connection on newly initialised WebSocket server
/*wss.on('connection', function connection(ws, req) {
    // app.ws('connection', function connection(ws, req) { // claim WebSocket server
    // const { query: { token } } = url.parse(req.url, true)

    // console.log(`[SERVER] Client ${token} connects`)

    ws.on('message', function incoming(message) { // listen for a message from client
        // console.log(`[SERVER] Received ${message} from client ${token}`)
        console.log(`[SERVER] Received ${message} from client`)

        if (message.slice(0, 6) == "account") {
        }

        // ws.send(`ECHO: ${message}`, (err) => {
        //     if (err) {
        //         console.log(`[SERVER] error: ${err}`)
        //     }
        // })

        if (message.slice(0, 7) == "movement") {
            // broadcast message to each client apart from sending client 
            wss.clients.forEach(function each(client) { // run a forEach loop over each connected client
                // app.clients.forEach(function each(client) {
                // make sure that client is connected and socket is open
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message) // broadcast message
                }
            })
        }
    })

    ws.on('close', function disconnection(message) { // listen for disconnection event
        // console.log(`[SERVER] Client ${token} disconnects`)
        console.log(`[SERVER] Client disconnects`)
    })
})*/

var wss = expressWs.getWss('/')

app.use(function (req, res, next) { // listen for a connection on newly initialised WebSocket server
    const { query: { token } } = url.parse(req.url, true)
    if (token != "unknown") { // only show player message
        console.log(`[SERVER] Client ${token} connects`)
    }
    // console.log(`[SERVER] Client ${token} connects`)
    return next()
})

let xxxyyy = "" // all players' position

app.ws('/', function (ws, req) {
    const { query: { token } } = url.parse(req.url, true)
    // console.log(`[SERVER] Client connects`)

    ws.on('message', function incoming(message) {
        console.log(`[SERVER] Received ${message} from client ${token}`)
        // console.log(message)

        // account type message
        if (message.slice(0, 7) == "account") {
            // console.log("login")
            const username = message.split(" ")[1]
            const password = message.split(" ")[2]

            db.model.Account.findOne({ // find username in database
                where: { username: username }
            }).then(res => { // if find same username
                // console.log(res.get({ plain: true }))
                if (password == res.password) { // if password is correct
                    if (res.status == "logout") { // if account hasn't login yet
                        console.log(`[SERVER] Confirming ${username} login...`)
                        updateStatusLogin(username)
                        // send player identification to client
                        db.model.Account.findAll({
                            raw: true
                        }).then(res2 => {
                            xxxyyy = res2[0].x + " " + res2[0].y + ","
                                + res2[1].x + " " + res2[1].y + ","
                                + res2[2].x + " " + res2[2].y + ","
                                + res2[3].x + " " + res2[3].y
                            // console.log(res[0].x, res[0].y, res[1].x, res[1].y, res[2].x, res[2].y, res[3].x, res[3].y)
                            // console.log(xxxyyy)
                            ws.send("Verified " + username + " " + res.character + " " + res.x + " " + res.y + " & " + xxxyyy)
                        })
                    } else if (res.status == "login") { // if account has been login
                        console.log(`[SERVER] Account ${username} has been used...`)
                        ws.send("Denied") // deny to send player identification to client
                    }
                } else {
                    console.log(`[SERVER] Wrong password...`)
                    ws.send("Denied") // deny to send player identification to client
                }
            }).catch(err => { // if username doesn't exist in database
                // console.log(err)
                console.log(`[SERVER] Wrong account...`)
                ws.send("Denied") // deny to send player identification to client
            })
        }

        // movement type message
        if (message.slice(0, 8) == "movement") {
            // console.log("move")
            x = message.split(" ")[1] // value will be : "x,"
            y = message.split(" ")[2] // value will be : "y,"
            // console.log(x, y)
            x = x.substring(0, x.length - 1) // remove "," from "x,"
            y = y.substring(0, y.length - 1) // remove "," from "y,"
            // console.log(x, y)
            updateXY(token, x, y) // save current player's position in server
            wss.clients.forEach(function each(client) {
                if (client !== ws) {
                    db.model.Account.findOne({ // find username in database
                        where: { username: token }
                    }).then(res => { // if find same username
                        client.send(message + ", " + `${token}` + ", " + res.character) // broadcast message
                    })

                    // client.send(message + ", " + `${token}`) // broadcast message
                }
            })
        }
    })

    ws.on('close', function disconnection(ws, req) { // listen for disconnection event
        updateStatusLogout(token)
        if (token != "unknown") { // only show player message
            console.log(`[SERVER] Client ${token} disconnects`)
        }
        // console.log(`[SERVER] Client ${token} disconnects`)
    })
})

app.listen(port, function () {
    console.log(`[SERVER] is listening on ${port}`)
})

/*server.listen(port, function () {
    console.log(`[SERVER] is listening on ${port}`)
})*/
