class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    // continue fire every single frame
    startGameLoop() {
        const step = () => {
            // clear off the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // establish the camera person
            // if (count == 1) {
            //     const cameraPerson = this.map.gameObjects.hero;
            //     count++;
            // } else if (count == 2) {
            const cameraPerson = this.map.gameObjects.npc1;
            //     count++;
            // }
            // const cameraPerson = this.map.gameObjects.npc1

            // update all objects
            Object.values(this.map.gameObjects).forEach((object) => {
                // console.log(object.playerToken)
                if (object.playerToken != behavior.player && object.isPlayerControlled) {
                    object.update({
                        arrow: this.directionInput.direction,
                        map: this.map,
                    });
                } else {
                    object.update({
                        arrow: behavior.direction,
                        map: this.map,
                    });
                    // console.log(behavior)
                    behavior = { player: "", direction: "" };
                }
            });

            // draw lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // draw game objects
            /*Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })*/
            Object.values(this.map.gameObjects)
                .sort((a, b) => {
                    return a.y - b.y;
                })
                .forEach((object) => {
                    object.sprite.draw(this.ctx, cameraPerson);
                });

            // draw upper layer
            this.map.drawUpperImage(this.ctx, cameraPerson);

            if (!this.map.isPaused) {
                // console.log("stepping!")
                // requestAnimationFrame(() => {
                //     step()
                // })
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        step();
                    });
                }, 1); // if lower, other player control better
            }
        };
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        // this.directionInput.direction // return direction

        // kick off the game
        this.startGameLoop();

        /*this.map.startCutscene([
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "npc1", type: "walk", direction: "left" },
            { who: "npc1", type: "walk", direction: "left" },
            { who: "npc1", type: "stand", direction: "up", time: 800 }
        ])*/
    }
}
