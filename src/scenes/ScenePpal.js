import PlayerFrog from "../clases/PlayerFrog.js?v=1.0";
import TroncoClass from "../clases/TroncoClass.js?v=1.0";

class ScenePpal extends Phaser.Scene {
  constructor(){
    super('ScenePpal');
  }

  init(){    
    this.isPaused = false;    
    this.finished = 0;
    this.lastDirection = 'Up';
    this.isJumping = false; // Bandera para controlar el salto
    this.isColliding = false; // Variable para rastrear el estado de colisión
    this.canContinue = true;
    this.playing = false;
    
    // Dimensiones del canvas
    this.cw = this.scale.width;
    this.ch = this.scale.height;  
  }

  preload(){
    this.load.path = './assets/';    
  }

  create(){
    this.background = this.add.tileSprite(480, 270, 960, 540, 'bg_scenePpal_ref')
      .setScale(1)       // Ajusta el factor de escala según el tamaño que deseas en la escena
      .setScrollFactor(0)
    ;

    // sonidos
    this.jumpSound = this.sound.add('jumpSound', { volume: 0.5, loop: false });

    this.ground = this.physics.add.sprite(this.cw / 2, this.ch - 35, 'ground_down');
    this.ground.body.setImmovable(true);
    this.ground.body.setSize(this.cw, 40);

    this.centralIsland = this.physics.add.sprite(this.cw / 2, this.ch / 2 + 20, 'island_short');
    this.centralIsland.body.setImmovable(true); 
    this.centralIsland.body.setSize(460,42); // custom mask => setSize(width, height, XinSprite, YinSprite) 

    //Sonido de fondo
    //this.soundTheme = this.sound.add('soundTheme', { volume: 0.3, loop: true });
    //this.soundTheme.play();         
      
    // CREATE KEYBOARD CURSOS
    this.cursors = this.input.keyboard.createCursorKeys();

    // PLAYER
    this.player = new PlayerFrog(this, this.cw/2, 500, 'frogSprite');

    // GROUPS
    // Crear la instancia del grupo de troncos
    this.troncosGroup = new TroncoClass(this.physics.world, this);    
    this.troncosGroup.newItem('bottom');
    this.troncosGroup.newItem('middle');
    this.troncosGroup.newItem('top');

    // ADD COLIDERS BETWEEN SPRITES
    this.physics.add.overlap(this.player, [this.ground, this.centralIsland, this.troncosGroup], this.hitPlayer, null, this);   

    //this.generalInfo.create('lupa');
    
    setTimeout(() => {
      this.canRespawnStiker = true;
    }, 3000);
  }

  hitPlayer(player, element) {
    player.setVelocityX(0);
    // console.log('colisionando: ',this.isColliding);
    // Se ejecuta cuando comienza la colisión
    if (!this.isColliding && !this.isJumping) {
      this.isColliding = true;
      console.log('Inicio de colisión con:', element);

      const key = element.texture.key;
      console.log('key',key);

      switch (key) {
        case 'troncoSprite':
          const movingRight = element.getData('movingRight');
          const troncoSpeed = element.getData('troncoSpeed');
          console.log('movingRight:', movingRight, 'speed:', troncoSpeed);

          // Aplicar la velocidad del tronco al jugador
          player.setVelocityX(movingRight ? troncoSpeed : -troncoSpeed);

          // Asegurarse de que el jugador sigue moviéndose mientras está sobre el tronco
          this.worldstepListener = () => {
            if (this.isColliding && !this.isJumping) {
              player.setVelocityX(movingRight ? troncoSpeed : -troncoSpeed);
            }
          };
          this.physics.world.on('worldstep', this.worldstepListener);

          break;
      
        default:
          break;
      }

    }
  }

  addStiker() {
    this.stikerGroup.newItem(this.config.difficulty);    
  }  

  controlPlayer() {
    if (!this.isPaused) {
      this.player.setVisible(true);
      
      if (this.isJumping) return false; // Si ya está saltando, no permite otro movimiento

      // INPUT CONTROL        
      if (this.cursors.left.isDown) {
        this.player.move('left');
        this.lastDirection = 'Left';
      }        
      else if (this.cursors.right.isDown) {
        this.player.move('right');
        this.lastDirection = 'Right';
      }     
      else if (this.cursors.up.isDown) {
        this.player.move('up');
        this.lastDirection = 'Up';
      }
      else if (this.cursors.down.isDown) {
        this.player.move('down');
        this.lastDirection = 'Down';
      }
      else {
        const idle = `idle${this.lastDirection}`
        this.player.move(idle);
      }
    } else {
      this.player.setVisible(false);
    }
  }

  checkPlayerColision() {
    if (!this.isJumping && !this.isColliding && this.playing) {
      this.playing = false;
      this.isPaused = true;
      console.log('no hay colision');     
      //this.canContinue = false;
    }
  }

  controlJumps() {
    this.isColliding = false;
    this.playing = true;
    this.jumpSound.play();
    // Eliminar el evento worldstep al saltar
    if (this.worldstepListener) {
      this.physics.world.off('worldstep', this.worldstepListener);
      this.worldstepListener = null; // Limpiar la referencia
    }

    // Detener el movimiento en el eje X
    this.player.setVelocityX(0);
  }
   
  update(time, delta){
    if(this.finished > 0){
      this.scene.start('Winner');
      this.finished = 0;
    }

    if (!this.canContinue) {
      this.scene.start('GameOver');
    }

    this.controlPlayer();
    this.checkPlayerColision();
  }
}

export default ScenePpal;