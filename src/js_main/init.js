/*(function () {
    // create new overworld instance
    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    })

    overworld.init()
})()*/

var overworldInit = function () {
    // create new overworld instance
    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    })

    overworld.init()
}

overworldInit()