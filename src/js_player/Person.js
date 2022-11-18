class Person extends GameObject {
    constructor(config) {
        super(config) // get element from outter class
        this.movingProgressRemaining = 0
        this.isStanding = false

        this.isPlayerControlled = config.isPlayerControlled || false

        // this.direction = "right"

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }

        this.playerToken = config.playerToken || "player1"
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition()
        } else {
            // more cases for starting to walk will come here

            // case : we're keyboard ready and have arrow pressed
            // if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
            if (!state.map.isCutscenePlaying && state.arrow) {
                // this.direction = state.arrow
                // console.log(state.map.isSpaceTaken(this.x, this.y, this.direction))
                // this.movingProgressRemaining = 16
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }

            this.updateSprite(state)
        }

        /*this.updateSprite(state)
        if (this.isPlayerControlled &&
            this.movingProgressRemaining === 0 && state.arrow) {
            // this.direction = state.arrow
            // console.log(state.map.isSpaceTaken(this.x, this.y, this.direction))
            // this.movingProgressRemaining = 16
            this.startBehavior(state, {
                type: "walk",
                direction: state.arrow
            })
        }*/
    }

    startBehavior(state, behavior) {
        // set charactor direction to whatever behavior has
        this.direction = behavior.direction
        if (behavior.type === "walk") {
            // stop here if space is not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                behavior.retry && setTimeout(() => { // if hero block npc
                    this.startBehavior(state, behavior)
                }, 10)

                return
            }

            // ready to walk!
            state.map.moveWall(this.x, this.y, this.direction)
            this.movingProgressRemaining = 16
            this.updateSprite(state)
        }

        if (behavior.type === "stand") {
            this.isStanding = true
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
                this.isStanding = false
            }, behavior.time)
        }
    }

    updatePosition() {
        // if (this.movingProgressRemaining > 0) {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change
        this.movingProgressRemaining -= 1
        // }

        if (this.movingProgressRemaining === 0) {
            // we finished the walk!

            // const event = new CustomEvent("PersonWalkingComplete", {
            //     detail: {
            //         whoId: this.id
            //     }
            // })
            // document.dispatchEvent(event)

            if (this.isPlayerControlled) {
                ws_send("movement " + this.x + ", " + this.y + ", " + this.direction)
            }

            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction)
            return
        }
        this.sprite.setAnimation("idle-" + this.direction)

        // if (this.isPlayerControlled &&
        //     this.movingProgressRemaining === 0 && !state.arrow) {
        //     this.sprite.setAnimation("idle-" + this.direction)
        //     return
        // }
        // if (this.movingProgressRemaining > 0) {
        //     this.sprite.setAnimation("walk-" + this.direction)
        // }
    }
}
