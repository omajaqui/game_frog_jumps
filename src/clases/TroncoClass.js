export default class TroncoClass extends Phaser.Physics.Arcade.Group {
  constructor(physicsWorld, scene) {
    super(physicsWorld, scene);
    this.relatedScene = scene;  // Guardar referencia a la escena
    this.troncoSpeed = 50; // Velocidad del tronco
    this.troncoWidth = 270; // Ancho del tronco, ajustado al tamaño de un frame del spritesheet
    this.troncoHeight = 56; // Altura del tronco, ajustado al tamaño de un frame del spritesheet
    
    this.tronco = null;
    this.tronco2 = null;
    this.tronco3 = null;
    this.tronco4 = null;
    this.tronco5 = null;
    this.tronco6 = null;
    this.tronco7 = null;
    this.tronco8 = null;
    this.tronco9 = null;
  }

  // Método para crear un tronco nuevo
  newItem(pos) {
    let sw = 100;
    let sh = 100;
    let toRight = true;
    switch (pos) {
      case 'bottom':
        sw = 100;
        sh = 450;        
        this.tronco = this.create( 80, sh, 'troncoSprite').setScale(0.8).setFlipX(toRight);
        this.tronco2 = this.create( this.relatedScene.cw/2, sh, 'troncoSprite').setScale(0.8).setFlipX(toRight);
        this.tronco3 = this.create( this.relatedScene.cw -80, sh, 'troncoSprite').setScale(0.8).setFlipX(toRight);

        this.tronco = this.configureTronco(this.tronco, toRight, this.troncoSpeed);
        this.tronco2 = this.configureTronco(this.tronco2, toRight, this.troncoSpeed);
        this.tronco3 = this.configureTronco(this.tronco3, toRight, this.troncoSpeed);
        break;
      
      case 'middle':
        toRight = false;
        sw = 100;
        sh = 400;
        this.tronco4 = this.create( 80, sh, 'troncoSprite').setScale(0.8).setFlipX(toRight);
        this.tronco5 = this.create( this.relatedScene.cw/2, sh, 'troncoSprite').setScale(0.8).setFlipX(toRight);
        this.tronco6 = this.create( this.relatedScene.cw -80, sh, 'troncoSprite').setScale(0.8).setFlipX(toRight);

        this.tronco4 = this.configureTronco(this.tronco4, toRight, this.troncoSpeed);
        this.tronco5 = this.configureTronco(this.tronco5, toRight, this.troncoSpeed);
        this.tronco6 = this.configureTronco(this.tronco6, toRight, this.troncoSpeed);
        break;
      
        case 'top':
          sw = 100;
          sh = 350;        
          this.tronco7 = this.create( -220, sh, 'troncoSprite').setScale(0.8).setFlipX(toRight);
          //this.tronco8 = this.create( this.relatedScene.cw/2 - 300, sh, 'troncoSprite').setScale(0.8).setFlipX(toRight);
          this.tronco9 = this.create( this.relatedScene.cw -380, sh, 'troncoSprite').setScale(0.8).setFlipX(toRight);

          this.tronco7 = this.configureTronco(this.tronco7, toRight, this.troncoSpeed);
          //this.tronco8 = this.configureTronco(this.tronco8, toRight, this.troncoSpeed);
          this.tronco9 = this.configureTronco(this.tronco9, toRight, this.troncoSpeed);
          break;
    
      default:
        break;
    }    

    // Agregar la lógica de movimiento
    setTimeout(() => {
      this.moveTronco();      
    }, 500);
  }

  // Método para mover el tronco de un lado a otro
  moveTronco() {
    //Agregar eventos para cada tronco
    const troncos = [
      this.tronco,
      this.tronco2,
      this.tronco3,
      this.tronco4,
      this.tronco5,
      this.tronco6,
      this.tronco7,
      this.tronco8,
      this.tronco9,
    ];
    
    troncos.forEach((tronco) => {
      if (tronco && !tronco.getData('isMoving')) {
        tronco.setData('isMoving', true); // Marcar como ya asignado a un evento
        this.relatedScene.time.addEvent({
          delay: 16, // 16 ms = 60 FPS
          loop: true,
          callback: () => {           
            // Verificar si el tronco salió de la pantalla y resetear su posición
            if (tronco.x < -135 || tronco.x > this.relatedScene.cw + 135) {
              tronco.setX(tronco.x < -135 ? 960 + 135 : -100);
            }
            
            // Mover el tronco según su dirección
            const troncoSpeed = tronco.getData('troncoSpeed');
            const movingRight = tronco.getData('movingRight');
            if (movingRight) {
              tronco.setX(tronco.x + troncoSpeed * 0.016); // Mover hacia la derecha
            } else {
              tronco.setX(tronco.x - troncoSpeed * 0.016); // Mover hacia la izquierda
            }
          },
        });
      }
    });
  }

  // Método para alternar la dirección de movimiento del tronco
  toggleDirection(tronco) {
    // Cambiar la dirección de movimiento del tronco
    tronco.setData('movingRight', !tronco.getData('movingRight'));
  }

  configureTronco(tronco, movingRight, troncoSpeed) {
    // Añadir la animación del tronco1
    this.relatedScene.anims.create({
      key: 'moveTronco',       // Nombre de la animación
      frames: this.relatedScene.anims.generateFrameNumbers('troncoSprite', { start: 0, end: 1 }),
      frameRate: 10,           // Velocidad de la animación
      repeat: -1               // Repetir indefinidamente
    });

    return tronco
      .setImmovable(true)
      .setSize(this.troncoWidth - 40, this.troncoHeight)
      .setOffset((movingRight ? 40 : 0), 0)
      .setData('movingRight', movingRight)
      .setData('troncoSpeed', troncoSpeed)
      .play('moveTronco')
    ;
  }
}
