import Niveles from "./../components/Niveles.js?v=1.0";

class Intro extends Phaser.Scene {  
  constructor() {
    super('Intro');
    this.niveles = new Niveles(this);
  }
  init() {     
    this.verindicaciones = 'N';
    this.iniciar;
  }
  preload() {         
  }
  create() {
      this.btnMusicOn = this.add.sprite(40, 40, 'btn_music').setScale(0.25).setDepth(5).setInteractive({cursor:'pointer'}).setVisible(true);      
      this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgroundIntro')
          .setVisible(true).setDepth(1) ;
      ;      

      this.introText = this.add.text(this.sys.game.canvas.width/2-100,320,"",{ fontStyle: 'strong', align: 'lef', font: '24px Arial', fill: 'yellow' });  
      
      // Texto "Press Enter to continue" mejorado
      this.continueText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height - 50, "Press Enter to continue", {
          font: '32px Arial',       // Tamaño de fuente más grande
          fill: '#FFFFFF',           // Color de texto blanco
          stroke: '#000000',         // Contorno negro
          strokeThickness: 6,        // Grosor del contorno para mejor visibilidad
          shadow: {                  // Sombra para resaltar más
              offsetX: 2,
              offsetY: 2,
              color: '#000000',
              blur: 4,
              fill: true
          }
      }).setOrigin(0.5).setVisible(true).setDepth(3);

      // Animación de palpitación
      this.tweens.add({
          targets: this.continueText,
          alpha: { from: 0.5, to: 1 },
          duration: 800,           // Un poco más rápido para llamar más la atención
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
      });

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

      /* this.add.text(10, 10, 'Hold down the Z Key', { font: '16px Courier', fill: '#00ff00' });
      this.introText = this.add.text(10, 30, '', { font: '16px Courier', fill: '#00ff00' }); */

      this.niveles.create();            
  }

  startBackgroundMusic() {  
      setTimeout(() => {
          if (!this.backgroundMusic.isPlaying) {
              this.backgroundMusic.play();  // Reproduce el audio   
          }                     
      }, 1000);      
  }

  indicaciones(){      
      this.continueText.setVisible(false);
      this.iniciar = setTimeout(() => {
          this.niveles.mostrarNiveles();
      }, 1000);        
  }

  async startScene(data) {
    console.log(data);

    this.backgroundMusic.stop();
    try {
      await this.textToSpeech.speak(`Letra, ${data.leter}.`, 2);            
    } catch (error) {
      console.log(error);
    }
    await this.textToSpeech.speak(`En inglés se pronuncia.`, 2);
    await this.textToSpeech.speak(`${data.leter}.`, 1);
    await this.textToSpeech.speak('Comencemos.', 2);
    console.log(data.sceneToLoad);
    this.scene.start('Loading', { sceneToLoad: data.sceneToLoad });    
  }
  
  update(time, delta) {        
      // INPUT CONTROL 
      if (Phaser.Input.Keyboard.JustDown(this.keyEnter) && this.verindicaciones == 'N'){
          this.verindicaciones = 'S';
          this.indicaciones();
      } 
      
      // Controlar visivility del boton music
      if (this.backgroundMusic.isPlaying) {
          this.btnMusicOn.setVisible(false);
      }
  } 
} export default Intro;