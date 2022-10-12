import TilemapScene from './TilemapScene.js'
import Phaser from 'phaser'
import CONFIG from '../config.js'
import Item from '../objects/item.js'
import Building from '../objects/Building.js'
import Witch from '../sprites/Witch.js'
import HUDScene from './HUD.js'

class FarmScene extends TilemapScene {
  preload () {
    // Load the image assets needed
    this.load.spritesheet('farmTiles', 'assets/tilesets/TileMap.png', { frameWidth: 32, frameHeight: 32 })

    // Load fillers and HUD items
    this.load.image('Inventory_Box', 'assets/ui/Inventory Box.png')
    this.load.image('witch_hold', 'assets/ui/Character_ResourceGauge.png')
    this.load.image('resource_flowers', 'assets/ui/Resource_Flowers.png')
    this.load.image('resource_worms', 'assets/ui/Resource_Worms.png')
    this.load.image('resource_trinket', 'assets/ui/Resource_Trinket.png')
    this.load.image('resource_water', 'assets/ui/Resource_Water.png')
    // Load resources
    this.load.spritesheet('crow', 'assets/sprites/TrinketCrow_Spritesheet.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('worm_bin', 'assets/sprites/WormBin_SpriteSheet.png', { frameWidth: 32, frameHeight: 32 })
    this.load.image('flowers', 'assets/sprites/Flowers.png')
    this.load.spritesheet('resource_bubbles', 'assets/sprites/Resources_Bubble_Items.png', { frameWidth: 32, frameHeight: 32 })

    this.load.image('ready_resource', 'assets/sprites/ReadyResource_Button.png')
    this.load.image('well', 'assets/sprites/WaterWell.png')
    this.load.image('bin', 'assets/sprites/Bin.png')

    this.load.image('fairyHut1', 'assets/sprites/FairyHut_1.png')
    this.load.image('fairyHut2', 'assets/sprites/FairyHut_2.png')
    this.load.image('fairyHut3', 'assets/sprites/FairyHut_3.png')

    this.load.image('frogPond', 'assets/sprites/Frog_Pond.png')

    // Load crops/livestock
    this.load.image('Berries_Done', 'assets/sprites/Crystal Berries - Full Grown.png')
    this.load.image('Berries_Icon', 'assets/sprites/Crystal Berries - Item.png')
    this.load.image('Beans_Done', 'assets/sprites/Magic Beanstalk - Full Grown.png')
    this.load.image('Beans_Icon', 'assets/sprites/Magic Beanstalk - Item.png')
    this.load.image('Pumpkin_Done', 'assets/sprites/Pumpkin_Done.png')
    this.load.image('Pumpkin_Icon', 'assets/sprites/Pumpkin_Icon.png')

    this.load.image('frogEggs', 'assets/sprites/FrogEgg.png')
    this.load.image('fairyDust', 'assets/sprites/Dust.png')
    this.load.image('ghostGoo', 'assets/sprites/GhostJar.png')

    this.load.image('fence_vertical', 'assets/tilesets/Fence_Side.png')
    this.load.image('fence_horizontal', 'assets/tilesets/Fence.png')
    this.load.image('fence_corner_top', 'assets/tilesets/Fence_Corner_Top.png')
    this.load.image('fence_corner', 'assets/tilesets/Fence_Corner_Bottom.png')

    this.load.image('gravestone1', 'assets/sprites/Cross_Moss.png')
    this.load.image('gravestone2', 'assets/sprites/CrumblingHeadstone_Moss.png')
    this.load.image('gravestone3', 'assets/sprites/CrumblingHeadstone.png')
    this.load.image('gravestone4', 'assets/sprites/HeadstonePlate.png')

    this.load.spritesheet('ghosts1', 'assets/sprites/GhostSprites_1.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('ghosts2', 'assets/sprites/GhostSprites_2.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('frogs', 'assets/sprites/Froggie_SpriteSheet.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('fairies', 'assets/sprites/FairySprite.png', { frameWidth: 32, frameHeight: 32 })

    // Load spritesheets
    this.load.spritesheet('witch', 'assets/sprites/Witch_Spritesheet.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('farmHouse', 'assets/sprites/MushHouse_SpriteSheet.png', { frameWidth: 128, frameHeight: 128 })

    // Load JSON data
    this.load.tilemapTiledJSON('mapData', 'assets/tilemaps/FarmMapLayout.json')
  }

  create () {
    // Parse JSON into map
    this.parseTilemapJson('mapData')

    // Create any tilesets
    this.createTileset('FarmTiles', 'farmTiles')

    // Parse tile layers
    this.bgLayer = this.createTileLayer('WitchFarm', false)

    // Display and reference  the HUD
    this.scene.run('HUDScene')
    this.HUDScene = this.scene.get('HUDScene')

    // Make witch
    this.witch = new Witch(this, 880, 400)

    // Set up cursors for key pressing
    this.cursors = this.input.keyboard.createCursorKeys()

    // Add keys needed to interact and escape to open menu
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

    // Make buildings
    this.witchHouse = new Building(this, 880, 330, 'farmHouse', 'farmHouse')
    this.physics.add.collider(this.witch, this.witchHouse)

    // Set up interactable resources
    this.well = new Item(this, 920, 560, 'well', 'Well', 'resource')
    this.physics.add.collider(this.witch, this.well, this.interactResource, null, this)

    this.wormBin = new Item(this, 490, 440, 'worm_bin', 'Worms', 'resource')
    this.physics.add.collider(this.witch, this.wormBin, this.interactResource, null, this)

    this.flower = new Item(this, 920, 380, 'flowers', 'Flower', 'resource')
    this.physics.add.collider(this.witch, this.flower, this.interactResource, null, this)

    this.crow = new Item(this, 800, 400, 'crow', 'Crow', 'resource')
    this.physics.add.collider(this.witch, this.crow, this.interactResource, null, this)

    // Make Pumpkins
    this.pumpkin = new Item(this, 557, 520, 'Pumpkin_Done', 'Pumpkin', 'crop')
    this.physics.add.collider(this.witch, this.pumpkin, this.interactItem, null, this)
    this.pumpkin2 = new Item(this, 589, 520, 'Pumpkin_Done', 'Pumpkin', 'crop')
    this.physics.add.collider(this.witch, this.pumpkin2, this.interactItem, null, this)
    this.pumpkin3 = new Item(this, 621, 520, 'Pumpkin_Done', 'Pumpkin', 'crop')
    this.physics.add.collider(this.witch, this.pumpkin3, this.interactItem, null, this)
    this.pumpkin4 = new Item(this, 653, 520, 'Pumpkin_Done', 'Pumpkin', 'crop')
    this.physics.add.collider(this.witch, this.pumpkin4, this.interactItem, null, this)
    this.pumpkin5 = new Item(this, 685, 520, 'Pumpkin_Done', 'Pumpkin', 'crop')
    this.physics.add.collider(this.witch, this.pumpkin5, this.interactItem, null, this)
    this.pumpkin6 = new Item(this, 717, 520, 'Pumpkin_Done', 'Pumpkin', 'crop')
    this.physics.add.collider(this.witch, this.pumpkin6, this.interactItem, null, this)

    // Make Beans
    this.beans = new Item(this, 557, 552, 'Beans_Done', 'Beans', 'crop')
    this.physics.add.collider(this.witch, this.beans, this.interactItem, null, this)
    this.beans2 = new Item(this, 589, 552, 'Beans_Done', 'Beans', 'crop')
    this.physics.add.collider(this.witch, this.beans2, this.interactItem, null, this)
    this.beans3 = new Item(this, 621, 552, 'Beans_Done', 'Beans', 'crop')
    this.physics.add.collider(this.witch, this.beans3, this.interactItem, null, this)
    this.beans4 = new Item(this, 653, 552, 'Beans_Done', 'Beans', 'crop')
    this.physics.add.collider(this.witch, this.beans4, this.interactItem, null, this)
    this.beans5 = new Item(this, 685, 552, 'Beans_Done', 'Beans', 'crop')
    this.physics.add.collider(this.witch, this.beans5, this.interactItem, null, this)
    this.beans6 = new Item(this, 717, 552, 'Beans_Done', 'Beans', 'crop')
    this.physics.add.collider(this.witch, this.beans6, this.interactItem, null, this)

    // Make Berries
    this.berries = new Item(this, 557, 584, 'Berries_Done', 'Berries', 'crop')
    this.physics.add.collider(this.witch, this.berries, this.interactItem, null, this)
    this.berries2 = new Item(this, 589, 584, 'Berries_Done', 'Berries', 'crop')
    this.physics.add.collider(this.witch, this.berries2, this.interactItem, null, this)
    this.berries3 = new Item(this, 621, 584, 'Berries_Done', 'Berries', 'crop')
    this.physics.add.collider(this.witch, this.berries3, this.interactItem, null, this)
    this.berries4 = new Item(this, 653, 584, 'Berries_Done', 'Berries', 'crop')
    this.physics.add.collider(this.witch, this.berries4, this.interactItem, null, this)
    this.berries5 = new Item(this, 685, 584, 'Berries_Done', 'Berries', 'crop')
    this.physics.add.collider(this.witch, this.berries5, this.interactItem, null, this)
    this.berries6 = new Item(this, 717, 584, 'Berries_Done', 'Berries', 'crop')
    this.physics.add.collider(this.witch, this.berries6, this.interactItem, null, this)

    // Make frog pond
    this.frogPond = new Item(this, 600, 260, 'frogPond', 'FrogEggs', 'product')
    this.physics.add.collider(this.witch, this.frogPond, this.interactItem, null, this)

    // Make frogs
    this.frog1 = new Item(this, 612, 255, 'frogs', 'Frog1', 'animal')
    this.frog2 = new Item(this, 556, 265, 'frogs', 'Frog2', 'animal')
    this.frog3 = new Item(this, 570, 280, 'frogs', 'Frog3', 'animal')

    // Make fairy hut
    this.fairyHut1 = new Item(this, 400, 360, 'fairyHut1', 'FairyDust', 'product')
    this.physics.add.collider(this.witch, this.fairyHut1, this.interactItem, null, this)

    this.fairyHut2 = new Item(this, 365, 325, 'fairyHut2', 'FairyDust', 'product')
    this.physics.add.collider(this.witch, this.fairyHut2, this.interactItem, null, this)

    this.fairyHut3 = new Item(this, 452, 335, 'fairyHut3', 'FairyDust', 'product')
    this.physics.add.collider(this.witch, this.fairyHut3, this.interactItem, null, this)

    // Make fairies
    this.fairy1 = new Item(this, 350, 310, 'fairies', 'Fairy', 'animal')
    this.fairy2 = new Item(this, 410, 350, 'fairies', 'Fairy', 'animal')
    this.fairy3 = new Item(this, 440, 325, 'fairies', 'Fairy', 'animal')

    // Make graveyard
    this.gravestone1 = new Item(this, 390, 530, 'gravestone1', 'Gravestone1')
    this.gravestone2 = new Item(this, 320, 600, 'gravestone2', 'Gravestone2')
    this.gravestone3 = new Item(this, 300, 515, 'gravestone3', 'Gravestone3')
    this.gravestone4 = new Item(this, 290, 625, 'gravestone4', 'Gravestone4')

    // Set up fences (the long because I don't know how to in tiled)
    this.fence1 = new Item(this, 384, 512, 'fence_vertical', 'GhostGoo', 'product')
    this.fence1.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence1, this.interactItem, null, this)
    this.fence2 = new Item(this, 384, 544, 'fence_vertical', 'GhostGoo', 'product')
    this.fence2.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence2, this.interactItem, null, this)
    this.fence3 = new Item(this, 384, 576, 'fence_vertical', 'GhostGoo', 'product')
    this.fence3.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence3, this.interactItem, null, this)
    this.fence4 = new Item(this, 384, 608, 'fence_vertical', 'GhostGoo', 'product')
    this.fence4.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence4, this.interactItem, null, this)

    this.fence5 = new Item(this, 224, 512, 'fence_vertical', 'GhostGoo', 'product')
    this.fence5.setOrigin(0, 0)
    this.fence5.flipX = true
    this.physics.add.collider(this.witch, this.fence5, this.interactItem, null, this)
    this.fence6 = new Item(this, 224, 544, 'fence_vertical', 'GhostGoo', 'product')
    this.fence6.setOrigin(0, 0)
    this.fence6.flipX = true
    this.physics.add.collider(this.witch, this.fence6, this.interactItem, null, this)
    this.fence7 = new Item(this, 224, 576, 'fence_vertical', 'GhostGoo', 'product')
    this.fence7.setOrigin(0, 0)
    this.fence7.flipX = true
    this.physics.add.collider(this.witch, this.fence7, this.interactItem, null, this)
    this.fence8 = new Item(this, 224, 608, 'fence_vertical', 'GhostGoo', 'product')
    this.fence8.setOrigin(0, 0)
    this.fence8.flipX = true
    this.physics.add.collider(this.witch, this.fence8, this.interactItem, null, this)

    this.fence9 = new Item(this, 384, 640, 'fence_corner', 'GhostGoo', 'product')
    this.fence9.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence9, this.interactItem, null, this)
    this.fence10 = new Item(this, 224, 640, 'fence_corner', 'GhostGoo', 'product')
    this.fence10.setOrigin(0, 0)
    this.fence10.flipX = true
    this.physics.add.collider(this.witch, this.fence10, this.interactItem, null, this)

    this.fence11 = new Item(this, 256, 640, 'fence_horizontal', 'GhostGoo', 'product')
    this.fence11.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence11, this.interactItem, null, this)
    this.fence12 = new Item(this, 288, 640, 'fence_horizontal', 'GhostGoo', 'product')
    this.fence12.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence12, this.interactItem, null, this)
    this.fence13 = new Item(this, 320, 640, 'fence_horizontal', 'GhostGoo', 'product')
    this.fence13.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence13, this.interactItem, null, this)
    this.fence14 = new Item(this, 352, 640, 'fence_horizontal', 'GhostGoo', 'product')
    this.fence14.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence14, this.interactItem, null, this)

    this.fence15 = new Item(this, 256, 480, 'fence_horizontal', 'GhostGoo', 'product')
    this.fence15.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence15, this.interactItem, null, this)
    this.fence16 = new Item(this, 288, 480, 'fence_horizontal', 'GhostGoo', 'product')
    this.fence16.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence16, this.interactItem, null, this)
    this.fence17 = new Item(this, 320, 480, 'fence_horizontal', 'GhostGoo', 'product')
    this.fence17.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence17, this.interactItem, null, this)
    this.fence18 = new Item(this, 352, 480, 'fence_horizontal', 'GhostGoo', 'product')
    this.fence18.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence18, this.interactItem, null, this)

    this.fence19 = new Item(this, 384, 480, 'fence_corner_top', 'GhostGoo', 'product')
    this.fence19.setOrigin(0, 0)
    this.physics.add.collider(this.witch, this.fence19, this.interactItem, null, this)
    this.fence20 = new Item(this, 224, 480, 'fence_corner_top', 'GhostGoo', 'product')
    this.fence20.setOrigin(0, 0)
    this.fence20.flipX = true
    this.physics.add.collider(this.witch, this.fence20, this.interactItem, null, this)

    // Make ghosts
    this.ghost1 = new Item(this, 350, 510, 'ghosts1', 'Ghost1', 'animal')
    this.ghost2 = new Item(this, 370, 625, 'ghosts2', 'Ghost2', 'animal')
    this.ghost3 = new Item(this, 285, 585, 'ghosts1', 'Ghost3', 'animal')

    // Make sale bin
    this.bin = new Building(this, 750, 400, 'bin', 'sellingBin')
    this.physics.add.collider(this.witch, this.bin, this.emptyInventory, null, this)

    // Adjust world bounds for physics and camera
    this.physics.world.setBounds(0, 0, this.mapData.widthInPixels, this.mapData.heightInPixels)
    this.cameras.main.setBounds(0, 0, this.mapData.widthInPixels, this.mapData.heightInPixels)
    this.cameras.main.startFollow(this.witch, false)
    this.cameras.main.setZoom(2)
  }

  // Ability to interact with and pick up crops/livestock products
  interactItem (witch, item) {
    let canPickUp = false
    if (item.type === 'crop' && this.HUDScene.water) {
      canPickUp = true
    }
    if (item.name === 'FrogEggs' && this.HUDScene.wormBin) {
      canPickUp = true
    }
    if (item.name === 'FairyDust' && this.HUDScene.crow) {
      canPickUp = true
    }
    if (item.name === 'GhostGoo' && this.HUDScene.flower) {
      canPickUp = true
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyE) && this.HUDScene.openSlots > 0 && canPickUp) {
      // Create a reference to the HUDScene
      this.HUDScene = this.scene.get('HUDScene')
      // Iterate through array that item
      for (let i = 0; i < this.HUDScene.inventory.length; i++) {
        // If there is space in the inventory
        if (this.HUDScene.inventory[i] === null) {
          // Store the items name
          this.HUDScene.inventory[i] = item
          // Send the item and where it is being stored to the HUD
          this.HUDScene.display(item, i)
          // Use water when picking up crop
          if (item.type === 'crop') {
            this.HUDScene.water = false
          }
          // Use worm when interacting with frog pond
          if (item.name === 'FrogEggs' && this.HUDScene.wormBin) {
            this.HUDScene.wormBin = false
          }
          // Use trinket when interacting with fairies
          if (item.name === 'FairyDust' && this.HUDScene.crow) {
            this.HUDScene.crow = false
          }
          // Use flowers when interacting with ghost
          if (item.name === 'GhostGoo' && this.HUDScene.flower) {
            this.HUDScene.flower = false
          }

          break
        }
      }
      // Only destroy items that are crops, and when
      // the items are being stored in the inventory
      if (item.type === 'crop') {
        item.destroy()
      }
      this.HUDScene.openSlots--
    }
  }

  // Ability to interact with and pick up water, worms, flower, trinkets
  interactResource (witch, resource) {
    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      this.HUDScene = this.scene.get('HUDScene')
      if (resource.name === 'Worms') {
        this.HUDScene.wormBin = true
      }
      if (resource.name === 'Well') {
        this.HUDScene.water = true
      }

      if (resource.name === 'Crow') {
        this.HUDScene.crow = true
      }

      if (resource.name === 'Flower') {
        this.HUDScene.flower = true
      }
    }
  }

  emptyInventory () {
    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      for (let i = 0; i < this.HUDScene.inventory.length; i++) {
        this.HUDScene.emptyInventorySlot(this.HUDScene.inventory[i], i)
      }
    }
  }

  update () {
    const direction = { x: 0, y: 0 }
    if (this.cursors.right.isDown) {
      direction.x += 1
    }
    if (this.cursors.left.isDown) {
      direction.x -= 1
    }
    if (this.cursors.up.isDown) {
      direction.y -= 1
    }
    if (this.cursors.down.isDown) {
      direction.y += 1
    }

    if (this.escape.isDown) {
      this.openMenu()
    }

    // Make the witch walk
    this.witch.move(direction.x, direction.y)
    this.witch.update()
  }

  openMenu () {
    console.log('Menu opened')
    this.HUDScene.showMenu = true
  }
}

export default FarmScene
