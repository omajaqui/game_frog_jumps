export default class Menu {
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
      // Crear un rectángulo semitransparente para oscurecer el fondo
      // this.overlay = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bgOverlay').setDepth(1).setVisible(false); 

      // this.menuContext = this.relatedScene.add.sprite(this.cw / 2, 250, 'menu_context').setAlpha(1).setDepth(1).setScale(1.5);
      this.btn_jugar = this.relatedScene.add.sprite(800, 220, 'btn_jugar').setAlpha(1).setDepth(1).setScale(1);
      this.btn_ayuda = this.relatedScene.add.sprite(800, 280, 'btn_ayuda').setAlpha(1).setDepth(1).setScale(1);

      this.containerMenu = this.relatedScene.add.container(960+500, 0, 
        [this.btn_jugar, this.btn_ayuda]
      ).setDepth(10);

      setTimeout(() => {
        this.showMenu();
      }, 1000);
    }

    showMenu(){
      //this.overlay.setVisible(true);
      let self = this;      
      
      this.relatedScene.tweens.add({
        targets: [this.containerMenu],
        x: 0,
        ease: 'Power1',
        duration: 2000,
        onComplete: function () {
          self.interationButtons();
          self.btn_jugar.setDepth(2).setInteractive({cursor:'pointer'});
          self.btn_ayuda.setDepth(2).setInteractive({cursor:'pointer'});                                                    
        },
      });
    }

    interationButtons() {
      //INTERACION CON EL BOTON JUGAR
      this.btn_jugar.on('pointerover', () => {
        this.relatedScene.tweens.add({
            targets: this.btn_jugar,
            scaleX: 1.2,      // Nuevo valor de escala en X
            scaleY: 1.2,      // Nuevo valor de escala en Y
            duration: 200,    // Duración de la animación en milisegundos
            ease: 'Power1',   // Tipo de easing
        });
      });  
      this.btn_jugar.on('pointerout', () => {
          this.relatedScene.tweens.add({
              targets: this.btn_jugar,
              scaleX: 1,      // Restaurar el valor original de escala en X
              scaleY: 1,      // Restaurar el valor original de escala en Y
              duration: 200,
              ease: 'Power1',
          });
      });
      this.btn_jugar.on('pointerdown', () => {
        //this.overlay.setVisible(false);
        this.containerMenu.setVisible(false);
        this.relatedScene.indicaciones();
      });

      //INTERACION CON EL BOTON ayuda
      this.btn_ayuda.on('pointerover', () => {
        this.relatedScene.tweens.add({
            targets: this.btn_ayuda,
            scaleX: 1.2,      // Nuevo valor de escala en X
            scaleY: 1.2,      // Nuevo valor de escala en Y
            duration: 200,    // Duración de la animación en milisegundos
            ease: 'Power1',   // Tipo de easing
        });
      });  
      this.btn_ayuda.on('pointerout', () => {
          this.relatedScene.tweens.add({
              targets: this.btn_ayuda,
              scaleX: 1,      // Restaurar el valor original de escala en X
              scaleY: 1,      // Restaurar el valor original de escala en Y
              duration: 200,
              ease: 'Power1',
          });
      });
      this.btn_ayuda.on('pointerdown', () => {
        this.containerMenu.setVisible(false);
        this.relatedScene.showHelp();
      });      
    }    
}