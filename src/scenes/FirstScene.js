import Bacterium from "../clases/bacterium.js?v1.0?v=1.0.0";
import Player from "../clases/player.js?v=1.0.0";
import Virus from "../clases/virus.js?v=1.0.0";
import Bullet from "../clases/bullet.js?v=1.0.0";
import Powerup from "../clases/powerup.js?v=1.0.0";
import Boss from "../clases/boss.js?v=1.0.0";

class FirstScene extends Phaser.Scene {

    constructor(){
        super('FirstScene');
    }

    init(){
        this.respawn = 0;
        this.respawnInterval = 3000;
        this.scoreText = "";
        this.score = 0;
        this.scoreLimit = 800; //800
        this.lifesCounter = 5;
        this.lifesText = "";
        this.newLife = 250; // Nueva Vida cada X puntuación
        this.enemiesGlobalCounter = 0;
        this.invincible = false;
        this.ammo = 30; //30
        this.ammoText = "";
        this.powerupCounter = 0;
        this.finished = 0;
        
        
        //variables para barra de salud del boss
        this.vidaTotalBoss = 50
        this.actual_life =  50;
        this.life_width = 600;
        this.porcentaje = 100;
        this.colorBar = 0x27F058;
        
        //VARIABLESS para disparo super
        this.cargandoDisparo = false;
        this.duracionSpacePress = 0;

    }

    preload(){
        this.load.path = './assets/';
        //this.load.image(['doggy50','background','bullet','bullet2','virus']);
        //this.load.spritesheet('redsprite', 'redsprite.png', { frameWidth: 50, frameHeight: 66 });
        this.load.image('background',`img/backgrounds/background.png?v1?${_autoVersionPhaser}`)
            .image('backgroundFinal', `img/backgrounds/background-wc.png?v1?${_autoVersionPhaser}`)
            .image('final_boss', `img/backgrounds/final_boss.png?${_autoVersionPhaser}`)
            .image('bullet2',`img/bullet2.png?${_autoVersionPhaser}`)
            .image('virus1',`img/virus1.png?${_autoVersionPhaser}`)
            .image('virus2',`img/virus2.png?${_autoVersionPhaser}`)
            .image('virus3',`img/virus3.png?${_autoVersionPhaser}`)
            .image('bacterium1',`img/bacterium1.png?${_autoVersionPhaser}`)
            .image('bacterium2',`img/bacterium2.png?${_autoVersionPhaser}`)
            .image('bacterium3',`img/bacterium3.png?${_autoVersionPhaser}`)
            .image('boss1',`img/boss1.png?${_autoVersionPhaser}`)
            .image('boss2',`img/boss2.png?${_autoVersionPhaser}`)
            .image('powerup',`img/powerup.png?${_autoVersionPhaser}`)
            .image('life',`img/life.png?${_autoVersionPhaser}`)
            .image('soap',`img/soap.png?${_autoVersionPhaser}`)
            .image('ammunation',`img/ammunation.png?${_autoVersionPhaser}`)
            .image('reload',`img/reload.png?${_autoVersionPhaser}`)
            
            .spritesheet('redsprite', 'img/redsprite.png', { frameWidth: 50, frameHeight: 66 })
            .spritesheet('loadSuperSprite', 'img/loadSprite.png', { frameWidth: 50, frameHeight: 50 })
            .audio('pop',['sonidos/pop.wav'])
            .audio('shot',['sonidos/shot.wav'])
            .audio('killed',['sonidos/killed.wav'])
            .audio('rebound',['sonidos/rebound.wav'])    
            .audio('bgmusic',['sonidos/bgmusic.mp3'])    
            .audio('inicioBoss',['sonidos/inicioBoss.mp3'])    
            .audio('bgBossMusic',['sonidos/musicBoss.mp3'])    
        ;
    }

    create(){
        // TEXTS
        this.lifesText = this.add.text(70, 10, 'X ' + this.lifesCounter, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.lifesText.setDepth(1);        
        this.scoreText = this.add.text(this.sys.game.canvas.width / 2 - 65, 0, 'RECORD: ' + this.score, { fontStyle: 'strong', font: '19px Arial', fill: '#6368BC' });
        this.scoreText.setDepth(1);        
        this.ammoText = this.add.text(this.sys.game.canvas.width - 200, 10, 'MUNICIÓN: ' + this.ammo, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.ammoText.setDepth(1);

        // CREATE AUDIOS
        this.popSound = this.sound.add('pop');
        this.shotSound = this.sound.add('shot');
        this.killedSound = this.sound.add('killed');
        this.reboundSound = this.sound.add('rebound');
        this.inicioBossSound = this.sound.add('inicioBoss');

        // BACKGROUND MUSIC
        this.backgroundMusic = this.sound.add('bgmusic');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
        this.backgroundMusicBoss = this.sound.add('bgBossMusic');
        this.backgroundMusicBoss.loop = true;

         // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys();

        // CREATE SPRITES
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        this.lifeSprite = this.add.image(30, 18, 'life').setDepth(1);
        this.ammoImage = this.physics.add.image(40, this.sys.game.canvas.height - 30, 'ammunation').setActive(true).setDepth(1).setVisible(false);
        this.reloadImage = this.add.image(50, this.sys.game.canvas.height - 80, 'reload').setVisible(false);
        this.imgBossFinal = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'final_boss').setVisible(false);

        //DETECTAR PULSACION DE TECLAS
        const keys = Phaser.Input.Keyboard.KeyCodes;     
        this.keyZ = this.input.keyboard.addKey(keys.Z);
        this.keyEnter = this.input.keyboard.addKey(keys.ENTER);


        // PLAYER
        this.player = new Player(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height, 'redsprite');

         // GROUPS
        this.virusGroup = new Virus(this.physics.world, this);
        this.bacteriumGroup = new Bacterium(this.physics.world, this);
        this.boosGroup = new Boss(this.physics.world, this);
        this.bulletsGroup = new Bullet(this.physics.world, this);
        this.powerupGroup = new Powerup(this.physics.world, this);

         // ADD COLIDERS BETWEEN SPRITES        
        this.physics.add.overlap(this.player, [this.virusGroup, this.bacteriumGroup], this.hitPlayer, null, this);
        this.physics.add.collider(this.bulletsGroup, [this.virusGroup, this.bacteriumGroup, this.boosGroup], this.hitEnemies, null, this);
        this.physics.add.collider(this.bulletsGroup,  this.powerupGroup, this.hitPowerup, null, this);
        this.physics.add.overlap(this.player, this.ammoImage, this.reloadAmmo, null, this);
        this.physics.add.overlap(this.player, [this.boosGroup], this.hitPlayerBoss, null, this);

        //CREAR BARRA DE SALUD DEL BOSS
        this.life_bar = new Phaser.Geom.Rectangle(150, 36, this.life_width, 10);
        this.graphics = this.add.graphics({ fillStyle: { color: this.colorBar } });
        this.graphics.fillRectShape(this.life_bar).setVisible(false);
        
    }
    
    fire() {
        if (this.ammo >= 1 && this.powerupCounter === 0) {
            this.bulletsGroup.newItem();
            this.shotSound.play();
            this.ammo--;
            this.ammoText.setText('MUNICIÓN: ' + this.ammo);
        }
    
        if (this.ammo == 0 && this.powerupCounter === 0) {
            this.reloadImage.setVisible(true).setActive(true);
            this.ammoImage.setVisible(true).setActive(true);
        }
    
        if (this.powerupCounter > 0){
            this.bulletsGroup.newDoubleItem();
            this.shotSound.play();
            this.powerupCounter--;
        } 
    }    

    //Añadiendo los enemigos
    addEnemy(type) {
        this.reboundSound.play();
        this.enemiesGlobalCounter++;
    
        switch (type) {
            case 0:
                this.bacteriumGroup.newItem();
                break;
            case 1:
                this.virusGroup.newItem();
                break;
            default: 
                setTimeout(() => {
                    this.background.setTexture('backgroundFinal');
                    this.imgBossFinal.setVisible(false);
                    this.inicioBossSound.stop();
                    this.backgroundMusicBoss.play();
                    this.graphics.setVisible(true);
                    this.boosGroup.newItem();
                }, 3000);
                
        }
    }

    //colision de jugador y enemigo
    hitPlayer(player, enemy) {
        if (!this.invincible) {
            this.invincible = true;
            this.killedSound.play();
            this.lifesCounter--;
            this.lifesText.setText('X ' + this.lifesCounter);
            enemy.destroy();
            player.setTint(0x1abc9c);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.invincible = false;
                    player.clearTint();
                }
            });
    
            if (this.lifesCounter <= 0) {
                this.virusGroup.clear(true, true); // clear( [removeFromScene] [, destroyChild])
                this.bacteriumGroup.clear(true, true);
                this.bulletsGroup.clear(true, true);
                this.backgroundMusic.stop();
                //this.scene.restart();
                //this.scene.start('Intro');
                this.finished = 1;   
            }
    
        }       
    }
    
    //colision del jugador con el boss
    hitPlayerBoss(player, enemy) {

        if (!this.invincible) {
            this.invincible = true;
            this.killedSound.play();
            this.lifesCounter--;
            if (this.lifesCounter > 0) {
                this.lifesText.setText('X ' + this.lifesCounter);
            }

            
            player.setTint(0x1abc9c);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.invincible = false;
                    player.clearTint();
                }
            });

            if (this.lifesCounter == 0) {

                this.virusGroup.clear(true, true); // clear( [removeFromScene] [, destroyChild])
                this.bacteriumGroup.clear(true, true);
                this.bulletsGroup.clear(true, true);
                this.boosGroup.clear(true, true);
                this.backgroundMusicBoss.stop();
                this.finished = 1;
            }

        }
    }

    //Colisión entre el disparo y los enemigos
    hitEnemies(bullet, enemy) {
        //console.log(enemy.texture.key);
        bullet.setVisible(false);
        bullet.setActive(false);
        bullet.destroy();
    
        enemy.hitsToKill--;

        //controlar la barra de salud del boss
        if(enemy.texture.key == "boss1" || enemy.texture.key == "boss2"){
            this.controlBarraSAlusBoss();
        }
    
        if (enemy.hitsToKill == 0) {
            enemy.destroy();
            this.popSound.play();
            this.score += 10; //(enemy.texture.key == 'virus')?  10 : 50;
            this.scoreText.setText('RECORD: ' + this.score);
            
            //Obtener nueva vida
            if (this.score % this.newLife == 0) {
                this.lifesCounter++;
                this.lifesText.setText('X ' + this.lifesCounter);
            }

            //al derrotar al boss
            console.log(enemy.texture.key);
            if(enemy.texture.key == "boss1" || enemy.texture.key == 'boss2'){
                this.backgroundMusicBoss.stop();

                window.parent.gestionarAvanceJuego(11,'NivelDisponibleUsario',2)

                let niveles = [
                    {nombre: "Laboratory", idJuego: 11, nivel: "1",disponible: 'S'},
                    {nombre: "Space", idJuego: 11, nivel: "2",disponible: 'S'}
                ]
                //guardar en local storage el avance del juego para el usuario actual
                window.parent.guardar_datos_juegos(niveles);

                //guardar_datos_juegos(niveles);

                //DESTRUIR LOS BG AUDIOS DE LA SCENA
                this.backgroundMusicBoss.destroy();
                this.backgroundMusic.destroy();

                this.scene.start('Winner');
            }
        }

        if (this.score == this.scoreLimit) {
            this.imgBossFinal.setVisible(true);
            this.backgroundMusic.stop();
            this.inicioBossSound.play(); 
            
            this.virusGroup.clear(true, true); // clear( [removeFromScene] [, destroyChild])
            this.bacteriumGroup.clear(true, true);
            this.bulletsGroup.clear(true, true);
        }
    }

    //PowerUp
    hitPowerup(bullet, bubble) {
        this.hitEnemies(bullet, bubble);
        this.powerupCounter = 10;
    }

    reloadAmmo() {
        if (this.ammo === 0) {
            this.ammo = 30;
            var randomX = Phaser.Math.Between(40, this.sys.game.canvas.width - 50);
            this.reloadImage.setX(randomX).setActive(false).setVisible(false);
            this.ammoImage.setX(randomX).setActive(false).setVisible(false);
            this.ammoText.setText('MUNICIÓN: ' + this.ammo);
        }    
    }

    controlBarraSAlusBoss(){
        this.graphics.clear();

        this.actual_life--;
        this.porcentaje = (this.actual_life/this.vidaTotalBoss)*100;
        this.life_width = (600*this.porcentaje)/100;

        if(this.porcentaje <= 50){this.colorBar = 0xFEC93C;}
        if(this.porcentaje <= 30){this.colorBar = 0xFB5304;}
        if(this.porcentaje <= 10){this.colorBar = 0xFB0F04;}

        this.life_bar.width = this.life_width;
        this.graphics = this.add.graphics({ fillStyle: { color: this.colorBar } });
        this.graphics.fillRectShape(this.life_bar).setVisible(true);
    }
    
    cargarDisparoSuper(){
        console.log(
            this.anims.generateFrameNumbers('loadSuperSprite', { start: 0, end: 11 })
        );
        this.bulletsGroup.newLoadSuper();
    }

    update(time, delta){
        // INPUT CONTROL        
        if (this.input.keyboard.checkDown(this.cursors.space, 250) && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.player.setVelocity(0, 0)
                .anims.play('turn');
            this.fire();
        }      
        
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
                .anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
                .anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0)
                .anims.play('turn');
        }


        
        /* this.duracionSpacePress = this.cursors.space.getDuration();

        // VALIDAR SI EJECUTAR DISPARO NORMAL O SUPER    
        if(this.duracionSpacePress < 1000){
            if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && !this.cursors.left.isDown && !this.cursors.right.isDown && !this.cargandoDisparo){
                console.log("Has presionado SPACE");
                console.log(this.cargandoDisparo);
                
    
                this.player.setVelocity(0, 0)
                    .anims.play('turn');
                this.fire();
            }
        }else if (this.duracionSpacePress > 1000 && !this.cargandoDisparo){
            console.log(this.cargandoDisparo);
            this.cargandoDisparo = true;
            console.log("Cargar disparo super");
            this.cargarDisparoSuper();
        } */
        


        //  ENEMIES RESPAWN CONTROL AFTER GAME OVER
        if (time > this.respawnInterval && this.respawn == 0) {
            this.respawn = Math.trunc(time);
        }

        if (time > this.respawn && this.score <= this.scoreLimit) {
            // POWERUP
            if (this.enemiesGlobalCounter % 15 == 0 && this.enemiesGlobalCounter != 0) {
                this.powerupGroup.newItem();
            }

            if (this.score < this.scoreLimit) {

                if (this.enemiesGlobalCounter % 5 == 0 && this.enemiesGlobalCounter != 0) {

                    if (this.respawnInterval > 600) {
                        this.respawnInterval -= 100;
                    }
                    this.addEnemy(0);
                }
                else {
                    this.addEnemy(1);
                }
            }else{
                this.addEnemy(2);
                this.score++;
            }

            this.respawn += this.respawnInterval;
        }

        if(this.finished > 0){
            this.scene.start('GameOver');
            this.finished = 0;
        }
        
    }
}

export default FirstScene;