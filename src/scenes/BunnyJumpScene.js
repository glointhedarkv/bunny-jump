import Phaser from "phaser"

var platforms, player

export default class BunnyJumpScene extends Phaser.Scene {
    constructor() {
      super('bunny-jump-scene')
    }
  
    preload() {
      this.load.image('background', 'images/bg_layer1.png')
      this.load.image('platform', 'images/ground_grass.png')
      this.load.image('carrot', 'images/carrot.png')
      this.load.image('bunny_jump', 'images/bunny1_jump.png')
      this.load.image('bunny_stand', 'images/bunny1_stand.png')
    }
  
    create() {
      this.add.image(240, 320, 'background')

      this.platforms = this.physics.add.staticGroup()
      for (let i = 0; i < 5; i++) {
        const x = Phaser.Math.Between(80, 400)
        const y = 150 * i

        const platformChild = this.platforms.create(x, y, 'platform')
        platformChild.setScale(0.5)
        platformChild.refreshBody()
        const body = platformChild.body
        body.updateFromGameObject()
      }

      this.player = this.physics.add.sprite(240, 320, 'bunny_stand')
      .setScale(0.5)
      this.physics.add.collider(this.platforms, this.player)

    }

    update() {
      const touchingDown = this.player.body.touching.down

      if (touchingDown) {
        this.player.setVelocity(-300)
        this.player.setTexture('bunny_jump')
      }
    }
  }