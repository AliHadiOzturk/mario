import k from "../kaboom"

k.scene("lose", ({score}) => {
    k.add([
        k.text("You lose :D", 24),
        k.origin("center"),
        k.color(255,0,0),
        k.pos(k.width() / 2, k.height() / 2 - 150),
    ])
    scores(score)

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

const scores = (score) => {
    const heartLabel = k.add([
        k.text(`:${score.heart}`),
        // k.sprite("heart"),
        
        k.pos(k.width() / 2, k.height() / 2 - 75),
        k.scale(0.5),
        k.layer("ui"),
        {
            value: score.heart
        }
    ])
    
    const heartIcon = k.add([
        k.sprite("heart"),
        k.pos(k.width() / 2 - 30, k.height() / 2 - 75),
        k.scale(1.7)
    ])

    const flowerLabel = k.add([
        k.text(`:${score.flower}`),
        // k.sprite("flower"),
        
        k.pos(k.width() / 2, k.height() / 2 - 25),
        k.scale(0.5),
        k.layer("ui"),
        {
            value: score.flower
        }
    ])

    const flowerIcon = k.add([
        k.sprite("flower"),
        k.pos(k.width() / 2 - 30, k.height() / 2 - 25),
        k.scale(1.7)
    ])
}
