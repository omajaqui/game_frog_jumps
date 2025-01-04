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

      //INTERACION CON EL BOTON COLECCION
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
        //this.showCollection();
      });      
    }

    closeCollection() {
      if (this.navButtonsContainer) this.navButtonsContainer.destroy();
      if (this.collectionContainer) this.collectionContainer.destroy();
      this.containerMenu.setVisible(true);
    }

    createNavigationButtons() {
      // Botón para ir a la página anterior
      this.btn_close = this.relatedScene.add.sprite(40, 40, 'btn_close')
        .setInteractive({ cursor: 'pointer' })
        .setActive(true)
        .setVisible(true)
        .setDepth(3)
        .on('pointerdown', () => this.closeCollection());

      // Botón para ir a la página anterior
      this.btn_prev = this.relatedScene.add.sprite(40, 490, 'btn_prev')
        .setInteractive({ cursor: 'pointer' })
        .setActive(true)
        .setVisible(false)
        .setDepth(3)
        .on('pointerdown', () => this.changePage('prev'));

      // Botón para ir a la página siguiente
      this.btn_next = this.relatedScene.add.sprite(920, 500, 'btn_next')
        .setInteractive({ cursor: 'pointer' })
        .setActive(true)
        .setVisible(true)
        .setDepth(3)
        .on('pointerdown', () => this.changePage('next'));
        
      this.navButtonsContainer = this.relatedScene.add.container(0, 0, [this.btn_close, this.btn_prev, this.btn_next])
        .setVisible(true).setDepth(3);
    }

    showCollection() {
      this.currentPage = 1;
      this.createNavigationButtons();
      this.colectionActual = this.comun.getDataLocalStorage('collection');

      if (!this.colectionActual) {
        console.error('No se encontró la colección en localStorage.');
        return;
      }

      this.drawCollection();      
    }    

    changePage(action) {
      if (this.collectionContainer) this.collectionContainer.destroy();
      switch (action) {
        case 'prev':
          this.currentPage -= 1;
          this.btn_next.setVisible(true);
          this.btn_prev.setVisible(false);
          break;
        
        case 'next':
          this.currentPage += 1;
          this.btn_next.setVisible(false);
          this.btn_prev.setVisible(true);
          break;
      
        default:
          break;
      }
      this.drawCollection();
    }

    drawCollection() {
      let start = 0;
      let end = 21;
      if (this.currentPage > 1) {
        start = 21;
        end = 43;
      }
      const items = this.colectionActual.slice(start,end);
      const totalItems = items.length;
      const spacing = 130; // Espacio entre cada imagen

      this.collectionContainer = this.relatedScene.add.container(0, 0).setVisible(true).setDepth(2);

      // Crear imagenes del todos los elementos de colectionActual
      for (let i = 0; i <= totalItems; i++) {
        const keyImage = items[i]?.name;
        
        let x = 100;
        let y = 100;
        if(i <= 6) {
          x = (i == 0)? x : i * spacing + x;
        }

        if (i > 6 && i <= 13) {
          x = 100;
          y = 250;
          x = (i == 7)? x : (i-7) * spacing + x;
        }

        if (i > 13) {
          x = 100;
          y = 400;
          x = (i == 14)? x : (i-14) * spacing + x;
        }
        
        const sprite = this.relatedScene.add.sprite(x, y, keyImage)
          .setActive(true)
          .setVisible(true)
          .setDepth(2)
          .setScale(0.5)
          .setInteractive({cursor:'pointer'})          
        ;
        
        if (!items[i]?.visible) {
          sprite.setTintFill(0x000000ffffff);
        } else {
          // sprite.on('pointerdown', () => this.relatedScene.handleClickCollection(keyImage))

          //INTERACION CON EL SPRITE
          sprite.on('pointerover', () => {
            this.relatedScene.tweens.add({
                targets: sprite,
                scaleX: 0.6,      // Nuevo valor de escala en X
                scaleY: 0.6,      // Nuevo valor de escala en Y
                duration: 200,    // Duración de la animación en milisegundos
                ease: 'Power1',   // Tipo de easing
            });
          });  
          sprite.on('pointerout', () => {
              this.relatedScene.tweens.add({
                  targets: sprite,
                  scaleX: 0.5,      // Restaurar el valor original de escala en X
                  scaleY: 0.5,      // Restaurar el valor original de escala en Y
                  duration: 200,
                  ease: 'Power1',
              });
          });
          sprite.on('pointerdown', () => {
            this.relatedScene.handleClickCollection(keyImage)
          });
        }

        this.collectionContainer.add(sprite);
      }
    }
}