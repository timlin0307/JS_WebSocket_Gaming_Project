class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects

        this.walls = config.walls || {}

        this.lowerImage = new Image()
        this.lowerImage.src = config.lowerSrc // lower than characters

        this.upperImage = new Image()
        this.upperImage.src = config.upperSrc // upper than characters

        this.isCutscenePlaying = false
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            0 + utils.withGrid(10.5) - cameraPerson.x,
            0 + utils.withGrid(6) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            0 + utils.withGrid(10.5) - cameraPerson.x,
            0 + utils.withGrid(6) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction)
        return this.walls[`${x}, ${y}`] || false
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key]
            object.id = key

            // todo : determine if this object should actually mount
            object.mount(this)
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true

        // start a loop of async events
        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            // await each one
            await eventHandler.init()
        }

        this.isCutscenePlaying = false
    }

    addWall(x, y) {
        this.walls[`${x}, ${y}`] = true
    }

    removeWall(x, y) {
        delete this.walls[`${x}, ${y}`]
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY)
        const { x, y } = utils.nextPosition(wasX, wasY, direction)
        this.addWall(x, y)
    }
}

window.OverworldMaps = {
    DemoRoom: {
        id: "DemoRoom",
        lowerSrc: "./images/maps/DemoLower.png",
        upperSrc: "./images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6)
            }),
            npc1: new Person({
                isPlayerControlled: false,
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "./images/characters/people/npc1.png",
                behaviorLoop: [
                    { type: "walk", direction: "left" },
                    { type: "walk", direction: "up" },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "down" }
                ]
            })
        },
        walls: {
            // small square
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(8, 7)]: true,
            // up wall
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(6, 3)]: true,
            [utils.asGridCoord(6, 2)]: true,
            [utils.asGridCoord(7, 1)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(8, 3)]: true,
            [utils.asGridCoord(8, 2)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(10, 3)]: true,
            // down wall
            [utils.asGridCoord(1, 10)]: true,
            [utils.asGridCoord(2, 10)]: true,
            [utils.asGridCoord(3, 10)]: true,
            [utils.asGridCoord(4, 10)]: true,
            [utils.asGridCoord(5, 11)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(7, 10)]: true,
            [utils.asGridCoord(8, 10)]: true,
            [utils.asGridCoord(9, 10)]: true,
            [utils.asGridCoord(10, 10)]: true,
            // left wall
            [utils.asGridCoord(0, 4)]: true,
            [utils.asGridCoord(0, 5)]: true,
            [utils.asGridCoord(0, 6)]: true,
            [utils.asGridCoord(0, 7)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 9)]: true,
            // right wall
            [utils.asGridCoord(11, 4)]: true,
            [utils.asGridCoord(11, 5)]: true,
            [utils.asGridCoord(11, 6)]: true,
            [utils.asGridCoord(11, 7)]: true,
            [utils.asGridCoord(11, 8)]: true,
            [utils.asGridCoord(11, 9)]: true
        }
    },
    /*Kitchen: {
        id: "Kitchen",
        lowerSrc: "./images/maps/KitchenLower.png",
        upperSrc: "./images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5)
            }),
            npc2: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                src: "./images/characters/people/npc2.png"
            }),
            npc3: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "./images/characters/people/npc3.png"
            })
        }
    },
    Street: {
        id: "Street",
        lowerSrc: "./images/maps/StreetLower.png",
        upperSrc: "./images/maps/StreetUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(30),
                y: utils.withGrid(10)
            })
        }
    }*/
}