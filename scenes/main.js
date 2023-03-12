import k from "../kaboom"

let intervals = {
    enemy: null
}

const MOVE_SPEED = 300
const ELEMENT_COUNT = 1000

const score = {
    heart: 0,
    flower: 0
}

//TODO: Fix here. Too much workaround :)
let collidingFloor = null

k.scene("main", () => {

    k.layers(["bg", "game", "ui"], "game") 

    const player = k.add([
        k.sprite("aho"), 
        k.pos(k.width() * 0.01, 
        k.height() * 0.01), 
        k.body(), 
        k.area(),
        k.solid(),
        "player", 
        "friendly"])


    const heartLabel = k.add([
        k.text(`:${score.heart}`),
        // k.sprite("heart"),
        
        k.pos(40, 6),
        k.scale(0.5),
        k.layer("ui"),
        {
            value: score.heart
        }
    ])
    
    const heartIcon = k.add([
        k.sprite("heart"),
        k.pos(10, 10),
        k.scale(1.4)
    ])

    const flowerLabel = k.add([
        k.text(`:${score.flower}`),
        // k.sprite("flower"),
        
        k.pos(40, 50),
        k.scale(0.5),
        k.layer("ui"),
        {
            value: score.flower
        }
    ])

    const flowerIcon = k.add([
        k.sprite("flower"),
        k.pos(10, 54),
        k.scale(1.4)
    ])


    player.onUpdate(() => {
        if (player.pos.y >= k.height() + 100) {
            k.go("lose", {score: 0})
        }

        const currentCamPos = k.camPos()

        if(currentCamPos.x < player.pos.x) {
            k.camPos(player.pos.x, currentCamPos.y)
        }

        if(currentCamPos.x > player.pos.x) {
            k.camPos(player.pos.x, currentCamPos.y)
        }



        heartIcon.pos = k.vec2(k.camPos().x - (k.width() / 2.05), heartIcon.pos.y)
        heartLabel.pos = k.vec2(k.camPos().x - (k.width() / 2.05) + 30, heartLabel.pos.y)
        flowerIcon.pos = k.vec2(k.camPos().x - (k.width() / 2.05), flowerIcon.pos.y)
        flowerLabel.pos = k.vec2(k.camPos().x - (k.width() / 2.05) + 30, flowerLabel.pos.y)

    })

    k.onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(650)
        }
    })

    k.onKeyDown("left", () => {
        player.move(-MOVE_SPEED, 0)
    })

    k.onKeyDown("right", () => {
        player.move(MOVE_SPEED, 0)
    })

    const l1 = [
        "",
        generate.blocks(),
        "",
        "",
        "",
        "",
        "",
        "",
        generate.floor()
    
    ]
    
    const level = k.addLevel(l1, {
        height: 20,
        width: 20,
        // Alwasy on the bottom
        pos: k.vec2(10, k.height() - l1.length * 25),
        // pos: {x: 100, y: 100},
        "=": () => [
            k.sprite("brick"), 
            k.area(), 
            k.solid(),
            "floor"
        ],
        "$": () => [
            k.sprite("unstopped"),
            k.area(),
            k.solid()
        ],
        "*": () => [
            k.sprite("question"),
            k.area(),
            k.solid(),
            "question"
        ],
        "h": () => [
            k.sprite("heart"),
            k.area(),
            "heart"
        ],
        "f": () => [
            k.sprite("flower"),
            k.area(),
            "flower"
        ],
        "E": () => [
            k.sprite("enemy"),
            k.area({ width: 16, height: 16 }),
            k.solid(),
            k.body(),
            patrol(50),
            enemy(),
            k.origin("bot"),
            "enemy"
        ],
        // "W": () => [
        //     k.sprite("wall"),
        //     k.area(),
        //     k.solid()
        // ] 
    })

    player.onHeadbutt((obj)=> {
        if(obj.is("question")) {
            let type = "h"
            if(Boolean(Math.round(Math.random()))) {
                type = "f"
            }
            console.debug(obj)
            level.spawn(type, obj.gridPos.sub(0, 1))
            level.spawn("$", obj.gridPos.sub(0, 0))

            obj.destroy()
        }
    })

    player.onCollide("heart", (heart) => {
        score.heart++
        heartLabel.value++
        heartLabel.text = `:${score.heart}`
        heart.destroy()
    })
    player.onCollide("flower", (flower) => {
        score.flower++
        flowerLabel.value++
        flowerLabel.text = `:${score.flower}`
        flower.destroy()
    })

    player.onCollide("floor", (floor) => {
        collidingFloor = floor 

        // level.spawn("E", collidingFloor.gridPos.sub(-100, 0))
    })
    
    // game.setFullscreen(!game.isFullscreen())
    
    //TODO: Investigate why is not working ?
    // game.onLoad(() => {
    //     game.setFullscreen(true)
    // })
    
})


const patrol = (distance = 100, speed = 50, dir = 1) => {
    return {
        id: "patrol",
        require: ["pos", "area"],
        startingPos: k.vec2(0, 0),
        add() {
            this.startingPos = this.pos
            this.on("collide", (obj, side) => {
                if (side === "left" || side === "right") {
                    dir = -dir
                }
            })
        },
        update() {
            if (Math.abs(this.pos.x - this.startingPos.x) >= distance || !this.isGrounded()) {
                dir = -dir
            }
            this.move(speed * dir, 0)
        }
    }
}

const enemy = () => {
    return {
        id: "enemy",
        require: ["pos", "area", "sprite", "patrol"],
        isAlive: true,
        update() {},
        squash() {
            console.log("squashing")
            this.isAlive = false
            this.unuse("patrol")
            this.stop()
            this.frame = 2
            this.area.width = 16
            this.area.height = 8
            this.use(lifespan(0.5, {fade: 0.1}))
        }
    }
  }


const generate = {
    blocks: () => {
        const blocks = []
        for (let i = 5; i < ELEMENT_COUNT; i++) {
            const r = Math.floor(Math.random() * 50)
            if(i % r === 0) {
                if(i % 3 === 0) {
                    blocks.push("*")
                }
                else {
                    blocks.push("$")
                }
                continue
            }
    
            blocks.push(" ")
        }

        return blocks.join()
    },
    floor: () => {
        const floor = []
        for (let i = 0; i < ELEMENT_COUNT; i++) {
            const r = Math.round(Math.random() * 100)
            if (i > 10 && i % r === 0) {
                for (let k = 0; k < 5; k++) {
                    floor.push(" ")
                }
            }
    
            floor.push("=")
        }

        return floor.join("")
    }
}