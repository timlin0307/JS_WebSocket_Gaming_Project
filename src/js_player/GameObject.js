class GameObject {
    constructor(config) {
        this.id = null
        this.isMounted = false
        this.x = config.x || 0 // default 0
        this.y = config.y || 0 // default 0
        this.direction = config.direction || "down"
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./images/characters/people/hero.png",
        })

        this.behaviorLoop = config.behaviorLoop || []
        this.behaviorLoopIndex = 0
    }

    mount(map) {
        // console.log("mounting!")
        this.isMounted = true
        map.addWall(this.x, this.y)

        // if we have a behavior, kick off after a short delay
        setTimeout(() => {
            this.doBehaviorEvent(map)
        }, 10)
    }

    update() {
        // ws_send(this.x + ", " + this.y + ", " + this.direction)
    }

    async doBehaviorEvent(map) {
        // console.log("doBehaviorEvent")
        // don't do anything if there is a more important cutscene
        // or I don't have config to do anything anyway
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
            return
        }
        // console.log(this.behaviorLoop)

        // setting up our event with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
        eventConfig.who = this.id

        // create an event instance out of our next event config
        const eventHandler = new OverworldEvent({ map, event: eventConfig })
        await eventHandler.init()

        // setting the next event to fire
        this.behaviorLoopIndex += 1
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0
        }
        // behavior.shift()

        // do it again
        this.doBehaviorEvent(map)
    }
}