export default class TrunkSliceClass extends Phaser.Physics.Arcade.Group {
  constructor(physicsWorld, scene) {
    super(physicsWorld, scene);
    this.relatedScene = scene;  // Guardar referencia a la escena

    /* this.relatedScene.add.existing(this);
    this.relatedScene.physics.world.enable(this); */
  }

  // Método para crear un tronco nuevo
  newItems() {
    this.tunksContainer = this.relatedScene.add.container(-40, 40).setDepth(1); 
       
    const totalTruncks = 7;
    const spacing = 130; // Espacio entre cada imagen
    for (let i = 0; i < totalTruncks; i++) {      
      const x = (i == 0)? spacing : i * spacing + 130;
      let trunk = this.create( x, 0, 'trunk_slice');
      let star = this.create( x-40, 40, 'recurso_star').setScale(0.1).setDepth(2);
      star.body.setSize(600, 600)
      trunk = this.configureTronco(trunk);
      const randomAngle = Math.floor(Math.random() * (180 - 45 + 1)) + 45;
      trunk.angle = randomAngle;
      this.tunksContainer.add(trunk, star);
    }  
  }  

  configureTronco(tronco) {    
    return tronco
      .setImmovable(true)
      .setScale(0.23)
      //.setDepth(1)
      //.body.setCircle(50)
      //.setSize(50, 50)
      //.setOffset((movingRight ? 40 : 0), 0)
    ;
  }
}
