class GameObject {
    constructor(config) {
        this.x = config.x || 0 // default 0
        this.y = config.y || 0 // default 0
        this.direction = config.direction || "down"
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./images/characters/people/hero.png",
        })
    }

    update() {
        // ws_send(this.x + ", " + this.y + ", " + this.direction)
    }
}