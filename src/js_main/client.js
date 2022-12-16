var game_container = document.getElementById("game-container")
var center = document.getElementById("center")

let ws
let client_name = "unknown"
let behavior1 = { player: "", direction: "" }
let behavior2 = { player: "", direction: "" }
let startGame = false

function connect() {
    // check if there's a connection already for client if there is
    // a connection, go ahead and null connection and then close it
    if (ws) { // avoid re-run connect() function but having two instant socket connection
        ws.onerror = ws.onopen = ws.onclose = null
        ws.close() // close previous socket connection
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
        if (message.data.split(" ")[0] == "Verified") { // if client is verified by server
            client_name = message.data.split(" ")[1] // update current token
            xx = parseInt(message.data.split(" ")[3], 10) / 16 // get main player's position : current x
            yy = parseInt(message.data.split(" ")[4], 10) / 16 // get main player's position : current y
            xxxyyy = message.data.split("& ")[1]
            // console.log("Before login : ", OverworldMaps.DemoRoom.gameObjects.hero.playerToken, OverworldMaps.DemoRoom.gameObjects.hero.src)
            hero_xx = parseInt(xxxyyy.split(",")[0].split(" ")[0], 10) / 16 // get main hero's position : current x
            hero_yy = parseInt(xxxyyy.split(",")[0].split(" ")[1], 10) / 16 // get main hero's position : current y
            // console.log(xxxyyy.split(",")[0].split(" ")[0], xxxyyy.split(",")[0].split(" ")[1])
            npc1_xx = parseInt(xxxyyy.split(",")[1].split(" ")[0], 10) / 16 // get main npc1's position : current x
            npc1_yy = parseInt(xxxyyy.split(",")[1].split(" ")[1], 10) / 16 // get main npc1's position : current y
            // console.log(xxxyyy.split(",")[1].split(" ")[0], xxxyyy.split(",")[1].split(" ")[1])
            npc2_xx = parseInt(xxxyyy.split(",")[2].split(" ")[0], 10) / 16 // get main npc2's position : current x
            npc2_yy = parseInt(xxxyyy.split(",")[2].split(" ")[1], 10) / 16 // get main npc2's position : current y
            // console.log(xxxyyy.split(",")[2].split(" ")[0], xxxyyy.split(",")[2].split(" ")[1])
            direct = message.data.split("& ")[2]
            hero_direction = direct.split(",")[0] // get main hero's direction
            // console.log(direct.split(",")[0])
            npc1_direction = direct.split(",")[1] // get main hero's direction
            // console.log(direct.split(",")[1])
            npc2_direction = direct.split(",")[2] // get main hero's direction
            // console.log(direct.split(",")[2])
            if (client_name == "player1") {
                OverworldMaps.DemoRoom.gameObjects.hero.playerToken = client_name
                OverworldMaps.DemoRoom.gameObjects.hero.x = utils.withGrid(xx)
                OverworldMaps.DemoRoom.gameObjects.hero.y = utils.withGrid(yy)
                OverworldMaps.DemoRoom.gameObjects.npc1.x = utils.withGrid(npc1_xx)
                OverworldMaps.DemoRoom.gameObjects.npc1.y = utils.withGrid(npc1_yy)
                OverworldMaps.DemoRoom.gameObjects.npc2.x = utils.withGrid(npc2_xx)
                OverworldMaps.DemoRoom.gameObjects.npc2.y = utils.withGrid(npc2_yy)
                OverworldMaps.DemoRoom.gameObjects.hero.direction = hero_direction
                OverworldMaps.DemoRoom.gameObjects.npc1.sprite.currentAnimation = "idle-" + npc1_direction
                OverworldMaps.DemoRoom.gameObjects.npc2.sprite.currentAnimation = "idle-" + npc2_direction
            }
            if (client_name == "player2") {
                OverworldMaps.DemoRoom.gameObjects.npc1.playerToken = client_name
                OverworldMaps.DemoRoom.gameObjects.hero.x = utils.withGrid(hero_xx)
                OverworldMaps.DemoRoom.gameObjects.hero.y = utils.withGrid(hero_yy)
                OverworldMaps.DemoRoom.gameObjects.npc1.x = utils.withGrid(xx)
                OverworldMaps.DemoRoom.gameObjects.npc1.y = utils.withGrid(yy)
                OverworldMaps.DemoRoom.gameObjects.npc2.x = utils.withGrid(npc2_xx)
                OverworldMaps.DemoRoom.gameObjects.npc2.y = utils.withGrid(npc2_yy)
                OverworldMaps.DemoRoom.gameObjects.hero.sprite.currentAnimation = "idle-" + hero_direction
                OverworldMaps.DemoRoom.gameObjects.npc1.direction = npc1_direction
                OverworldMaps.DemoRoom.gameObjects.npc2.sprite.currentAnimation = "idle-" + npc2_direction
            }
            if (client_name == "player3") {
                OverworldMaps.DemoRoom.gameObjects.npc2.playerToken = client_name
                OverworldMaps.DemoRoom.gameObjects.hero.x = utils.withGrid(hero_xx)
                OverworldMaps.DemoRoom.gameObjects.hero.y = utils.withGrid(hero_yy)
                OverworldMaps.DemoRoom.gameObjects.npc1.x = utils.withGrid(npc1_xx)
                OverworldMaps.DemoRoom.gameObjects.npc1.y = utils.withGrid(npc1_yy)
                OverworldMaps.DemoRoom.gameObjects.npc2.x = utils.withGrid(xx)
                OverworldMaps.DemoRoom.gameObjects.npc2.y = utils.withGrid(yy)
                OverworldMaps.DemoRoom.gameObjects.hero.sprite.currentAnimation = "idle-" + hero_direction
                OverworldMaps.DemoRoom.gameObjects.npc1.sprite.currentAnimation = "idle-" + npc1_direction
                OverworldMaps.DemoRoom.gameObjects.npc2.direction = npc2_direction
            }
            startGame = true // to re-run a function in overworldInit()
            // OverworldMaps.DemoRoom.gameObjects.hero.src = "./images/characters/people/" + message.data.split(" ")[2] + ".png"
            // console.log("After login : ", OverworldMaps.DemoRoom.gameObjects.hero.playerToken, OverworldMaps.DemoRoom.gameObjects.hero.src)
            connect() // re-connect WebSocket to have a token on the website url
            overworldInit()

            // show game scene
            game_container.style.display = "block"
            game_container.visibility = "visible"
            center.style.display = "none"
            center.visibility = "hidden"

        } else if (message.data == "Denied") { // if server refuse client's connection
            window.location.reload(true)  // reload client website
        }

        // get other players movement
        if (message.data.slice(0, 8) == "movement") {
            if (client_name == "player1") {
                if (message.data.split(", ")[3] == "player2") {
                    behavior1 = { player: message.data.split(", ")[3], direction: message.data.split(", ")[2] }
                    OverworldMaps.DemoRoom.gameObjects.npc1.playerToken = behavior1.player
                    // OverworldMaps.DemoRoom.gameObjects.npc1.direction = behavior1.direction
                }
                if (message.data.split(", ")[3] == "player3") {
                    behavior2 = { player: message.data.split(", ")[3], direction: message.data.split(", ")[2] }
                    OverworldMaps.DemoRoom.gameObjects.npc2.playerToken = behavior2.player
                    // OverworldMaps.DemoRoom.gameObjects.npc2.direction = behavior2.direction
                }
            }
            if (client_name == "player2") {
                if (message.data.split(", ")[3] == "player1") {
                    behavior1 = { player: message.data.split(", ")[3], direction: message.data.split(", ")[2] }
                    OverworldMaps.DemoRoom.gameObjects.hero.playerToken = behavior1.player
                    // OverworldMaps.DemoRoom.gameObjects.hero.direction = behavior1.direction
                }
                if (message.data.split(", ")[3] == "player3") {
                    behavior2 = { player: message.data.split(", ")[3], direction: message.data.split(", ")[2] }
                    OverworldMaps.DemoRoom.gameObjects.npc2.playerToken = behavior2.player
                    // OverworldMaps.DemoRoom.gameObjects.npc2.direction = behavior2.direction
                }
            }
            if (client_name == "player3") {
                if (message.data.split(", ")[3] == "player1") {
                    behavior1 = { player: message.data.split(", ")[3], direction: message.data.split(", ")[2] }
                    OverworldMaps.DemoRoom.gameObjects.hero.playerToken = behavior1.player
                    // OverworldMaps.DemoRoom.gameObjects.hero.direction = behavior1.direction
                }
                if (message.data.split(", ")[3] == "player2") {
                    behavior2 = { player: message.data.split(", ")[3], direction: message.data.split(", ")[2] }
                    OverworldMaps.DemoRoom.gameObjects.npc1.playerToken = behavior2.player
                    // OverworldMaps.DemoRoom.gameObjects.npc1.direction = behavior1.direction
                }
            }
            // behavior1 = { player: message.data.split(", ")[3], direction: message.data.split(", ")[2] }
            // console.log("Before login : ", OverworldMaps.DemoRoom.gameObjects.npc1.playerToken, OverworldMaps.DemoRoom.gameObjects.npc1.src)
            // OverworldMaps.DemoRoom.gameObjects.npc1.playerToken = behavior1.player
            // OverworldMaps.DemoRoom.gameObjects.npc1.src = "./images/characters/people/" + message.data.split(" ")[4] + ".png"
            // console.log("After login : ", OverworldMaps.DemoRoom.gameObjects.npc1.playerToken, OverworldMaps.DemoRoom.gameObjects.npc1.src)
            // console.log(behavior)
            // console.log(window.OverworldMaps)
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