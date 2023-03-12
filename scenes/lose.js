import k from "../kaboom"

k.scene("lose", ({score}) => {
    k.add([
        k.text("You lose :D", 24),
        k.origin("center"),
        k.color(255,0,0),
        k.pos(k.width() / 2, k.height() / 2 - 150),
    ])
    k.add([
        k.text(`Score: ${score}`, 24), 
        k.origin("center"), 
        k.pos(k.width() / 2, k.height() / 2 - 25)
    ])
    const retry = k.add([
        k.text("Try Again", 24),
        k.pos(k.width() / 2, k.height() / 2 + 120),
        k.origin("center"),
        // k.layer("ui"),
        // k.scale(1),
        k.color(1, 255, 1),
        k.outline(10, k.color(255, 255, 255)),
        k.area({cursor: "pointer"})
    ])


    retry.onClick(() => {
        k.go("main")
    })
})
