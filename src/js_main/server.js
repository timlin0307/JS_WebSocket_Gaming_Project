const express = require('express') // import express module
// const expressWs = require('express-ws') // import express-ws module
const http = require('http') // initialise a server
const WebSocket = require('ws') // import WebSocket module
const url = require('url')
const db = require("./db")

const port = 3000
const server = http.createServer(express) // pass express in server
const wss = new WebSocket.Server({ server }) // assign new WebSocket
/*const wss = new WebSocket.Server({ // instantiate
    port: port
})*/

/*const app = express()
expressWs(app) // mix WebSocket service with app (add ws method for app)
app.get('/', function (req, res, next) {
    res.send("server on...")
})*/

console.log("setup server...")

// listen for a connection on newly initialised WebSocket server
wss.on('connection', function connection(ws, req) {
    // app.ws('connection', function connection(ws, req) { // claim WebSocket server
    const { query: { token } } = url.parse(req.url, true)

    console.log(`[SERVER] Client ${token} connects`)

    ws.on('message', function incoming(message) { // listen for a message from client
        console.log(`[SERVER] Received ${message} from client ${token}`)

        /*ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`)
            }
        })*/

        // broadcast message to each client apart from sending client 
        wss.clients.forEach(function each(client) { // run a forEach loop over each connected client
            // app.clients.forEach(function each(client) {
            // make sure that client is connected and socket is open
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message) // broadcast message
            }
        })
    })

    ws.on('close', function disconnection(message) { // listen for disconnection event
        console.log(`[SERVER] Client ${token} disconnects`)
    })
})

server.listen(port, function () {
    console.log(`[SERVER] is listening on ${port}`)
})
/*app.listen(port, function () {
    console.log(`[SERVER] is listening on ${port}`)
})*/
