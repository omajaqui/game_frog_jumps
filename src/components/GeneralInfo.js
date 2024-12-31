import Comun from "../services/Comun.js";

export default class GeneralInfo {
  constructor(scene) {
    this.relatedScene = scene;
    this.comun = new Comun();

    //variables game
    this.cw = 960;
    this.ch = 540;
  }   
  
  preload() {      
  }

  async create(image) {
    this.stiker = this.relatedScene.add
      .image(730, 30, image)
      .setAlpha(1)
      .setDepth(10)
      .setScale(0.28)
    ;
    this.stikerText = this.relatedScene.add
      .text(760, 20, 'X ' + this.relatedScene.scoreStiker, 
        { fontStyle: 'strong', align: 'right', font: '30px Arial', fill: '#000' })
    ;

    this.star = this.relatedScene.add
      .image(870, 30, 'recurso_star')
      .setAlpha(1)
      .setDepth(10)
      .setScale(0.12)
    ;
    this.starText = this.relatedScene.add
      .text(900, 20, 'X ' + this.relatedScene.scoreStar, 
        { fontStyle: 'strong', align: 'right', font: '30px Arial', fill: '#000' })
    ;
       
      //Definicion de botones
      this.btnHome = this.relatedScene.add.sprite(40, 40, 'btn_home')
        .setAlpha(1)
        .setVisible(false)
      ;

      //INTERACION CON EL BOTON INCIO        
      this.btnHome.on('pointerover', () => { this.btnHome.setScale(0.35); });
      this.btnHome.on('pointerout', () => {  this.btnHome.setScale(0.3); });
      this.btnHome.on('pointerdown', () => {
        if (this.relatedScene.backgroundMusic && this.relatedScene.backgroundMusic.isPlaying) {
          this.relatedScene.backgroundMusic.stop();
        }
        
        if (this.relatedScene.soundTheme && this.relatedScene.soundTheme.isPlaying) {
          this.relatedScene.soundTheme.stop();
        }
        if (this.relatedScene.playerSonund && this.relatedScene.playerSonund.isPlaying) {
          this.relatedScene.playerSonund.stop();
        }

        this.relatedScene.scene.start('Intro'); 
      }); 

      //CONTENEDORES
      this.containerScores = this.relatedScene.add.container(0, -500,
        [this.btnHome, this.star, this.starText, this.stiker, this.stikerText ]
      ).setDepth(10);

      setTimeout(() => {
        this.mostrarInfo()
;      }, 1000);
  } 

 
  mostrarInfo(){
      let self = this;     
      this.relatedScene.tweens.add({
          targets: this.containerScores,
          y: 0,
          ease: 'Power1',
          duration: 2000,
          onComplete: function () {
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

  actualizarScore() {
    this.starText.setText('X ' + this.relatedScene.scoreStar);
    this.stikerText.setText('X ' + this.relatedScene.scoreStiker);
  }
}