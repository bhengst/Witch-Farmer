import Phaser from 'phaser'
import CONFIG from '../config.js'

class Item extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, texture, name, type) {
    super(scene, x, y, texture, 1)
    this.name = name
    this.texture = texture
    this.value = 0
    this.type = type

    // Enable physics
    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.body.setAllowGravity(false)
    this.body.setImmovable(true)

    if (this.name === 'Pumpkin') {
      this.body.setSize(20, 16)
      this.body.setOffset(7, 16)
      this.value = 125
    }

    if (this.name === 'Beans') {
      this.body.setSize(20, 32)
      this.body.setOffset(7, 0)
      this.value = 375
    }

    if (this.name === 'Berries') {
      this.body.setSize(20, 16)
      this.body.setOffset(7, 16)
      this.value = 875
    }

    if (this.name === 'FrogEggs') {
      this.body.setSize(128, 80)
      this.body.setOffset(0, 48)
      this.value = 450
    }

    if (this.name === 'FairyDust') {
      this.value = 750
    }

    if (this.name === 'GhostGoo') {
      this.value = 2100
    }

    if (this.name === 'GhostGoo' && (this.texture === 'fence_corner_top' || this.texture === 'fence_horizontal')) {
      this.body.setSize(32, 12)
      this.body.setOffset(0, 20)
    }

    if (!Item.animInitialized) {
      Item.setupAnim(scene)
    }

    // Set up animations
    if (this.name === 'Worms') {
      this.body.setSize(20, 16)
      this.body.setOffset(7, 16)
      this.anims.play('wormBin', true)
    }

    if (this.name === 'Crow') {
      this.body.setSize(20, 28)
      this.body.setOffset(7, 4)
      this.anims.play('crow', true)
    }

    if (this.name === 'Flower') {
      this.body.setSize(26, 32)
      this.body.setOffset(6, 0)
    }

    if (this.name === 'Well') {
      this.body.setSize(32, 46)
      this.body.setOffset(0, 18)
    }

    if (this.name === 'Frog1' || this.name === 'Frog3') {
      this.anims.play('frogForward')
    }

    if (this.name === 'Frog2') {
      this.anims.play('frogSideways', true)
    }

    if (this.name === 'Fairy') {
      this.anims.play('fairy', true)
    }

    if (this.name === 'Ghost1' || this.name === 'Ghost3') {
      this.anims.play('ghost1')
    }

    if (this.name === 'Ghost2') {
      this.anims.play('ghost2', true)
    }

    // Add self to given scene
    scene.add.existing(this)
  }
}

Item.animInitialized = false
Item.setupAnim = (scene) => {
  scene.anims.create({
    key: 'wormBin',
    frameRate: 5,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('worm_bin', { start: 0, end: 3 })
  })

  scene.anims.create({
    key: 'crow',
    frameRate: 5,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('crow', { start: 0, end: 16 })
  })

  scene.anims.create({
    key: 'frogForward',
    frameRate: 5,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('frogs', { start: 0, end: 10 })
  })

  scene.anims.create({
    key: 'frogSideways',
    frameRate: 5,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('frogs', { start: 11, end: 21 })
  })

  scene.anims.create({
    key: 'fairy',
    frameRate: 5,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('fairies', { start: 0, end: 7 })
  })

  scene.anims.create({
    key: 'ghost1',
    frameRate: 5,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('ghosts1', { start: 0, end: 7 })
  })

  scene.anims.create({
    key: 'ghost2',
    frameRate: 5,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('ghosts2', { start: 0, end: 3 })
  })

  Item.animInitialized = true
}

export default Item
