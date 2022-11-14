class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.map = null
    }

    // continue fire every single frame
    startGameLoop() {
        const step = () => {

            // clear off the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            // establish the camera person
            const cameraPerson = this.map.gameObjects.hero
            // const cameraPerson = this.map.gameObjects.npc1

            // update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction
                })
            })

            // draw lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson)

            // draw game objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            // draw upper layer
            this.map.drawUpperImage(this.ctx, cameraPerson)

            if (!this.map.isPaused) {
                // console.log("stepping!")
                // requestAnimationFrame(() => {
                //     step()
                // })
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        step()
                    })
                }, 15)
            }
        }
        step()
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom)

        this.directionInput = new DirectionInput()
        this.directionInput.init()
        // this.directionInput.direction // return direction

        // kick off the game
        this.startGameLoop()
    }
}