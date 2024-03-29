class DirectionInput {
    constructor(config) {
        this.heldDirection = []

        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right"
        }

    }

    get direction() {
        return this.heldDirection[0]
    }

    init() {
        document.addEventListener("keydown", event => {
            // console.log(event.code)
            const dir = this.map[event.code]
            if (dir && this.heldDirection.indexOf(dir) === -1) {
                this.heldDirection.unshift(dir)
                // console.log(this.heldDirection)
                // ws_send(this.heldDirection)
            }
        })

        document.addEventListener("keyup", event => {
            const dir = this.map[event.code]
            const index = this.heldDirection.indexOf(dir)
            if (index > -1) {
                this.heldDirection.splice(index, 1)
                // console.log(this.heldDirection)
                // ws_send(this.heldDirection)
            }
        })
    }
}