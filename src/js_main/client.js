let ws
let client_name = "unknown"

function connect() {
    // check if there's a connection already for client if there is
    // a connection, go ahead and null connection and then close it
    if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null
        ws.close()
    }

    // if client doesn't have a connection, initialise a new connection to server
    // var client_name = "player"
    ws = new WebSocket("ws://localhost:3000/?token=" + client_name) // create a socket

    ws.onopen = function () { // open event
        console.log("Connection open in websocket...")
    }

    ws.onclose = function () { // close event
        console.log("Connection close in websocket...")

        // if connection closes, null that particular connection
        ws = null
    }

    ws.onerror = function () { // error event
        console.log("Connection error in websocket...")
    }

    ws.onmessage = function (message) { // response to onmessage event
        // can process data received from server
        console.log(message.data)

        // get player identification from server
        if (message.data.split(" ")[0] == "Verified") {
            client_name = message.data.split(" ")[1]
            connect() // re-connect WebSocket to have a token on the website url
        }
    }
}

function ws_send(message) {
    // check if there's currently not an active WebSocket connection
    // avoid trying to send a message if there's no WebSocket connection
    if (!ws) {
        console.log("No WebSocket connection...") // if there isn't a WebSocket connection
        return
    }

    // send a message to server
    if (message != "") {
        ws.send(message)
    }
}

connect()