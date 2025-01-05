import PlayerFrog from "../clases/PlayerFrog.js?v=1.0";
import TroncoClass from "../clases/TroncoClass.js?v=1.0";
import TrunkSliceClass from "../clases/TrunkSliceClass.js?v=1.0";
import CrocodileClass from "../clases/CrocodileClass.js?v=1.0";
import NanufarClass from "../clases/NanufarClass.js?v=1.0";
import InfoGame from "../components/InfoGame.js?v=1.0";
import GeneralInfo from "../components/GeneralInfo.js?v=1.0";

class ScenePpal extends Phaser.Scene {
  constructor(){
    super('ScenePpal');
    this.infoGame = new InfoGame(this);
    this.generalInfo = new GeneralInfo(this);
  }

  init(){    
    this.isPaused = false;    
    this.finished = 0;
    this.lastDirection = 'Up';
    this.isJumping = false; // Bandera para controlar el salto
    this.isColliding = false; // Variable para rastrear el estado de colisión
    this.canContinue = true;
    this.playing = false;
    this.lifes = 5;
    this.counterStar = 0;
    
    // Dimensiones del canvas
    this.cw = this.scale.width;
    this.ch = this.scale.height;  
  }

  preload(){
    this.load.path = './assets/';    
  }

  create(){
    this.background = this.add.tileSprite(480, 270, 960, 540, 'bg_scenePpal')
      .setScale(1)       // Ajusta el factor de escala según el tamaño que deseas en la escena
      .setScrollFactor(0)
    ;

    // sonidos
    this.jumpSound = this.sound.add('jumpSound', { volume: 0.5, loop: false });
    this.successSound = this.sound.add('successSound', { volume: 1, loop: false });
    this.splashSound = this.sound.add('splashSound', { volume: 1, loop: false });
    this.soundTheme = this.sound.add('soundTheme', { volume: 0.3, loop: true });
    this.soundTheme.play(); 

    this.ground = this.physics.add.sprite(this.cw / 2, this.ch - 35, 'ground_down');
    this.ground.body.setImmovable(true);
    this.ground.body.setSize(this.cw, 40);

    this.centralIsland = this.physics.add.sprite(this.cw / 2, this.ch / 2 + 20, 'island_short');
    this.centralIsland.body.setImmovable(true); 
    this.centralIsland.body.setSize(460,42); // custom mask => setSize(width, height, XinSprite, YinSprite) 

    this.arbusto = this.add.sprite(20, this.ch - 60, 'arbusto_hojas').setScale(0.5).setDepth(4);
    this.arbustoTropical = this.add.sprite(920, this.ch - 120, 'arbusto_tropical').setScale(1).setDepth(4);
  
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

    // Crear la instancia del grupo Rodajas de tronco
    this.trunksSliceGroup = new TrunkSliceClass(this.physics.world, this);
    this.trunksSliceGroup.newItems();

    
    // Crear la instancia del grupo de cocodrilos
    this.crocodilegroup = new CrocodileClass(this.physics.world, this);
    this.crocodilegroup.newItem('middle', 3);
    this.crocodilegroup.newItem('top', 0);
    
    // Crear la instancia del grupo de nanufar
    this.nanufarGroup = new NanufarClass(this.physics.world, this);
    this.nanufarGroup.newItems();

    // ADD COLIDERS BETWEEN SPRITES
    this.physics.add.overlap(this.player, [this.ground, this.centralIsland, this.troncosGroup, this.trunksSliceGroup, this.crocodilegroup, this.nanufarGroup], this.hitPlayer, null, this);   

    this.infoGame.create();
    this.generalInfo.create();   
  }

  hitPlayer(player, element) {
    player.setVelocityX(0);
    if (!this.isColliding && !this.isJumping) {
      this.isColliding = true;
      const key = element.texture.key;
      switch (key) {
        case 'troncoSprite':
        case 'crocodileSprite':
          const movingRight = element.getData('movingRight');
          const itemSpeed = element.getData('itemSpeed');

          // Asegurarse de que el jugador sigue moviéndose mientras está sobre el tronco
          this.worldstepListener = () => {
            if (this.isColliding && !this.isJumping) {
              player.setVelocityX(movingRight ? itemSpeed : -itemSpeed);
            }
          };
          this.physics.world.on('worldstep', this.worldstepListener);

          break;

        case 'trunk_slice':
          this.playing = false;
          this.reloadPosPlayer();
          // compensar la perdida erronea de vida
          this.lifes += 1;    
          this.generalInfo.actualizarScore();
          break;
        case 'recurso_star':
          this.playing = false;
          element.destroy();
          this.controlAdvance();
          break;
      
        default:
          break;
      }

      // validar si el elemento con el que coliciona se destrira
      const timeDead = element.getData('timeDead');
      if (timeDead && timeDead > 0) {
        setTimeout(() => {
         // Verificar si element sigue colisionando con player
          if (this.physics.world.overlap(this.player, element)) {
            this.isColliding = false;
            
            element.disableBody(true, true); // Desactiva el cuerpo y oculta el sprite      
            setTimeout(() => {
              // Eliminar el evento worldstep al saltar
              if (this.worldstepListener) {
                this.physics.world.off('worldstep', this.worldstepListener);
                this.worldstepListener = null; // Limpiar la referencia
              }
              // Detener el movimiento en el eje X
              this.player.setVelocityX(0);

              element.enableBody(true, element.x, element.y, true, true); // Reactiva el cuerpo y el sprite
            }, 1000);
          }
        }, timeDead * 1000);
      }
    }
  }  

  controlPlayer() {
    if (!this.isPaused) {
      this.player.setVisible(true);
      
      if (this.isJumping || !this.isColliding) return ; // Si ya está saltando, no permite otro movimiento
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
        if (this.player.y < 500) { // solo se permite saltar hacia abajo si no esta enla hierba inferior
          this.player.move('down');
          this.lastDirection = 'Down';
        }
      }
      else {
        const idle = `idle${this.lastDirection}`
        this.player.move(idle);
      }
    } else {
      if (!this.playing) {
        let self = this;
        this.tweens.add({
          targets: this.player,
          scaleX: 0,
          scaleY: 0,
          duration: 1000,
          ease: 'Power1',
          onComplete: () => {
            self.player.setVisible(false);
          }
        });
      }
    }
  }

  checkPlayerColision() {
    if (!this.isJumping && !this.isColliding && this.playing) {
      // console.log('no hay colision');     
      this.playing = false;
      this.isPaused = true;
      this.splashSound.play();
      this.lifes -= 1;
      this.soundTheme.pause();
      this.generalInfo.actualizarScore();        
      if (this.lifes <= 0) {
        this.infoGame.mostrarContenido();
      } else {
        setTimeout(() => {
          this.isPaused = false;
          this.controlJumps();
          this.player.setPosition(this.cw/2, 500);
          this.tweens.add({
            targets: this.player,
            scaleX: 0.6, // Restaurar la escala horizontal a su valor original
            scaleY: 0.6, // Restaurar la escala vertical a su valor original
            duration: 1000, // Duración de la animación
            ease: 'Power1',
            onStart: () => {
              this.lastDirection = 'Up';
              this.soundTheme.resume();
              this.player.setVisible(true); // Hacer visible al jugador al comenzar la animación
            }
          });          
        }, 1000);
      }
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

  controlAdvance() {
    // compensar la perdida erronea de vida
    //this.lifes += 1;
    this.counterStar += 1;
    this.successSound.play();
    this.generalInfo.actualizarScore();
    this.crocodilegroup.toggleDirection();
    if(this.counterStar >= 7) {
      this.soundTheme.stop();
      this.finished = 1;
    } else {
      this.reloadPosPlayer();
    }
  }

  reloadPosPlayer() {
    this.crocodilegroup.toggleDirection();

    this.tweens.add({
      targets: this.player,
      scaleX: 0,
      scaleY: 0,
      duration: 1000,
      ease: 'Power1',
      onComplete: () => {
        this.player.setVisible(false);
      }
    });

    this.controlJumps();
    this.player.setPosition(this.cw/2, 500);
    this.tweens.add({
      targets: this.player,
      scaleX: 0.6, // Restaurar la escala horizontal a su valor original
      scaleY: 0.6, // Restaurar la escala vertical a su valor original
      duration: 1000, // Duración de la animación
      ease: 'Power1',
      onStart: () => {
        this.lastDirection = 'Up';
        this.soundTheme.resume();
        this.player.setVisible(true); // Hacer visible al jugador al comenzar la animación
      }
    });
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