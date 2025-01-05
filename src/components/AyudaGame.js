export default class AyudaGame {
  constructor(scene) {
    this.relatedScene = scene;
     
    //variables game
    this.cw = 960;
    this.ch = 540;
  }   
  
  preload() {
    this.relatedScene.load.path = './assets/';      
  }

  async create() {
    this.overlay = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bgOverlay')
      .setDepth(1)
      .setVisible(false);  // Lo mantenemos invisible hasta que queramos oscurecer
    this.createTexts();   

    this.bgLevels = this.relatedScene.add.image(this.cw/2, this.ch/2+15, 'recurso_ayuda')
      .setAlpha(1).setDepth(2).setScale(0.78)
    ;    

    //Definicion de botones
    //this.btnReiniciar = this.relatedScene.add.sprite(620, 250, 'btn_reiniciar').setScale(1.2).setInteractive({cursor:'pointer'});
    this.btnMenu = this.relatedScene.add.sprite(this.cw/2, 500, 'btn_menu').setScale(1.2).setInteractive({cursor:'pointer'});    

    this.containerInfo = this.relatedScene.add.container(20, -600, 
      [this.bgLevels, this.btnMenu]
    ).setDepth(10);        
  } 
  

  mostrarContenido(){
    this.overlay.setVisible(true);
    this.title.setVisible(true);
    this.context.setVisible(true);

    //mostrar bgDark
    this.relatedScene.tweens.add({
      targets: this.bgLevels,
      alphaTopLeft: { value: 1, duration: 1500, ease: 'Power1' },
      alphaTopRight: { value: 1, duration: 1500, ease: 'Power1' },
      alphaBottomRight: { value: 1, duration: 3000, ease: 'Power1' },
      alphaBottomLeft: { value: 1, duration: 1500, ease: 'Power1', delay: 500 },
    });

    this.relatedScene.tweens.timeline({
      targets: this.containerInfo,
      ease: 'Power1',
      duration: 500,
      tweens: [
        { y: 100, duration: 200 }, // Baja hasta y: 100 en 200 ms
        { y: -50, duration: 150 },   // Luego sube hasta y: -50 en 150 ms
        { y: 0, duration: 150 },   // Luego baja hasta y: 0 en 150 ms
      ],
      onComplete: function () {
        // Acciones al completar el tween
        //console.log("Animación completada");
      },
    });

    this.interaccionButtons();
  }

  interaccionButtons(){    
    //INTERACION CON EL BOTON MENU
    this.btnMenu.on('pointerover', () => {
      this.relatedScene.tweens.add({
          targets: this.btnMenu,
          scaleX: 1.4,      // Nuevo valor de escala en X
          scaleY: 1.4,      // Nuevo valor de escala en Y
          duration: 200,    // Duración de la animación en milisegundos
          ease: 'Power1',   // Tipo de easing
      });
    });  
    this.btnMenu.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.btnMenu,
            scaleX: 1.2,      // Restaurar el valor original de escala en X
            scaleY: 1.2,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.btnMenu.on('pointerdown', () => {
      this.overlay.setVisible(false);
      this.title.setVisible(false);
      this.context.setVisible(false);
      this.containerInfo.setY(-600);
      this.relatedScene.backgroundMusic.stop(); 
      this.relatedScene.scene.start('Intro');
    }); 
  }
  
  createTexts() {
    // Texto "Press Enter to continue" mejorado
    this.title = this.relatedScene.add.text(this.cw/2, 25, "Cómo jugar.", {
      font: '40px Arial',       // Tamaño de fuente más grande
      fill: '#FFF',           // Color de texto blanco
      stroke: '#000000',         // Contorno negro
      strokeThickness: 6,        // Grosor del contorno para mejor visibilidad
      shadow: {                  // Sombra para resaltar más
          offsetX: 2,
          offsetY: 2,
          color: '#000000',
          blur: 4,
          fill: true
      }
    }).setOrigin(0.5).setVisible(false).setDepth(3);

    const explication = 'Ayuda a tu rana a cruzar el río de forma segura hasta llegar al otro lado.'

    // Texto "Press Enter to continue" mejorado
    this.context = this.relatedScene.add.text(this.cw/2, 75, explication, {
      font: '28px Arial',       // Tamaño de fuente más grande
      fill: '#FFF',           // Color de texto blanco
      stroke: '#000000',         // Contorno negro
      strokeThickness: 6,        // Grosor del contorno para mejor visibilidad
      shadow: {                  // Sombra para resaltar más
          offsetX: 2,
          offsetY: 2,
          color: '#000000',
          blur: 4,
          fill: true
      }
    }).setOrigin(0.5).setVisible(false).setDepth(3);
  }
}