class Person extends GameObject {
    constructor(config) {
        super(config) // get element from outter class
        this.movingProgressRemaining = 0

        this.isPlayerControlled = config.isPlayerControlled || false

        // this.direction = "right"

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }
    }

    update(state) {
        this.updatePosition()
        this.updateSprite(state)

        if (this.isPlayerControlled &&
            this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow
            // console.log(state.map.isSpaceTaken(this.x, this.y, this.direction))
            // ws_send(this.x + ", " + this.y + ", " + this.direction)
            this.movingProgressRemaining = 16
        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change
            // ws_send(this.x + ", " + this.y + ", " + this.direction)
            this.movingProgressRemaining -= 1
            if (this.movingProgressRemaining == 0) {
                ws_send(this.x + ", " + this.y + ", " + this.direction)
            }
        }
    }

    updateSprite(state) {
        if (this.isPlayerControlled &&
            this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-" + this.direction)
            return
        }
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction)
        }
    }
}