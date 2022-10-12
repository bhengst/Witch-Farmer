import Phaser from 'phaser'

import CONFIG from '../config.js'
import FarmScene from './FarmScene.js'
import Item from '../objects/item.js'

class HUDScene extends Phaser.Scene {
  constructor () {
    super()
    // Inventory
    this.inventory = [null, null, null]
    this.inventorySize = 3
    this.inventoryDisplay = [null, null, null]
    this.openSlots = 3
    this.showMenu = false;
  }

  preload () {
    // Image Loading Done in FarmScene
  }

  create () {
    // Reference the FarmScene
    this.FarmScene = this.scene.get('FarmScene')

    // Variables for the resources
    this.wormBin = false
    this.wormBinDisplayed = false

    this.water = false
    this.waterDisplayed = false

    this.crow = false
    this.crowDisplayed = false

    this.flower = false
    this.flowerDisplayed = false

    const witchHUD = this.add.image(100, CONFIG.DEFAULT_HEIGHT - 100, 'witch_hold')
    const inventorySlot1 = this.add.image(230, CONFIG.DEFAULT_HEIGHT - 50, 'Inventory_Box')
    const inventorySlot2 = this.add.image(300, CONFIG.DEFAULT_HEIGHT - 50, 'Inventory_Box')
    const inventorySlot3 = this.add.image(370, CONFIG.DEFAULT_HEIGHT - 50, 'Inventory_Box')

    this.inventorySlotsX = [inventorySlot1.x, inventorySlot2.x, inventorySlot3.x]
    this.inventorySlotsY = [inventorySlot1.y, inventorySlot2.y, inventorySlot3.y]

    // Display Player's Funds
    this.currentFunds = 0
    this.currency = this.add.text(
      CONFIG.DEFAULT_WIDTH - 30,
      50,
      this.currentFunds, { font: '24pt Arial', color: '#FFFFFF', align: 'left' }
    )
    this.currency.setOrigin(1, 1)
  }

  display (item, index) {
    if (item.name === 'Pumpkin') {
      item.texture = 'Pumpkin_Icon'
    }
    if (item.name === 'Beans') {
      item.texture = 'Beans_Icon'
    }
    if (item.name === 'Berries') {
      item.texture = 'Berries_Icon'
    }

    if (item.name === 'FrogEggs') {
      item.texture = 'frogEggs'
      console.log('got here')
    }

    if (item.name === 'FairyDust') {
      item.texture = 'fairyDust'
    }

    if (item.name === 'GhostGoo') {
      item.texture = 'ghostGoo'
    }

    const itemDisplay = this.add.image(this.inventorySlotsX[index], this.inventorySlotsY[index], item.texture)
    itemDisplay.setScale(1.5)
    // Array storying Images
    this.inventoryDisplay[index] = itemDisplay
    console.log(this.inventoryDisplay[index]) // Prints Image3
  }

  emptyInventorySlot (item, index) {
    if (this.inventory[index] != null && this.inventoryDisplay[index] != null) {
      this.currentFunds += item.value
      // Remove item's name from inventory array
      this.inventory[index] = null
      // Remove item's image from HUD
      this.inventoryDisplay[index].destroy()
      // Remove item's information from inventoryDisplay
      this.inventoryDisplay[index] = null
      // Update the amount of open slots
      this.openSlots = 3
    }
  }

  update () {
    // Flower Icon Manager
    if (this.flower && !this.flowerDisplayed) {
      this.flowerIcon = this.add.image(73, CONFIG.DEFAULT_HEIGHT - 150, 'resource_flowers')
      this.flowerDisplayed = true
    }
    if (this.flowerDisplayed && !this.flower) {
      this.flowerIcon.destroy()
      this.flowerDisplayed = false
    }

    // Worm Icon Manager
    if (this.wormBin && !this.wormBinDisplayed) {
      this.wormBinIcon = this.add.image(45, CONFIG.DEFAULT_HEIGHT - 115, 'resource_worms')
      this.wormBinDisplayed = true
    }
    if (this.wormBinDisplayed && !this.wormBin) {
      this.wormBinIcon.destroy()
      this.wormBinDisplayed = false
    }

    // Trinket Icon Manager
    if (this.crow && !this.crowDisplayed) {
      this.crowIcon = this.add.image(45, CONFIG.DEFAULT_HEIGHT - 70, 'resource_trinket')
      this.crowDisplayed = true
    }
    if (this.crowDisplayed && !this.crow) {
      this.crowIcon.destroy()
      this.crowDisplayed = false
    }

    // Water Icon Manager
    if (this.water && !this.waterDisplayed) {
      this.waterIcon = this.add.image(73, CONFIG.DEFAULT_HEIGHT - 35, 'resource_water')
      this.waterDisplayed = true
    }
    if (this.waterDisplayed && !this.water) {
      this.waterIcon.destroy()
      this.waterDisplayed = false
    }

    this.menuButton = this.add.image(CONFIG.DEFAULT_WIDTH - 50, CONFIG.DEFAULT_HEIGHT - 30, 'InstructionsButton')
    this.menuWord = this.add.image(CONFIG.DEFAULT_WIDTH - 50, CONFIG.DEFAULT_HEIGHT - 30, 'InstructionsWord')

    this.menuButton.setInteractive()
    this.menuButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.menuButton.setTint(0xff0000)
      this.scene.start('StartScene')
      this.scene.stop('FarmScene')
      this.scene.stop('HUDScene')
    })

    this.currency.setText(this.currentFunds)
  }
}

export default HUDScene
