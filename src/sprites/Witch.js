import Phaser from 'phaser'
import CONFIG from '../config.js'

class WitchSprite extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'witch', 1)

    // Set up depth sorting
    this.depth = y
    this.lastY = y

    if (!WitchSprite.animInitialized) {
      WitchSprite.setupAnim(scene)
    }

    // Enable physics
    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.body.setAllowGravity(false)
    this.body.setCollideWorldBounds(true)

    // Adjust the body size
    this.body.setSize(16, 10)
    this.body.setOffset(8, 22)

    // Add self to given scene
    scene.add.existing(this)

    // Iniatalize facing directions to play correct animations
    this.facingForward = true
    this.facingBackward = false
    this.facingRight = false
    this.facingLeft = false

    // Inventory -- Store picked up item information
    this.inventory = new Array(3)
    this.inventory = ['null', 'null', 'null']
  }

  move (x, y) {
    if (x > 0) {
      this.anims.play('witchWalkRight', true)
      this.facingRight = true
      this.facingForward = false
      this.facingBackward = false
    } else if (x < 0) {
      this.anims.play('witchWalkLeft', true)
      this.facingRight = false
      this.facingLeft = true
      this.facingForward = false
      this.facingBackward = false
    } else {
      if (y < 0 && x === 0) {
        this.anims.play('witchWalkBack', true)
        this.facingForward = false
        this.facingBackward = true
      } else if (y > 0 && x === 0) {
        this.anims.play('witchWalkFront', true)
        this.facingForward = true
      } else {
        if (this.facingForward) {
          this.anims.play('witchIdleFront', true)
        } else if (this.facingBackward) {
          this.anims.play('witchIdleBack', true)
        } else if (this.facingRight) {
          this.anims.play('witchIdleRight', true)
        } else if (this.facingLeft) {
          this.anims.play('witchIdleLeft', true)
        }
      }
    }
    this.setVelocity(x * CONFIG.WALK_SPEED, y * CONFIG.WALK_SPEED)
  }

  update () {
    if (this.y !== this.lastY) {
      this.depth = this.y
      this.lastY = this.y
    }
  }
}

WitchSprite.animInitialized = false
WitchSprite.setupAnim = (scene) => {
  scene.anims.create({
    key: 'witchIdleFront',
    frameRate: 4,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 0, end: 10 })
  })

  scene.anims.create({
    key: 'witchWalkFront',
    frameRate: 7,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 11, end: 18 })
  })

  scene.anims.create({
    key: 'witchIdleBack',
    frameRate: 4,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 22, end: 26 })
  })

  scene.anims.create({
    key: 'witchWalkBack',
    frameRate: 7,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 33, end: 40 })
  })

  scene.anims.create({
    key: 'witchIdleRight',
    frameRate: 4,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 44, end: 50 })
  })

  scene.anims.create({
    key: 'witchWalkRight',
    frameRate: 7,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 55, end: 61 })
  })

  scene.anims.create({
    key: 'witchIdleLeft',
    frameRate: 4,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 66, end: 72 })
  })

  scene.anims.create({
    key: 'witchWalkLeft',
    frameRate: 7,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 79, end: 83 })
  })

  WitchSprite.animInitialized = true
}

export default WitchSprite
