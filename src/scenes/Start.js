import Phaser from 'phaser'
import CONFIG from '../config.js'

class StartScene extends Phaser.Scene {
  init () {
    this.loadingText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Loading ...', { font: '16pt Arial', color: '#FFFFFF', align: 'center' }
    )
    this.loadingText.setOrigin(0.5, 0.5)
  }

  preload () {
    // Load the image assets needed for THIS scene
    this.load.image('StartButton', 'assets/ui/Button.png')
    this.load.image('InstructionsButton', 'assets/ui/Button.png')
    this.load.image('StartWord', 'assets/ui/Play_Button.png')
    this.load.image('InstructionsWord', 'assets/ui/Menu_Button.png')
    this.load.image('MainBackground', 'assets/ui/TitleScreen.png')
  }

  create () {
    // Remove loading text
    this.loadingText.destroy()

    // Add background image
    const startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'MainBackground')
    startScreen.setScale(
      CONFIG.DEFAULT_WIDTH / startScreen.width,
      CONFIG.DEFAULT_HEIGHT / startScreen.height
    )
    this.cameras.main.setBackgroundColor('black')

    // Add buttons
    this.startButton = this.add.image((CONFIG.DEFAULT_WIDTH / 2) + 15, (CONFIG.DEFAULT_HEIGHT / 2) + 125, 'StartButton')
    this.startWord = this.add.image((CONFIG.DEFAULT_WIDTH / 2) + 15, (CONFIG.DEFAULT_HEIGHT / 2) + 125, 'StartWord')
    this.instructionsButton = this.add.image((CONFIG.DEFAULT_WIDTH / 2) + 15, (CONFIG.DEFAULT_HEIGHT / 2) + 230, 'InstructionsButton')
    this.instructWord = this.add.image((CONFIG.DEFAULT_WIDTH / 2) + 15, (CONFIG.DEFAULT_HEIGHT / 2) + 230, 'InstructionsWord')

    this.startButton.setScale(3)
    this.startWord.setScale(3)
    this.instructionsButton.setScale(3)
    this.instructWord.setScale(3)

    this.instructionsShowing = false
    if (!this.instructionsShowing) {
      // Start Button Functions
      this.startButton.setInteractive()
      this.startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.startButton.setTint(0xff0000)
      })
      this.startButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.startButton.setTint()
        this.scene.start('FarmScene')
      })

      // Instructions Button Functions
      this.instructionsButton.setInteractive()
      this.instructionsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.instructionsButton.setTint(0xff0000)
      })

      this.instructionsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.instructionsButton.setTint()
        this.scene.run('InstructionsScene')
        this.instructionsShowing = true
      })
    }
  }

  update () {
    if (this.instructionsShowing) {
      this.startButton.disableInteractive()
      this.instructionsButton.disableInteractive()
    } else {
      this.startButton.setInteractive()
      this.instructionsButton.setInteractive()
    }
  }
}

export default StartScene
