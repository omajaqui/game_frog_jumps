export default class NanufarClass extends Phaser.Physics.Arcade.Group {
  constructor(physicsWorld, scene) {
    super(physicsWorld, scene);
    this.relatedScene = scene;  // Guardar referencia a la escena

    /* this.relatedScene.add.existing(this);
    this.relatedScene.physics.world.enable(this); */
  }

  // Método para crear nanufar
  newItems() {
    this.nanufarContainer = this.relatedScene.add.container(30, 155).setDepth(1);
       
    const totalNanufar = 7;
    const spacing = 130; // Espacio entre cada imagen
    for (let i = 0; i < totalNanufar; i++) {
      const x = (i == 0)? spacing : i * spacing;
      let item = this.create( x, 0, 'nanufar_little');
      item = this.configureItem(item);
      const randomAngle = Math.floor(Math.random() * (180 - 45 + 1)) + 45;
      item.angle = randomAngle;     
      this.nanufarContainer.add(item);
      
      // Agregar la animación de rotación
      this.scene.tweens.add({
        targets: item,
        angle: 360,          // Rota el item 360 grados
        duration: 30000,      // Duración de la animación en milisegundos
        repeat: -1,          // Repite la animación indefinidamente
        ease: 'Linear',      // Movimiento lineal constante
      });
    }      
  }  

  configureItem(tronco) {
    return tronco
      .setImmovable(true)
      .setScale(0.23)
      .setData('timeDead', 3)
      //.setDepth(1)
      //.body.setCircle(50)
      //.setSize(50, 50)
      //.setOffset((movingRight ? 40 : 0), 0)
    ;
  }
}
