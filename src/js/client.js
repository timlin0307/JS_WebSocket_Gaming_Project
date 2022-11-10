let ws

// check if there's a connection already for client if there is
// a connection, go ahead and null connection and then close it
if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null
    ws.close()
}

// if client doesn't have a connection, initialise a new connection to server
ws = new WebSocket('ws://localhost:3000'); // create a socket

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

ws.onmessage = function (msg) { // response to onmessage event
    // can process data received from server

    console.log(msg)
}

function ws_send() {
    // check if there's currently not an active WebSocket connection
    // avoid trying to send a message if there's no web socket connection
    if (!ws) {
        console.log("No WebSocket connection..."); // if there isn't a WebSocket connection
        return;
    }

    // send a number to server
    ws.send(document.getElementById('input_msg').value)
}