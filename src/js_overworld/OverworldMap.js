class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects

        this.lowerImage = new Image()
        this.lowerImage.src = config.lowerSrc // lower than characters

        this.upperImage = new Image()
        this.upperImage.src = config.upperSrc // upper than characters
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
            /*npc1: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "./images/characters/people/npc1.png"
            })*/
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