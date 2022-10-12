import Phaser from 'phaser'

class TilemapScene extends Phaser.Scene {
  // Read the JSON from 'Tiled' and create a tilemap object
  parseTilemapJson (jsonKey) {
    this.mapData = this.make.tilemap({ key: jsonKey })

    // Adjust world bounds for physics and camera
    if (this.physics.world) {
      this.physics.world.setBounds(0, 0, this.mapData.widthInPixels, this.mapData.heightInPixels)
      // this.cameras.main.setBounds(0, 0, this.mapData.widthInPixels, this.mapData.heightInPixels)
    }
  }

  // Read tilemap data from 'Tiled' and associate with a texture key
  createTileset (tilesetName, textureKey) {
    this.tilesetData = this.mapData.addTilesetImage(tilesetName, textureKey)
  }

  // Parse tile layer from tilemap using given tileset
  createTileLayer (layerName, enableCollision) {
    const newLayer = this.mapData.createLayer(layerName, this.tilesetData)
    if (enableCollision && newLayer) {
      newLayer.setCollisionByExclusion(-1, true)
    }
    return newLayer
  }

  createObjectGroup (physicsConfig) {
    // Create a new GameObject group to hold new objects
    let objGroup = {}
    if (physicsConfig) {
      objGroup = this.physics.add.staticGroup(physicsConfig)
      if (physicsConfig.createCallbackHandler) {
        objGroup.createCallbackHandler = physicsConfig.createCallback
      }
    } else {
      objGroup = this.add.group()
    }

    // Return create group
    return objGroup
  }

  // Parse object layer from tilemap and create given sprite
  parseObjectLayer (layerName, spriteKey, spriteFrame, physicsConfig) {
    // Create a new GameObject group to hold new objects
    const objGroup = this.createObjectGroup(physicsConfig)

    // Grab array of objects from the layer
    const objectData = this.mapData.getObjectLayer(layerName).objects

    // Loop over object array and make new object for each item
    objectData.forEach((curObj) => {
      objGroup.create(
        curObj.x,
        curObj.y - curObj.height,
        spriteKey,
        spriteFrame
      ).setOrigin(0, 0)
    })

    return objGroup
  }

  parseFenceLayer (layerPrefix, keyPrefix) {
    // Pull out image and add to scene
    // const imageIndex = this.mapData.getImageIndex(layerPrefix)
    // const imageLayer = this.mapData.images[imageIndex]
    // const imageObj = this.add.image(imageLayer.x, imageLayer.y, keyPrefix)
    // imageObj.setOrigin(0, 0)

    // Create a new GameObject group to hold new objects
    const fenceGroup = this.createObjectGroup()

    // Loop over props and create sprites
    const layerData = this.mapData.getObjectLayer('Fence_Gyard')
    console.log(this.mapData.getLayer('Fence_Gyard'))
    layerData.forEach((curLay) => {
      const curImage = fenceGroup.create(
        curLay.x,
        curLay.y - curLay.height,
        curLay.name
      )
      curImage.setOrigin(0, 0)
      curImage.depth = curLay.y
    })

    // Return image and props group
    return [fenceGroup]
  }

  parseColliderObjects (layerName) {
    // Create a new GameObject group to hold new objects
    const colliderGroup = this.createObjectGroup({ physics: true })

    // Grab array of objects from the layer
    const objectData = this.mapData.getObjectLayer(layerName).objects

    // Loop over colliders and create rectangles
    objectData.forEach((curObj) => {
      const curCollider = new Phaser.GameObjects.Rectangle(
        this, curObj.x, curObj.y, curObj.width, curObj.height
      )
      curCollider.setOrigin(0, 0)

      // Handle entrances
      if (curObj.type === 'Entrance') {
        curCollider.isEntrance = true
      }

      // puts a body on it
      // Configure physics body
      this.physics.add.existing(curCollider, true)
      curCollider.body.allowGravity = false
      curCollider.body.immovable = true

      // add to group
      colliderGroup.add(curCollider)
    })

    return colliderGroup
  }
}

export default TilemapScene
