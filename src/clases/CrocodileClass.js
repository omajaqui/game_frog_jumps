export default class CrocodileClass extends Phaser.Physics.Arcade.Group {
  constructor(physicsWorld, scene) {
    super(physicsWorld, scene);
    this.relatedScene = scene;  // Guardar referencia a la escena
    this.itemSpeed = 50; // Velocidad del tronco
    this.itemWidth = 150; // Ancho del tronco, ajustado al tamaño de un frame del spritesheet
    this.itemHeight = 56; // Altura del tronco, ajustado al tamaño de un frame del spritesheet
    
    this.crocodile = null;
    this.crocodile2 = null;
    this.crocodile3 = null;
    this.crocodile4 = null;
    this.crocodile5 = null;
    this.crocodile6 = null;
  }
  
  newItem(pos, timeDead) {
    let sw = 100;
    let sh = 100;
    let toRight = Phaser.Math.RND.pick([true, false]);
    switch (pos) {      
      case 'middle':        
        sw = 100;
        sh = 220;
        this.crocodile = this.create( 80, sh, 'tortugaSprite').setScale(0.9).setFlipX(!toRight);
        this.crocodile2 = this.create( this.relatedScene.cw/2, sh, 'tortugaSprite').setScale(0.9).setFlipX(!toRight);
        this.crocodile3 = this.create( this.relatedScene.cw -80, sh, 'tortugaSprite').setScale(0.9).setFlipX(!toRight);

        this.crocodile = this.configureItem(this.crocodile, toRight, this.itemSpeed ,timeDead);
        this.crocodile2 = this.configureItem(this.crocodile2, toRight, this.itemSpeed ,timeDead);
        this.crocodile3 = this.configureItem(this.crocodile3, toRight, this.itemSpeed ,timeDead);
        break;
      
        case 'top':
          toRight = !this.crocodile.getData('movingRight'); //valor contrario al del crocodile 1
          sw = 100;
          sh = 100;
          this.crocodile4 = this.create( 80, sh, 'tortugaSprite').setScale(0.9).setFlipX(!toRight);
          this.crocodile5 = this.create( this.relatedScene.cw/2, sh, 'tortugaSprite').setScale(0.9).setFlipX(!toRight);
          this.crocodile6 = this.create( this.relatedScene.cw -80, sh, 'tortugaSprite').setScale(0.9).setFlipX(!toRight);

          this.crocodile4 = this.configureItem(this.crocodile4, toRight, this.itemSpeed, timeDead);
          this.crocodile5 = this.configureItem(this.crocodile5, toRight, this.itemSpeed, timeDead);
          this.crocodile6 = this.configureItem(this.crocodile6, toRight, this.itemSpeed, timeDead);
          break;
    
      default:
        break;
    }    

    // Agregar la lógica de movimiento
    setTimeout(() => {
      this.moveItems();      
    }, 500);
  }

  // Método para mover el tronco de un lado a otro
  moveItems() {
    //Agregar eventos para cada tronco
    const items = [
      this.crocodile,
      this.crocodile2,
      this.crocodile3,
      this.crocodile4,
      this.crocodile5,
      this.crocodile6,
    ];
    
    items.forEach((item) => {
      if (item && !item.getData('isMoving')) {
        item.setData('isMoving', true); // Marcar como ya asignado a un evento
        this.relatedScene.time.addEvent({
          delay: 16, // 16 ms = 60 FPS
          loop: true,
          callback: () => {
            if (!this.relatedScene.isPaused ) {
              // Verificar si el item salió de la pantalla y resetear su posición
              if (item.x < -75 || item.x > this.relatedScene.cw + 75) {
                item.setX(item.x < -75 ? 960 + 75 : -74);
              }
              
              // Mover el tronco según su dirección
              const itemSpeed = item.getData('itemSpeed');
              const movingRight = item.getData('movingRight');
              if (movingRight) {
                item.setX(item.x + itemSpeed * 0.016); // Mover hacia la derecha
              } else {
                item.setX(item.x - itemSpeed * 0.016); // Mover hacia la izquierda
              }
            }           
          },
        });
      }
    });
  }  

  configureItem(item, movingRight, speed, timeDead=0) {
    // Añadir la animación del tronco1
    this.relatedScene.anims.create({
      key: 'move',       // Nombre de la animación
      frames: this.relatedScene.anims.generateFrameNumbers('tortugaSprite', { start: 0, end: 1 }),
      frameRate: 5,           // Velocidad de la animación
      repeat: -1               // Repetir indefinidamente
    });

    return item
      .setImmovable(true)
      .setSize(this.itemWidth-30, this.itemHeight)
      .setOffset((movingRight ? 25 : 10), 0)
      .setData('movingRight', movingRight)
      .setData('itemSpeed', speed)
      // .setData('timeDead', timeDead)
      .play('move')
    ;
  }

  // Método para alternar la dirección de movimiento del tronco
  toggleDirection() {
    const items = [
      this.crocodile,
      this.crocodile2,
      this.crocodile3,
      this.crocodile4,
      this.crocodile5,
      this.crocodile6,
    ];

    items.forEach((item) => {
      const newDirection = !item.getData('movingRight');
      item.setData('movingRight', newDirection);
      item.setFlipX(!newDirection);
    });

  }
}
