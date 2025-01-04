//IMPORTAR ESCENAS
import Intro from "./scenes/Intro.js?v=1.0";
import Loading from "./scenes/Loading.js?v=1.0";
import ScenePpal from "./scenes/ScenePpal.js?v=1.0";
import GameOver from "./scenes/GameOver.js?v=1.0";
import Winner from "./scenes/Winner.js?v=1.0";

const config = {

    //opcionales
    title: 'frog_jumps', // Nombre juego
    url: '',
    version: '0.0.1',
    pixelArt: false, //MARCAR LOS PIXELES DE LAS IMAGENES

    //OBLIGATORIO
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: 'container_game',
    backgroundColor: '#34495E',    

    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: true
        } 
    },

    //CONSOLA
    banner: {
        hidePhaser: true,
        text: '#000000',

        background: [
            'red',
            'yellow',
            'red',
            'transparent'
        ]
    },

    //escenas del juego
    scene: [Loading,Intro,ScenePpal,Winner,GameOver]
}

// CREAR LA INSTANCIA DEL JUEGO
const game = new Phaser.Game(config);