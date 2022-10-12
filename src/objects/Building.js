import Phaser from 'phaser'

class BuildingSprite extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, texture, name) {
    super(scene, x, y, texture, 1)
    this.name = name

    // Set up animation
    if (!BuildingSprite.animInitialized) {
      BuildingSprite.setupAnim(scene)
    }

    // Enable physics
    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.body.setAllowGravity(false)
    this.body.setImmovable(true)

    if (this.name === 'farmHouse') {
      // Adjust the body size
      this.body.setSize(118, 110)
      this.body.setOffset(6, 18)

      this.anims.play('buildingIdle', true)
    }

    if (this.name === 'sellingBin') {
      this.body.setSize(30, 24)
      this.body.setOffset(2, 8)
    }

    // Add self to given scene
    scene.add.existing(this)
  }
}

BuildingSprite.animInitialized = false
BuildingSprite.setupAnim = (scene) => {
  scene.anims.create({
    key: 'buildingIdle',
    frameRate: 5,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('farmHouse', { start: 0, end: 10 })
  })

  BuildingSprite.animInitialized = true
}

export default BuildingSprite
