import kaboom from "kaboom"
//For intellisense
const k = kaboom({
    global: false,
    background: [134, 135, 247],
    debug: true
})

k.loadSprite("aho", "me.png")
k.loadSprite("brick", "brick.png")
k.loadSprite("unstopped", "unstopped-brick.png")
k.loadSprite("question", "question-brick.png")
k.loadSprite("enemy", "enemy.png")
k.loadSprite("heart", "heart.png")
k.loadSprite("flower", "flower.png")
k.onKeyPress("f", () => {
    k.fullscreen(!k.isFullscreen())
})

export default k