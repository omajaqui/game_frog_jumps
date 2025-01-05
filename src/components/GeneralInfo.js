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

  async create() {
    this.froFace = this.relatedScene.add
      .image(20, 20, 'frog_face')
      .setAlpha(1)
      .setDepth(10)
      .setScale(0.5);
    ;
    this.Text = this.relatedScene.add
      .text(12, 40, this.relatedScene.lifes, 
        { fontStyle: 'strong', align: 'right', font: '30px Arial', fill: '#000' })
    ;
    
    this.star = this.relatedScene.add
      .image(940, 20, 'recurso_star')
      .setAlpha(1)
      .setDepth(10)
      .setScale(0.1);
    ;
    this.TextStar = this.relatedScene.add
      .text(933, 40, this.relatedScene.counterStar, 
        { fontStyle: 'strong', align: 'left', font: '30px Arial', fill: '#000' })
    ; 
  } 

  actualizarScore() {
    this.Text.setText(this.relatedScene.lifes);
    this.TextStar.setText(this.relatedScene.counterStar);
  }
}