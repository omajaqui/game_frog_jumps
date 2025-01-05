import Comun from "../services/Comun.js";
export default class InfoGame {
  constructor(scene) {
    this.relatedScene = scene;
    this.comun = new Comun();
     
    //variables game
    this.cw = 960;
    this.ch = 540;
  }   
  
  preload() {
    this.relatedScene.load.path = './assets/';      
  }

  async create() {
    this.bgLevels = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bg_info_game').setAlpha(1).setDepth(2);    
   
    this.overlay = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bgOverlay')
      .setDepth(1)
      .setVisible(false);  // Lo mantenemos invisible hasta que queramos oscurecer

    this.star = this.relatedScene.add
      .image(570, 150, 'recurso_star')
      .setScale(0.2);
    ;
    this.TextStar = this.relatedScene.add
      .text(610, 110, this.relatedScene.counterStar + '/7', 
        { fontStyle: 'strong', align: 'left', font: '80px Arial', fill: '#FFF' })
    ; 
    
    //Definicion de botones
    this.btnReiniciar = this.relatedScene.add.sprite(620, 250, 'btn_reiniciar').setScale(1.2).setInteractive({cursor:'pointer'});
    this.btnMenu = this.relatedScene.add.sprite(620, 350, 'btn_menu').setScale(1.2).setInteractive({cursor:'pointer'});    

    this.containerInfo = this.relatedScene.add.container(20, -600, 
      [this.bgLevels, this.star, this.TextStar, this.btnReiniciar, this.btnMenu]
    ).setDepth(10);        
  } 
  

  mostrarContenido(){
    this.actualizarScore();
    this.overlay.setVisible(true);

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
    //console.log("establecet interaccion con los btn de los niveles")

    //INTERACION CON EL BOTON REINICIAR
    this.btnReiniciar.on('pointerover', () => {
        this.relatedScene.tweens.add({
            targets: this.btnReiniciar,
            scaleX: 1.4,      // Nuevo valor de escala en X
            scaleY: 1.4,      // Nuevo valor de escala en Y
            duration: 200,    // Duración de la animación en milisegundos
            ease: 'Power1',   // Tipo de easing
        });
    });  
    this.btnReiniciar.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.btnReiniciar,
            scaleX: 1.2,      // Restaurar el valor original de escala en X
            scaleY: 1.2,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.btnReiniciar.on('pointerdown', () => {
      this.relatedScene.scene.start('ScenePpal');
    });
    
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
    this.relatedScene.scene.start('Intro');
  }); 
  }

  actualizarScore() {
    this.TextStar.setText(this.relatedScene.counterStar + '/7');
  }

  
}