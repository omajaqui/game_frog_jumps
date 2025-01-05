import InfoGame from "../components/InfoGame.js?v=1.0";

class Winner extends Phaser.Scene {
    constructor() {
      super('Winner');
      this.infoGame = new InfoGame(this);
    }

    init() {
      console.log("Winner");
      this.counterStar = 7;        
    }

    preload() {
      this.load.path = './assets/';        
      this.load.image('winnerImage', 'img/backgrounds/winner.png');
    }

    create() {
      this.add
        .image(this.sys.game.canvas.width / 2, (this.sys.game.canvas.height / 2), 'winnerImage')
        .setDepth(1)
      ;
      
      this.soundWinner = this.sound.add('winner', { volume: 1, loop: false });
      this.soundWinner.play();

      this.infoGame.create();
      setTimeout(() => {
        this.infoGame.mostrarContenido();
      }, 3000);
    }
}

export default Winner;