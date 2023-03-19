import kaboom from "kaboom"
const k = kaboom({
    global: false,
    background: [134, 135, 247],
    debug: import.meta.env.DEV,
})

k.loadSprite("aho", "me.png")
k.loadSprite("dy", "dilara.png")
k.loadSprite("ceviz", "ceviz.png")
k.loadSprite("ares", "ares.png")
k.loadSprite("castle", "castle.png")
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