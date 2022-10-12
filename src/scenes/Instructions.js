import Phaser from 'phaser'

import CONFIG from '../config.js'

class InstructionsScene extends Phaser.Scene {
  preload () {
    this.load.image('Menu', 'assets/ui/Menu_Screen.png')
    this.load.image('Exit', 'assets/ui/Exit_Button.png')
  }

  create () {
    // Create a reference to the Start Scene
    this.StartScene = this.scene.get('StartScene')

    this.menu = this.add.image((CONFIG.DEFAULT_WIDTH / 2) + 30, (CONFIG.DEFAULT_WIDTH / 2) - 250, 'Menu')

    this.instructions = this.add.text((CONFIG.DEFAULT_WIDTH / 2) + 30, (CONFIG.DEFAULT_WIDTH / 2) - 250,
      'Instructions \n\n Move \n Arrow Keys \n\n Interact \n E key \n\n To Return to Menu \n Escape Key',
      { font: '16pt Arial', color: '#FFFFFF', align: 'center' })
    this.instructions.setOrigin(0.5, 0.5)

    this.exit = this.add.image((CONFIG.DEFAULT_WIDTH / 2) + 125, (CONFIG.DEFAULT_WIDTH / 2) - 345, 'Exit')
    this.exit.setInteractive()
    this.exit.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.exit.setTint(0xff0000)
      this.scene.stop('InstructionsScene')
      this.StartScene.instructionsShowing = false
    })
  }
}

export default InstructionsScene
