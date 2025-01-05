export default class PlayerFrog extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
      super(scene, x, y, sprite); 
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enable(this);

      this.init();
      this.animatePlayer();
    }

    init(){
        this
        .setBounce(0.2)
        .setCollideWorldBounds(true)
        //.setGravityY(300)
        .setDepth(3)
        .setScale(0.6) 
        //.body.setSize(100,100,64,72); // custom mask => setSize(width, height, XinSprite, YinSprite)
        .body.setSize(20, 20, 1, 0) // Solo 20 píxeles de altura y Mover el cuerpo al centro del sprite
    }

    animatePlayer() {
      // Animación hacia la derecha
      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('frogSprite', { start: 1, end: 2 }),
          frameRate: 10, // Animación más lenta
          repeat: 0, // Ejecutar una sola vez      
      });

      // Animación hacia la izquierda 
      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('frogSprite', { start: 1, end: 2 }),
          frameRate: 10,
          repeat: 0,
      });        
      
      // Animación hacia arriba 
      this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('frogSprite', { start: 1, end: 2 }),
          frameRate: 10,
          repeat: 0,
      }); 
      
      // Animación  player quieto hacia arriba
      this.anims.create({
          key: 'turnUp',
          frames: [{ key: 'frogSprite', frame: 0 }],
      });
      // Animación  player quieto hacia arriba
      this.anims.create({
          key: 'turnRight',
          frames: [{ key: 'frogSprite', frame: 0 }],
      });

      // Animación  player quieto hacia arriba
      this.anims.create({
          key: 'turnLeft',
          frames: [{ key: 'frogSprite', frame: 0 }],
      });
    }

    move(direction) {
      if (this.scene.isJumping) return; // Si ya está saltando, no permite otro movimiento

      this.scene.isJumping = true;           
      const jumpDistance = 58; // Distancia fija para cada salto
      let targetX = this.x; // Posición X objetivo
      let targetY = this.y; // Posición Y objetivo
      switch (direction) {
        case 'right':
          this.scene.controlJumps(); 
          this.angle = 90; // Rotación 90° para mirar hacia la derecha
          this.anims.play('right', true);
          targetX += jumpDistance; // Mueve 60px a la derecha
          break;

        case 'left':
          this.scene.controlJumps(); 
          this.angle = -90; // Rotar -90° para mirar hacia la izquierda
          this.anims.play('left', true);
          targetX -= jumpDistance; // Mueve 60px a la izquierda
          break;

        case 'up':
          this.scene.controlJumps(); 
          this.angle = 0; // Rotar 0 para mirar hacia arriba
          this.anims.play('up', true);
          targetY -= jumpDistance; // Mueve 60px hacia arriba
          break;

        case 'down':          
          this.scene.controlJumps(); 
          this.angle = 180; // Rotar 180 para mirar hacia abajo
          this.anims.play('up', true);
          targetY += jumpDistance; // Mueve 60px hacia arriba
          break;

        case 'idleUp':
          this.scene.isJumping = false;
          this.angle = 0; // Rotar 0 para mirar hacia arriba
          this.anims.play('turnUp', true);
          break;
        
        case 'idleDown':
          this.scene.isJumping = false;
          this.angle = 180; // Rotar 180 para mirar hacia abajo
          this.anims.play('turnUp', true);
          break;

        case 'idleRight':
          this.scene.isJumping = false;
          this.angle = 90; // Rotación 90° para mirar hacia la derecha
          this.anims.play('turnRight', true);
          break;

        case 'idleLeft':
          this.scene.isJumping = false;
          this.angle = -90; // Rotar -90° para mirar hacia la izquierda
          this.anims.play('turnLeft', true);
          break;

        default:
          break;
      }

      if (this.scene.isJumping) {
        // Mueve el sprite suavemente a la posición objetivo
        this.scene.tweens.add({
          targets: this,
          x: targetX,
          y: targetY,
          duration: 200, // Duración del salto en milisegundos
          ease: 'Power1', // Efecto de suavizado
          onComplete: () => {
            setTimeout(() => {
              this.scene.isJumping = false; // Permite otro salto al terminar el movimiento              
            }, 100);
          }
        });
      }
      
    }
}