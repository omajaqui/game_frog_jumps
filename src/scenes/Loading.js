import Niveles from "./../components/Niveles.js?v1.0";

class Loading extends Phaser.Scene {
  constructor() {
    super('Loading');
    this.targetScene = null; // Escena objetivo
    this.niveles = new Niveles(this);
  }

  init(data) {
    // Recibe el nombre de la escena a cargar desde los datos pasados al iniciar la escena
    this.targetScene = data.sceneToLoad || 'Intro'; // Valor predeterminado si no se proporciona una escena
  }

  preload() {
    // Fondo de gradiente
    this.bgGradient = this.add.graphics();
    this.bgGradient.fillGradientStyle(0x123456, 0x654321, 0x321654, 0xabcdef, 1);
    this.bgGradient.fillRect(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height);

    this.controlBackGroundGradient();        

    this.loadingText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Loading...', {
        font: '32px Arial',
        fill: '#ffffff'
    }).setOrigin(0.5);

    // Crear el tween de escala para el efecto de rebote
    this.tweens.add({
        targets: this.loadingText,         // Objetivo de la animación
        scale: { from: 1, to: 1.2 },       // Escala (crecimiento y reducción)
        duration: 500,                     // Duración de cada pulso (en milisegundos)
        ease: 'Sine.easeInOut',            // Suavizado para un rebote natural
        yoyo: true,                        // Hace que la animación regrese a su escala original
        repeat: -1                         // Repite indefinidamente
    });

    // Configuración de colores y dimensiones
    const boxColor = 0x222222; // Color de fondo del cuadro
    const boxAlpha = 0.8;       // Transparencia del cuadro
    const borderRadius = 15;    // Radio de las esquinas redondeadas

    // Posición y tamaño del cuadro
    const boxX = 30, boxY = 300, boxWidth = 900, boxHeight = 30;

    // Dibujar el cuadro con bordes redondeados
    const progressBox = this.add.graphics();
    progressBox.fillStyle(boxColor, boxAlpha);
    progressBox.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, borderRadius); // Usa fillRoundedRect en lugar de fillRect

    // Barra de progreso
    const progressBar = this.add.graphics().setVisible(false);        

    // Actualizar la barra de progreso mientras se cargan los recursos
    this.load.on('progress', (value) => {
      progressBar.clear().setVisible(true);
      progressBar.fillGradientStyle(0x4ba3f7, 0x2196F3, 0x4ba3f7, 0x2196F3, 1);
      progressBar.fillRoundedRect(boxX + 5, boxY + 5, (boxWidth - 10) * value, boxHeight - 10, borderRadius - 5); // Resta un poco para el borde redondeado
      const percentage = (Math.floor(value * 100) == 100) ? '' : Math.floor(value * 100) + '%'; 
      this.loadingText.setText('Loading... ' + percentage);
    });       

    // Limpiar los gráficos al terminar la carga
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      this.loadingText.destroy();
    });

    // Partículas en movimiento
    this.createParticles();

    // Crear engranajes
    this.createGears();

    // Aquí carga los recursos en función de la escena objetivo
    this.load.path = './assets/';

    //Recursos para todas las scenas
    this.load
      .image('btn_listen',`img/icons/listen.png?${_autoVersionPhaser}`)
      .image('btn_todobien', `img/icons/todoBien.png?${_autoVersionPhaser}`)            

      .audio('winner', 'sonidos/winner.mp3')
    ;

    switch (this.targetScene ) {
      case 'Intro':
        //this.niveles.preload();
        
        //recursos del componente niveles
        this.load
          .image('bgLevels', `img/backgrounds/bg_levels.png?${_autoVersionPhaser}`)
          //Buttons
          .image('btn_home', `img/icons/home.png?${_autoVersionPhaser}`)
          .image('btn_speak_en', `img/icons/speak_english.png?${_autoVersionPhaser}`)
          .image('btn_speak_es', `img/icons/speak_spanish.png?${_autoVersionPhaser}`)

          // starts
          .image('0_stars', `img/niveles/0_stars.png?${_autoVersionPhaser}`)
          .image('1_stars', `img/niveles/1_stars.png?${_autoVersionPhaser}`)
          .image('2_stars', `img/niveles/2_stars.png?${_autoVersionPhaser}`)
          .image('3_stars', `img/niveles/3_stars.png?${_autoVersionPhaser}`)

          //Niveles
          .image('A', `img/niveles/A.png?${_autoVersionPhaser}`)
          .image('E', `img/niveles/E.png?${_autoVersionPhaser}`)
          .image('I', `img/niveles/I.png?${_autoVersionPhaser}`)
          .image('O', `img/niveles/O.png?${_autoVersionPhaser}`)
          .image('U', `img/niveles/U.png?${_autoVersionPhaser}`)

          //audios
          .audio('letraA', 'sonidos/scenaA/LetraA.mp3')
          .audio('letraE', 'sonidos/scenaA/LetraE.mp3')
          .audio('letraI', 'sonidos/scenaA/LetraI.mp3')
          .audio('letraO', 'sonidos/scenaA/LetraO.mp3')
          .audio('letraU', 'sonidos/scenaA/LetraU.mp3')

          //bg par alas indicaciones de cada nivel
          .image('bg_SceneA_indications', `img/backgrounds/bg_SceneA_indications.png?${_autoVersionPhaser}`)
          .image('bg_SceneE_indications', `img/backgrounds/bg_SceneE_indications.png?${_autoVersionPhaser}`)
          .image('bg_SceneI_indications', `img/backgrounds/bg_SceneI_indications.png?${_autoVersionPhaser}`)
          .image('bg_SceneO_indications', `img/backgrounds/bg_SceneO_indications.png?${_autoVersionPhaser}`)
          .image('bg_SceneU_indications', `img/backgrounds/bg_SceneU_indications.png?${_autoVersionPhaser}`)
        ;

        this.load
          .image('backgroundIntro',`img/backgrounds/backgroundIntro.png?${_autoVersionPhaser}`)
          .image('bgOverlay',`img/backgrounds/overlay_black.png?${_autoVersionPhaser}`)
          .image('btn_music',`img/icons/music_on.png?${_autoVersionPhaser}`)
          .image('recurso_star', `img/niveles/star.png?${_autoVersionPhaser}`)
        ;                
        this.load.audio('backgroundMusic', 'sonidos/bg_Intro.mp3');
      break;

      case 'SceneA':
        // parallax y player
        this.load.image('backgroundSky', 'img/backgrounds/bg_parallax_sky.png');
        this.load.image('backgroundMountains', 'img/backgrounds/bg_parallax_mountain.png');
        this.load.image('backgroundTrees', 'img/backgrounds/bg_parallax_trees.png');
        this.load.spritesheet('beeSprite', 'img/players/abeja/SPRITESHEET.png', { frameWidth: 510, frameHeight: 510 });        

        // Animales y objetos
        this.load
          .image('recurso_agua', 'img/niveles/A/agua.png')
          .image('recurso_aguacate', 'img/niveles/A/aguacate.png')
          .image('recurso_aguila', 'img/niveles/A/aguila.png')
          .image('recurso_alce', 'img/niveles/A/alce.png')
          .image('recurso_anillo', 'img/niveles/A/anillo.png')
          .image('recurso_araña', 'img/niveles/A/araña.png')
          .image('recurso_arbol', 'img/niveles/A/arbol.png')
          .image('recurso_ardilla', 'img/niveles/A/ardilla.png')
          .image('recurso_armadillo', 'img/niveles/A/armadillo.png')
          .image('recurso_asno', 'img/niveles/A/asno.png')
          .image('recurso_avestruz', 'img/niveles/A/avestruz.png')
          .image('recurso_avion', 'img/niveles/A/avion.png')
          .image('recurso_axolote', 'img/niveles/A/axolote.png')          
        ;

        // Stikers
        this.load
          .image('stiker_agua', 'img/niveles/A/stiker_agua.png')
          .image('stiker_aguacate', 'img/niveles/A/stiker_aguacate.png')
          .image('stiker_aguila', 'img/niveles/A/stiker_aguila.png')
          .image('stiker_alce', 'img/niveles/A/stiker_alce.png')
          .image('stiker_anillo', 'img/niveles/A/stiker_anillo.png')
          .image('stiker_araña', 'img/niveles/A/stiker_araña.png')
          .image('stiker_arbol', 'img/niveles/A/stiker_arbol.png')
          .image('stiker_ardilla', 'img/niveles/A/stiker_ardilla.png')
          .image('stiker_armadillo', 'img/niveles/A/stiker_armadillo.png')
          .image('stiker_asno', 'img/niveles/A/stiker_asno.png')
          .image('stiker_avestruz', 'img/niveles/A/stiker_avestruz.png')
          .image('stiker_avion', 'img/niveles/A/stiker_avion.png')
          .image('stiker_axolote', 'img/niveles/A/stiker_axolote.png')
          .image('stikerA', `img/niveles/stikerA.png`)
        ;
        
        // Sonidos
        this.load
          .audio('beeBuzzing', 'sonidos/scenaA/bees_buzzing.mp3')
          .audio('soundTheme_A', 'sonidos/scenaA/SoundTheme_A.mp3')
          .audio('translate_agua', 'sonidos/scenaA/translate_agua.mp3')
          .audio('translate_aguacate', 'sonidos/scenaA/translate_aguacate.mp3')
          .audio('translate_aguila', 'sonidos/scenaA/translate_aguila.mp3')
          .audio('translate_alce', 'sonidos/scenaA/translate_alce.mp3')
          .audio('translate_anillo', 'sonidos/scenaA/translate_anillo.mp3')
          .audio('translate_araña', 'sonidos/scenaA/translate_araña.mp3')
          .audio('translate_arbol', 'sonidos/scenaA/translate_arbol.mp3')
          .audio('translate_ardilla', 'sonidos/scenaA/translate_ardilla.mp3')
          .audio('translate_armadillo', 'sonidos/scenaA/translate_armadillo.mp3')
          .audio('translate_asno', 'sonidos/scenaA/translate_asno.mp3')
          .audio('translate_avestruz', 'sonidos/scenaA/translate_avestruz.mp3')
          .audio('translate_avion', 'sonidos/scenaA/translate_avion.mp3')
          .audio('translate_axolote', 'sonidos/scenaA/translate_axolote.mp3')
        ;
      break;
      
      case 'SceneE':
          this.load.image('bg_sceneE', 'img/backgrounds/bg_sceneE.png');
          this.load.spritesheet('elephantSprite', 'img/players/elefante/elefante_sprites.png', { frameWidth: 512, frameHeight: 512 });

          // Animales y objetos
          this.load
            .image('recurso_elefante', 'img/niveles/E/elefante.png')
            .image('recurso_enano', 'img/niveles/E/enano.png')
            .image('recurso_erizo', 'img/niveles/E/erizo.png')
            .image('recurso_escalera', 'img/niveles/E/escalera.png')
            .image('recurso_escarabajo', 'img/niveles/E/escarabajo.png')
            .image('recurso_escorpion', 'img/niveles/E/escorpion.png')
            .image('recurso_escudo', 'img/niveles/E/escudo.png')
            .image('recurso_escuela', 'img/niveles/E/escuela.png')
            .image('recurso_espada', 'img/niveles/E/espada.png')
            .image('recurso_espejo', 'img/niveles/E/espejo.png')
            .image('recurso_estrella', 'img/niveles/E/estrella.png')
            .image('recurso_estrellademar', 'img/niveles/E/estrellademar.png')
            .image('recurso_extintor', 'img/niveles/E/extintor.png')
          ;

          //Stikers
          this.load
            .image('stiker_elefante', 'img/niveles/E/stiker_elefante.png')
            .image('stiker_enano', 'img/niveles/E/stiker_enano.png')
            .image('stiker_erizo', 'img/niveles/E/stiker_erizo.png')
            .image('stiker_escalera', 'img/niveles/E/stiker_escalera.png')
            .image('stiker_escarabajo', 'img/niveles/E/stiker_escarabajo.png')
            .image('stiker_escorpion', 'img/niveles/E/stiker_escorpion.png')
            .image('stiker_escudo', 'img/niveles/E/stiker_escudo.png')
            .image('stiker_escuela', 'img/niveles/E/stiker_escuela.png')
            .image('stiker_espada', 'img/niveles/E/stiker_espada.png')
            .image('stiker_espejo', 'img/niveles/E/stiker_espejo.png')
            .image('stiker_estrella', 'img/niveles/E/stiker_estrella.png')
            .image('stiker_estrellademar', 'img/niveles/E/stiker_estrellademar.png')
            .image('stiker_extintor', 'img/niveles/E/stiker_extintor.png')
            .image('stikerE', `img/niveles/stikerE.png`)
          ;

          //Sonidos
          this.load
            .audio('elephantRetumb', 'sonidos/scenaE/elephant_retumb.mp3')
            .audio('soundTheme_E', 'sonidos/scenaE/SoundTheme_E.mp3')
            .audio('translate_elefante', 'sonidos/scenaE/translate_elefante.mp3')
            .audio('translate_enano', 'sonidos/scenaE/translate_enano.mp3')
            .audio('translate_erizo', 'sonidos/scenaE/translate_erizo.mp3')
            .audio('translate_escalera', 'sonidos/scenaE/translate_escalera.mp3')
            .audio('translate_escarabajo', 'sonidos/scenaE/translate_escarabajo.mp3')
            .audio('translate_escorpion', 'sonidos/scenaE/translate_escorpion.mp3')
            .audio('translate_escudo', 'sonidos/scenaE/translate_escudo.mp3')
            .audio('translate_escuela', 'sonidos/scenaE/translate_escuela.mp3')
            .audio('translate_espada', 'sonidos/scenaE/translate_espada.mp3')
            .audio('translate_espejo', 'sonidos/scenaE/translate_espejo.mp3')
            .audio('translate_estrella', 'sonidos/scenaE/translate_estrella.mp3')
            .audio('translate_estrellademar', 'sonidos/scenaE/translate_estrellademar.mp3')
            .audio('translate_extintor', 'sonidos/scenaE/translate_extintor.mp3')
          ;
      break;

      case 'SceneI':
        this.load.image('bg_sceneI', 'img/backgrounds/bg_sceneI.png');
        this.load.image('iguana_tronco', 'img/niveles/I/tronco.png');
        this.load.spritesheet('iguanaSprite', 'img/players/iguana/iguana_spritesheet.png', { frameWidth: 512, frameHeight: 512 });

        // Animales y objetos
        this.load
          .image('recurso_iglesia', 'img/niveles/I/iglesia.png')
          .image('recurso_iglu', 'img/niveles/I/iglu.png')
          .image('recurso_iguana', 'img/niveles/I/iguana.png')
          .image('recurso_iman', 'img/niveles/I/iman.png')
          .image('recurso_impala', 'img/niveles/I/impala.png')
          .image('recurso_impresora', 'img/niveles/I/impresora.png')
          .image('recurso_indio', 'img/niveles/I/indio.png')
          .image('recurso_insectos', 'img/niveles/I/insectos.png')
          .image('recurso_invierno', 'img/niveles/I/invierno.png')
          .image('recurso_inyeccion', 'img/niveles/I/inyeccion.png')
          .image('recurso_isla', 'img/niveles/I/isla.png')    
        ;

        // Stikers
        this.load
          .image('stikerI', `img/niveles/stikerI.png`)
          .image('stiker_iglesia', 'img/niveles/I/stiker_iglesia.png')
          .image('stiker_iglu', 'img/niveles/I/stiker_iglu.png')
          .image('stiker_iguana', 'img/niveles/I/stiker_iguana.png')
          .image('stiker_iman', 'img/niveles/I/stiker_iman.png')
          .image('stiker_impala', 'img/niveles/I/stiker_impala.png')
          .image('stiker_impresora', 'img/niveles/I/stiker_impresora.png')
          .image('stiker_indio', 'img/niveles/I/stiker_indio.png')
          .image('stiker_insectos', 'img/niveles/I/stiker_insectos.png')
          .image('stiker_invierno', 'img/niveles/I/stiker_invierno.png')
          .image('stiker_inyeccion', 'img/niveles/I/stiker_inyeccion.png')
          .image('stiker_isla', 'img/niveles/I/stiker_isla.png')
        ;

        // Sonidos
        this.load
          .audio('soundTheme_I', 'sonidos/scenaI/SoundTheme_I.mp3')
          .audio('translate_iglesia', 'sonidos/scenaI/translate_iglesia.mp3')
          .audio('translate_iglu', 'sonidos/scenaI/translate_iglu.mp3')
          .audio('translate_iguana', 'sonidos/scenaI/translate_iguana.mp3')
          .audio('translate_iman', 'sonidos/scenaI/translate_iman.mp3')
          .audio('translate_impala', 'sonidos/scenaI/translate_impala.mp3')
          .audio('translate_impresora', 'sonidos/scenaI/translate_impresora.mp3')
          .audio('translate_indio', 'sonidos/scenaI/translate_indio.mp3')
          .audio('translate_insectos', 'sonidos/scenaI/translate_insectos.mp3')
          .audio('translate_invierno', 'sonidos/scenaI/translate_invierno.mp3')
          .audio('translate_inyeccion', 'sonidos/scenaI/translate_inyeccion.mp3')
          .audio('translate_isla', 'sonidos/scenaI/translate_isla.mp3')
        ;
        break;

      case 'SceneO':
        // parallax y player
        this.load.image('backgroundMarinoL3', 'img/backgrounds/parallax_marino_L3.png');
        this.load.image('backgroundMarinoL2', 'img/backgrounds/parallax_marino_L2.png');
        this.load.image('backgroundMarinoL1', 'img/backgrounds/parallax_marino_L1.png');
        this.load.spritesheet('fishSprite', 'img/players/pez/pez_spritesheet.png', { frameWidth: 256, frameHeight: 256 });

        // Animales y objetos
        this.load
          .image('recurso_ocho', 'img/niveles/O/ocho.png')
          .image('recurso_ojo', 'img/niveles/O/ojo.png')
          .image('recurso_ola', 'img/niveles/O/ola.png')
          .image('recurso_olla', 'img/niveles/O/olla.png')
          .image('recurso_orangutan', 'img/niveles/O/orangutan.png')
          .image('recurso_orca', 'img/niveles/O/orca.png')
          .image('recurso_oreja', 'img/niveles/O/oreja.png')
          .image('recurso_oro', 'img/niveles/O/oro.png')
          .image('recurso_orquidea', 'img/niveles/O/orquidea.png')
          .image('recurso_oruga', 'img/niveles/O/oruga.png')
          .image('recurso_osopanda', 'img/niveles/O/osopanda.png')  
          .image('recurso_osopardo', 'img/niveles/O/osopardo.png')  
          .image('recurso_ostra', 'img/niveles/O/ostra.png')
        ; 

        // Stikers
        this.load
          .image('stikerO', `img/niveles/stikerO.png`)
          .image('stiker_ocho', 'img/niveles/O/stiker_ocho.png')
          .image('stiker_ojo', 'img/niveles/O/stiker_ojo.png')
          .image('stiker_ola', 'img/niveles/O/stiker_ola.png')
          .image('stiker_olla', 'img/niveles/O/stiker_olla.png')
          .image('stiker_orangutan', 'img/niveles/O/stiker_orangutan.png')
          .image('stiker_orca', 'img/niveles/O/stiker_orca.png')
          .image('stiker_oreja', 'img/niveles/O/stiker_oreja.png')
          .image('stiker_oro', 'img/niveles/O/stiker_oro.png')
          .image('stiker_orquidea', 'img/niveles/O/stiker_orquidea.png')
          .image('stiker_oruga', 'img/niveles/O/stiker_oruga.png')
          .image('stiker_osopanda', 'img/niveles/O/stiker_osopanda.png')  
          .image('stiker_osopardo', 'img/niveles/O/stiker_osopardo.png')  
          .image('stiker_ostra', 'img/niveles/O/stiker_ostra.png')
        ;

        // Sonidos
        this.load
          .audio('soundTheme_O', 'sonidos/scenaO/SoundTheme_O.mp3')
          .audio('translate_ocho', 'sonidos/scenaO/translate_ocho.mp3')
          .audio('translate_ojo', 'sonidos/scenaO/translate_ojo.mp3')
          .audio('translate_ola', 'sonidos/scenaO/translate_ola.mp3')
          .audio('translate_olla', 'sonidos/scenaO/translate_olla.mp3')
          .audio('translate_orangutan', 'sonidos/scenaO/translate_orangutan.mp3')
          .audio('translate_orca', 'sonidos/scenaO/translate_orca.mp3')
          .audio('translate_oreja', 'sonidos/scenaO/translate_oreja.mp3')
          .audio('translate_oro', 'sonidos/scenaO/translate_oro.mp3')
          .audio('translate_orquidea', 'sonidos/scenaO/translate_orquidea.mp3')
          .audio('translate_oruga', 'sonidos/scenaO/translate_oruga.mp3')
          .audio('translate_osopanda', 'sonidos/scenaO/translate_osopanda.mp3')  
          .audio('translate_osopardo', 'sonidos/scenaO/translate_osopardo.mp3')  
          .audio('translate_ostra', 'sonidos/scenaO/translate_ostra.mp3')
        ;
        break;

      case 'SceneU':
        // parallax y player
        this.load.image('backgroundSpaceL3', `img/backgrounds/parallax_universe_L3.png?${_autoVersionPhaser}`);
        this.load.image('backgroundSpaceL2', `img/backgrounds/parallax_universe_L2.png?${_autoVersionPhaser}`);
        this.load.image('backgroundSpaceL1', `img/backgrounds/parallax_universe_L1.png?${_autoVersionPhaser}`);
        this.load.spritesheet('naveSprite', 'img/players/navespacial/nave_spritesheet.png', { frameWidth: 256, frameHeight: 256 });
        
        //Animales y objetos
        this.load
          .image('stikerU', `img/niveles/stikerU.png`)
          .image('recurso_uchuva', 'img/niveles/U/uchuva.png')
          .image('recurso_ukulele', 'img/niveles/U/ukulele.png')
          .image('recurso_unas', 'img/niveles/U/unas.png')
          .image('recurso_unicornio', 'img/niveles/U/unicornio.png')
          .image('recurso_uniforme', 'img/niveles/U/uniforme.png')
          .image('recurso_unir', 'img/niveles/U/unir.png')
          .image('recurso_universidad', 'img/niveles/U/universidad.png')
          .image('recurso_universo', 'img/niveles/U/universo.png')
          .image('recurso_uno', 'img/niveles/U/uno.png')
          .image('recurso_urgencias', 'img/niveles/U/urgencias.png')
          .image('recurso_urna', 'img/niveles/U/urna.png')
          .image('recurso_urraca', 'img/niveles/U/urraca.png')
          .image('recurso_utiles', 'img/niveles/U/utiles.png')
          .image('recurso_uvas', 'img/niveles/U/uvas.png')
        ;

        // Stikers
        this.load
          .image('stikerU', `img/niveles/stikerU.png`)
          .image('stiker_uchuva', 'img/niveles/U/stiker_uchuva.png')
          .image('stiker_ukulele', 'img/niveles/U/stiker_ukulele.png')
          .image('stiker_unas', 'img/niveles/U/stiker_unas.png')
          .image('stiker_unicornio', 'img/niveles/U/stiker_unicornio.png')
          .image('stiker_uniforme', 'img/niveles/U/stiker_uniforme.png')
          .image('stiker_unir', 'img/niveles/U/stiker_unir.png')
          .image('stiker_universidad', 'img/niveles/U/stiker_universidad.png')
          .image('stiker_universo', 'img/niveles/U/stiker_universo.png')
          .image('stiker_uno', 'img/niveles/U/stiker_uno.png')
          .image('stiker_urgencias', 'img/niveles/U/stiker_urgencias.png')
          .image('stiker_urna', 'img/niveles/U/stiker_urna.png')
          .image('stiker_urraca', 'img/niveles/U/stiker_urraca.png')
          .image('stiker_utiles', 'img/niveles/U/stiker_utiles.png')
          .image('stiker_uvas', 'img/niveles/U/stiker_uvas.png')
        ;


        // Sonidos
        this.load
          .audio('soundTheme_U', 'sonidos/scenaU/SoundTheme_U.mp3')          
          .audio('translate_uchuva', 'sonidos/scenaU/translate_uchuva.mp3')
          .audio('translate_ukulele', 'sonidos/scenaU/translate_ukulele.mp3')
          .audio('translate_unas', 'sonidos/scenaU/translate_unas.mp3')
          .audio('translate_unicornio', 'sonidos/scenaU/translate_unicornio.mp3')
          .audio('translate_uniforme', 'sonidos/scenaU/translate_uniforme.mp3')
          .audio('translate_unir', 'sonidos/scenaU/translate_unir.mp3')
          .audio('translate_universidad', 'sonidos/scenaU/translate_universidad.mp3')
          .audio('translate_universo', 'sonidos/scenaU/translate_universo.mp3')
          .audio('translate_uno', 'sonidos/scenaU/translate_uno.mp3')
          .audio('translate_urgencias', 'sonidos/scenaU/translate_urgencias.mp3')
          .audio('translate_urna', 'sonidos/scenaU/translate_urna.mp3')
          .audio('translate_urraca', 'sonidos/scenaU/translate_urraca.mp3')
          .audio('translate_utiles', 'sonidos/scenaU/translate_utiles.mp3')
          .audio('translate_uvas', 'sonidos/scenaU/translate_uvas.mp3')
        ;

        break;
      
      default:
          break;
    }
      
  }

  create() {
      // Cuando los recursos estén completamente cargados, inicia la escena objetivo
      this.scene.start(this.targetScene);
  }

  createParticles() {
      // Crea un pequeño círculo como textura de partícula
      const particleGraphics = this.add.graphics();
      particleGraphics.fillStyle(0xffffff, 1);
      particleGraphics.fillCircle(5, 5, 5);
      particleGraphics.generateTexture('particle', 10, 10);
      particleGraphics.destroy();

      // Crear un emisor de partículas
      const particles = this.add.particles('particle');
      particles.createEmitter({
          x: { min: 0, max: this.sys.game.canvas.width },
          y: { min: 0, max: this.sys.game.canvas.height },
          speed: { min: -20, max: 20 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.5, end: 0 },
          alpha: { start: 1, end: 0 },
          lifespan: 3000,
          frequency: 100,
          quantity: 2,
          blendMode: 'ADD'
      });
  }

  controlBackGroundGradient() {
      // Crear el rectángulo del fondo
      this.bgGradient = this.add.graphics();

      // Variables para los colores del degradado
      this.color1 = Phaser.Display.Color.RandomRGB();
      this.color2 = Phaser.Display.Color.RandomRGB();
      this.colorStep = 0.01;  // Paso de transición entre colores (velocidad de cambio)

      // Dibujar el fondo inicial
      this.drawGradientBackground();

      // Evento de tiempo para actualizar el fondo regularmente
      this.time.addEvent({
          delay: 50, // Intervalo de tiempo en milisegundos entre cambios
          callback: this.updateGradientColors,
          callbackScope: this,
          loop: true
      });
  }

  drawGradientBackground() {
      // Limpiar el gráfico anterior
      this.bgGradient.clear();

      // Crear el degradado usando `fillGradientStyle`
      this.bgGradient.fillGradientStyle(
          this.color1.color, this.color2.color, 
          this.color2.color, this.color1.color, 1
      );
      
      // Dibuja un rectángulo que cubra toda la pantalla
      this.bgGradient.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
  }

  updateGradientColors() {
      // Interpolar entre colores para suavizar la transición
      this.color1 = Phaser.Display.Color.Interpolate.ColorWithColor(
          this.color1, Phaser.Display.Color.RandomRGB(), 100, 1
      );
      this.color2 = Phaser.Display.Color.Interpolate.ColorWithColor(
          this.color2, Phaser.Display.Color.RandomRGB(), 100, 1
      );

      // Convertir de objeto interpolado a color Phaser.Color
      this.color1 = new Phaser.Display.Color(
          this.color1.r, this.color1.g, this.color1.b
      );
      this.color2 = new Phaser.Display.Color(
          this.color2.r, this.color2.g, this.color2.b
      );

      // Volver a dibujar el fondo con los colores actualizados
      this.drawGradientBackground();
  }

  createGears() {
      const centerX = this.cameras.main.centerX;
      const centerY = this.cameras.main.centerY;

      // Crear engranajes
      this.gear1 = this.add.graphics({ x: centerX - 50, y: centerY -100 });
      this.gear2 = this.add.graphics({ x: centerX + 50, y: centerY -100});

      this.drawGear(this.gear1, 50, 10, 8, 0xffffff);
      this.drawGear(this.gear2, 40, 8, 12, 0xaaaaaa);

      // Animar engranajes
      this.tweens.add({
          targets: this.gear1,
          angle: 360,
          duration: 2000,
          repeat: -1
      });

      this.tweens.add({
          targets: this.gear2,
          angle: -360,
          duration: 1000,
          repeat: -1
      });
  }

  drawGear(graphics, radius, toothHeight, toothCount, color) {
      const stepAngle = Phaser.Math.PI2 / toothCount;
      const innerRadius = radius - toothHeight;

      graphics.fillStyle(color, 1);
      graphics.beginPath();

      for (let i = 0; i < toothCount; i++) {
          const angle1 = i * stepAngle;
          const angle2 = angle1 + stepAngle / 2;
          const angle3 = (i + 1) * stepAngle;

          const x1 = Math.cos(angle1) * innerRadius;
          const y1 = Math.sin(angle1) * innerRadius;
          const x2 = Math.cos(angle2) * radius;
          const y2 = Math.sin(angle2) * radius;
          const x3 = Math.cos(angle3) * innerRadius;
          const y3 = Math.sin(angle3) * innerRadius;

          if (i === 0) {
              graphics.moveTo(x1, y1);
          }

          graphics.lineTo(x2, y2);
          graphics.lineTo(x3, y3);
      }

      graphics.closePath();
      graphics.fillPath();

      // Agregar un círculo central
      graphics.fillStyle(0x000000, 1);
      graphics.fillCircle(0, 0, radius / 4);
  }
}

export default Loading;