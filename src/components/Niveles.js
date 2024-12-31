import Comun from "../services/Comun.js";
export default class Niveles {
  constructor(scene) {
    this.relatedScene = scene;
    this.comun = new Comun();
    
    this.nivelesDisponibles = [];
     
    //variables game
    this.cw = 960;
    this.ch = 540;
    this.sceneToLoad = '';
  }   
  
  preload() {
    this.relatedScene.load.path = './assets/';      
  }

  async create() {
      this.bgLevels = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bgLevels').setAlpha(0).setDepth(2);
      
      // Crear un rectángulo semitransparente para oscurecer el fondo
      this.overlay = this.relatedScene.add.image(this.cw/2, this.ch/2, 'bgOverlay')
        .setDepth(1)
        .setVisible(false);  // Lo mantenemos invisible hasta que queramos oscurecer
      
      //Definicion de botones
      this.btnHome = this.relatedScene.add.sprite(40, 40, 'btn_home').setAlpha(0).setVisible(false);
      

      this.nivel_A = this.relatedScene.add.sprite(200, 250, 'A').setScale(0.4).setDepth(10).setInteractive({cursor:'pointer'});      
      //this.stars_A = this.relatedScene.add.sprite(200, 320, this.nivelesDisponibles.avanceJuego[0].stars).setScale(0.4).setDepth(10).setInteractive({cursor:'pointer'});
      
      this.nivel_E = this.relatedScene.add.sprite(330, 250, 'E').setScale(0.4).setDepth(10).setInteractive({cursor:'pointer'});
      this.nivel_I = this.relatedScene.add.sprite(460, 250, 'I').setScale(0.4).setDepth(10).setInteractive({cursor:'pointer'});
      this.nivel_O = this.relatedScene.add.sprite(590, 250, 'O').setScale(0.4).setDepth(10).setInteractive({cursor:'pointer'});
      this.nivel_U = this.relatedScene.add.sprite(720, 250, 'U').setScale(0.4).setDepth(10).setInteractive({cursor:'pointer'});

      //await this.styleNiveles();      

      //CONTENEDORES
      /* this.container_A = this.relatedScene.add.container(0, 0,
        [this.nivel_A, this.stars_A]
      ); */
      this.containerNiveles = this.relatedScene.add.container(20, -500, 
        [this.btnHome, this.nivel_A, this.nivel_E, this.nivel_I, this.nivel_O, this.nivel_U]
      ).setDepth(10);
      
      // Intancias audios de niveles
      this.soundLetraA = this.relatedScene.sound.add('letraA', { volume: 0.8, loop: false });
      this.soundLetraE = this.relatedScene.sound.add('letraE', { volume: 0.8, loop: false });
      this.soundLetraI = this.relatedScene.sound.add('letraI', { volume: 0.8, loop: false });
      this.soundLetraO = this.relatedScene.sound.add('letraO', { volume: 0.8, loop: false });
      this.soundLetraU = this.relatedScene.sound.add('letraU', { volume: 0.8, loop: false });      
  }

  cargarNivelesDisponibles(){
      return new Promise(async resolve =>{
          //let clave = `AVANCE_JUEGOS_USUARIO_${window.parent.$.IdentificaUsuario}`;
          //this.nivelesDisponibles = await window.parent.cargar_storage(clave);           
          resolve(true);
      });
  }

  styleNiveles(){
      return new Promise(async resolve =>{
          this.nivelesDisponibles.avanceJuego.forEach(item =>{
              switch(item.nivel){
                  //el nivel 1 siempre estará disponible por eso no se valida
                  case "2": //nivel spacio
                      //validar si el nivel esta como disponible 'N'
                      if(item.disponible == "N"){
                          this.nivel_space.setTint(0x1abc9c);
                      }else{
                          this.nivel_space.setInteractive({cursor:'pointer'});
                      }
                  break;
              }
          });
          resolve(true);
      });
  }

  mostrarNiveles(){
    this.overlay.setVisible(true);
    let self = this;

    //mostrar bgDark
    this.relatedScene.tweens.add({
      targets: this.bgLevels,
      alphaTopLeft: { value: 1, duration: 1500, ease: 'Power1' },
      alphaTopRight: { value: 1, duration: 1500, ease: 'Power1' },
      alphaBottomRight: { value: 1, duration: 3000, ease: 'Power1' },
      alphaBottomLeft: { value: 1, duration: 1500, ease: 'Power1', delay: 500 },
    });

    //console.log("mostrar niveles desde componente");
    this.relatedScene.tweens.add({
      targets: [this.containerNiveles],
      y: 0,
      ease: 'Power1',
      duration: 2000,
      onComplete: function () {
        self.interaccionNiveles();
        self.btnHome.setScale(0.25).setDepth(10).setInteractive({cursor:'pointer'}).setVisible(true);
        self.relatedScene.tweens.add({
          targets: self.btnHome,
          alpha: 1,          // Cambia alpha de 0 a 1 (opacidad completa)
          duration: 500,     // Duración de la animación en milisegundos
          ease: 'Power2',    // Efecto de suavizado
        });                                           
      },
    });
  }

  interaccionNiveles(){
    //console.log("establecet interaccion con los btn de los niveles")

    //INTERACION CON EL NIVEL A
    this.nivel_A.on('pointerover', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_A,
            scaleX: 0.5,      // Nuevo valor de escala en X
            scaleY: 0.5,      // Nuevo valor de escala en Y
            duration: 200,    // Duración de la animación en milisegundos
            ease: 'Power1',   // Tipo de easing
        });
    });  
    this.nivel_A.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_A,
            scaleX: 0.4,      // Restaurar el valor original de escala en X
            scaleY: 0.4,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_A.on('pointerdown', () => {
      this.startLevel('A');
    });

    //INTERACCION CON EL NIVEL E
    this.nivel_E.on('pointerover', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_E,
            scaleX: 0.5,      // Nuevo valor de escala en X
            scaleY: 0.5,      // Nuevo valor de escala en Y
            duration: 200,    // Duración de la animación en milisegundos
            ease: 'Power1',   // Tipo de easing
        });
    });  
    this.nivel_E.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_E,
            scaleX: 0.4,      // Restaurar el valor original de escala en X
            scaleY: 0.4,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_E.on('pointerdown', () => {
      this.startLevel('E');
    });

    //INTERACCION CON EL NIVEL I
    this.nivel_I.on('pointerover', () => {
      this.relatedScene.tweens.add({
          targets: this.nivel_I,
          scaleX: 0.5,      // Nuevo valor de escala en X
          scaleY: 0.5,      // Nuevo valor de escala en Y
          duration: 200,    // Duración de la animación en milisegundos
          ease: 'Power1',   // Tipo de easing
      });
    });  
    this.nivel_I.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_I,
            scaleX: 0.4,      // Restaurar el valor original de escala en X
            scaleY: 0.4,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_I.on('pointerdown', () => {
      this.startLevel('I');
    });

    //INTERACCION CON EL NIVEL O
    this.nivel_O.on('pointerover', () => {
      this.relatedScene.tweens.add({
          targets: this.nivel_O,
          scaleX: 0.5,      // Nuevo valor de escala en X
          scaleY: 0.5,      // Nuevo valor de escala en Y
          duration: 200,    // Duración de la animación en milisegundos
          ease: 'Power1',   // Tipo de easing
      });
    });  
    this.nivel_O.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_O,
            scaleX: 0.4,      // Restaurar el valor original de escala en X
            scaleY: 0.4,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_O.on('pointerdown', () => {
      this.startLevel('O');
    });

    //INTERACCION CON EL NIVEL u
    this.nivel_U.on('pointerover', () => {
      this.relatedScene.tweens.add({
          targets: this.nivel_U,
          scaleX: 0.5,      // Nuevo valor de escala en X
          scaleY: 0.5,      // Nuevo valor de escala en Y
          duration: 200,    // Duración de la animación en milisegundos
          ease: 'Power1',   // Tipo de easing
      });
    });  
    this.nivel_U.on('pointerout', () => {
        this.relatedScene.tweens.add({
            targets: this.nivel_U,
            scaleX: 0.4,      // Restaurar el valor original de escala en X
            scaleY: 0.4,      // Restaurar el valor original de escala en Y
            duration: 200,
            ease: 'Power1',
        });
    });
    this.nivel_U.on('pointerdown', () => {
      this.startLevel('U');
    });

    //INTERACION CON EL BOTON HOME        
    this.btnHome.on('pointerover', () => { this.btnHome.setScale(0.35); });
    this.btnHome.on('pointerout', () => {  this.btnHome.setScale(0.3); });
    this.btnHome.on('pointerdown', () => {
      if (this.relatedScene.backgroundMusic && this.relatedScene.backgroundMusic.isPlaying) {
        this.relatedScene.backgroundMusic.stop();
      }
      this.relatedScene.scene.start('Intro'); 
    });        
  } 

  async startLevel(currentKey) {
    this.sceneToLoad = '';

    // Ocultar todos los niveles, estrellas y el boton de home
    this.nivel_A.setAlpha(0);
    this.nivel_E.setAlpha(0);
    this.nivel_I.setAlpha(0);
    this.nivel_O.setAlpha(0);
    this.nivel_U.setAlpha(0);
    this.btnHome.setAlpha(0);

    // Eliminar los eventos previos de interacción => a todos los niveles
    this.nivel_A.removeAllListeners('pointerover');
    this.nivel_A.removeAllListeners('pointerout');
    this.nivel_A.removeAllListeners('pointerdown');
    this.nivel_E.removeAllListeners('pointerover');
    this.nivel_E.removeAllListeners('pointerout');
    this.nivel_E.removeAllListeners('pointerdown');
    this.nivel_I.removeAllListeners('pointerover');
    this.nivel_I.removeAllListeners('pointerout');
    this.nivel_I.removeAllListeners('pointerdown');
    this.nivel_O.removeAllListeners('pointerover');
    this.nivel_O.removeAllListeners('pointerout');
    this.nivel_O.removeAllListeners('pointerdown');
    this.nivel_U.removeAllListeners('pointerover');
    this.nivel_U.removeAllListeners('pointerout');
    this.nivel_U.removeAllListeners('pointerdown');

    // Dejar visible solo el nivel seleccionado
    switch (currentKey) {
      case 'A':
        this.sceneToLoad = 'SceneA';
        this.nivel_A.setAlpha(1);

        //Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_A,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue();
          }
        });
        break; 

      case 'E': 
        this.sceneToLoad = 'SceneE';
        this.nivel_E.setAlpha(1);

        // Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_E,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue();  
          }
        });
        break; 

      case 'I': 
        this.sceneToLoad = 'SceneI';
        this.nivel_I.setAlpha(1);

        // Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_I,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue();
          }
        });
        break;

      case 'O': 
        this.sceneToLoad = 'SceneO';
        this.nivel_O.setAlpha(1);

        // Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_O,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue();  
          }
        });
        break;

      case 'U': 
        this.sceneToLoad = 'SceneU';
        this.nivel_U.setAlpha(1);

        // Crear animación para agrandar y centrar el nivel seleccionado
        this.relatedScene.tweens.add({
          targets: this.nivel_U,             // Usa el nivel seleccionado
          scale: 1.2,                             // Agrandar el nivel seleccionado
          x: this.cw / 2,                         // Llevar al centro de la pantalla
          y: this.ch / 2,                         // Llevar al centro vertical
          duration: 1000,                         // Duración de la animación en ms
          ease: 'Power2',                         // Tipo de suavizado      
          onComplete: async () => {
            await this.controlContinue();             
          }
        });
        break;

      default:
        sceneToLoad = 'DefaultScene';
        break;
    }    
  }

  async controlContinue() {
    if (this.relatedScene.backgroundMusic && this.relatedScene.backgroundMusic.isPlaying) {
      this.relatedScene.backgroundMusic.stop();
    }
    await this.comun.delay(1000);

    switch (this.sceneToLoad) {
      case 'SceneA': this.soundLetraA.play(); break;
      case 'SceneE': this.soundLetraE.play(); break;
      case 'SceneI': this.soundLetraI.play(); break;
      case 'SceneO': this.soundLetraO.play(); break;
      case 'SceneU': this.soundLetraU.play(); break;
      default: break;
    }
    await this.comun.delay(3000);
    this.showIndications();
    setTimeout(() => {
      this.relatedScene.scene.start('Loading', { sceneToLoad: this.sceneToLoad });      
    }, 5000);    
  }

  showIndications() {
    const keyBgIndications = `bg_${this.sceneToLoad}_indications`;
    this.bgLevels.setAlpha(0);
    this.overlay.setAlpha(0);
    this.bgIndications = this.relatedScene.add.image(this.cw/2, this.ch/2, keyBgIndications).setDepth(10);

    // Agregar un texto para el contador regresivo en la esquina inferior derecha
    const countdownText = this.relatedScene.add.text(
      this.cw - 50, // Ajusta la posición horizontal (50px desde el borde derecho)
      this.ch - 50, // Ajusta la posición vertical (50px desde el borde inferior)
      '5', // Texto inicial
      {
          font: '32px Arial',
          fill: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4,
          align: 'center'
      }
    ).setDepth(11).setOrigin(0.5); // Centra el texto

    // Crear el contador regresivo
    let countdownValue = 5;
    const countdownTimer = this.relatedScene.time.addEvent({
        delay: 1000, // 1 segundo
        callback: () => {
            countdownValue--;
            countdownText.setText(countdownValue); // Actualiza el texto
            if (countdownValue <= 0) {
                countdownTimer.remove(); // Detiene el temporizador
                countdownText.destroy(); // Elimina el texto
            }
        },
        repeat: 4 // Se repite 4 veces para llegar a 0
    });
  }
}