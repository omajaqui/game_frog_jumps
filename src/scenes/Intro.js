import Menu from "../components/Menu.js?v=1.0";
import AyudaGame from "../components/AyudaGame.js?v=1.0";

class Intro extends Phaser.Scene {  
  constructor() {
    super('Intro');
    this.menu = new Menu(this);
    this.ayudaGame = new AyudaGame(this);
  }
  init() {     
    this.verindicaciones = 'N';
    this.jugar = false;
  }
  preload() {         
  }
  create() {
      this.btnMusicOn = this.add.sprite(40, 40, 'btn_music').setScale(0.25).setDepth(5).setInteractive({cursor:'pointer'}).setVisible(true);      
      this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgroundIntro')
        .setVisible(true).setDepth(1) ;
      ;
     
      // Reproduce la música de fondo en bucle
      this.backgroundMusic = this.sound.add('backgroundMusic', { volume: 0.2, loop: true });

      if (!this.backgroundMusic.isPlaying) {        
          // Detecta la interacción inicial del usuario
          this.input.keyboard.once('keydown', () => {
              this.startBackgroundMusic();
          });
          this.input.once('pointerdown', () => {
              this.startBackgroundMusic();
          });
      }

      // CREATE KEYBOARD CURSOS
      //this.cursors = this.input.keyboard.createCursorKeys();

      //DETECTAR PULSACION DE TECLAS
      const keys = Phaser.Input.Keyboard.KeyCodes; 
      this.keyEnter = this.input.keyboard.addKey(keys.ENTER);
      this.keyz = this.input.keyboard.addKey(keys.Z);
      
      this.menu.create();
      this.ayudaGame.create();
  }

  startBackgroundMusic() {  
    setTimeout(() => {
      if (!this.backgroundMusic.isPlaying && !this.jugar) {
        this.backgroundMusic.play();  // Reproduce el audio   
      }                     
    }, 1000);      
  }

  indicaciones(){
    this.jugar = true;
    this.backgroundMusic.stop();
    this.scene.start('Loading', { sceneToLoad: 'ScenePpal' });         
  }

  showHelp() {
    this.ayudaGame.mostrarContenido();
  }
  
  update(time, delta) {      
      // Controlar visivility del boton music
      if (this.backgroundMusic.isPlaying) {
          this.btnMusicOn.setVisible(false);
      }
  } 
} export default Intro;