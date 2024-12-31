import Niveles from "./../components/Niveles.js?v=1.0.0";
class GameOver extends Phaser.Scene {

    constructor() {
        super('GameOver');
        this.niveles = new Niveles(this);
    }

    init() {
        console.log("GameOver");
        this.continuar = 0;

        //variables game
        this.cw = this.sys.game.canvas.width;
        this.ch = this.sys.game.canvas.height;
    }

    preload() {
        this.load.path = './assets/';
        // LOAD IMAGES AND SPRITES
        this.load.image('gameoverImage', 'img/backgrounds/gameover.png')
                 .audio('gameOverSound',['sonidos/gameOver.mp3'])
        ;
        this.niveles.preload();
    }

    create() {
        // CREATE SPRITES
        this.gameOverImage = this.add.image(this.cw/2,this.ch/2, 'gameoverImage'); 

        // CREATE AUDIOS
        this.gameOverSound = this.sound.add('gameOverSound');
        
        // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys();

        //DETECTAR PULSACION DE TECLAS
        const keys = Phaser.Input.Keyboard.KeyCodes; 
        this.keyEnter = this.input.keyboard.addKey(keys.ENTER);        

        this.niveles.create();
        setTimeout(() => {
            this.niveles.mostrarNiveles();
        }, 3000);
    }     

    update(time, delta) {        
    }
}

export default GameOver;