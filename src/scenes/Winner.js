import Niveles from "./../components/Niveles.js?v=4.10";

class Winner extends Phaser.Scene {

    constructor() {
        super('Winner');
        this.niveles = new Niveles(this);
    }

    init() {
        console.log("Winner");        
    }

    preload() {
        this.load.path = './assets/';
        // LOAD IMAGES AND SPRITES
        this.load.image('winnerImage', 'img/backgrounds/winner.png');
    }

    create() {
        this.add
            .image(this.sys.game.canvas.width / 2, (this.sys.game.canvas.height / 2), 'winnerImage')
            .setDepth(1)
        ;
        
        this.soundWinner = this.sound.add('winner', { volume: 1, loop: false });
        this.soundWinner.play();


        this.niveles.create();
        setTimeout(() => {
            this.niveles.mostrarNiveles();
        }, 3000);
    }
}

export default Winner;