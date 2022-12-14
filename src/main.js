// Bring in the phaser library
import Phaser from 'phaser'

import CONFIG from './config.js'

// Bringing in our base example scene
import StartScene from './scenes/Start.js'
import FarmScene from './scenes/FarmScene.js'
import HUDScene from './scenes/HUD.js'
import InstructionsScene from './scenes/Instructions'

const config = {
  // Configure Phaser graphics settings
  type: Phaser.AUTO,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: CONFIG.DEFAULT_WIDTH,
    height: CONFIG.DEFAULT_HEIGHT
  },

  // Configure physics settings
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: CONFIG.DEFAULT_GRAVITY },
      // HERE'S  WHERE TO TURN OFF THE BOXES!!
      // debug: __DEV__
    }
  }
}

// Initialize the base phaser game object (must always be done once)
const game = new Phaser.Game(config)

// Add and auto-starting ExampleScene
game.scene.add('StartScene', StartScene)
game.scene.add('InstructionsScene', InstructionsScene)
game.scene.add('FarmScene', FarmScene)
game.scene.add('HUDScene', HUDScene)
game.scene.start('StartScene')
