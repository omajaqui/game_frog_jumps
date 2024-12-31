//clases para segunda escena
import Meteorito from "../clases/Meteorito.js?v=1.0.0";
import Explosion from "../clases/Explosion.js?v=1.0.0";
import PlayerSpacio from "../clases/PlayerSpacio.js?v=1.0.0";
import PlayerSpacioShield from "../clases/PlayerSpacioShield.js?v=1.0.0";
import Bullet from "../clases/bullet.js?v=1.0.0";
import BossCentinela from "../clases/BossCentinela.js?v=1.0.0";

class SecondScene extends Phaser.Scene {

    constructor(){
        super('SecondScene');
    }

    init(){
        //variables game
        this.cw = this.sys.game.canvas.width;
        this.ch = this.sys.game.canvas.height;

        this.respawn = 0;
        this.respawnInterval = 3000;
        this.scoreText = "";
        this.score = 0;
        this.scoreLimit = 400;;
        this.lifesCounter = 5;
        this.lifesText = "";
        this.newLife = 200; // Nueva Vida cada X puntuación
        this.enemiesGlobalCounter = 0;
        this.invenciblePlayer = false;
        this.ammo = 30; //30
        this.ammoText = "";
        this.powerupCounter = 0;
        this.finished = 0;
    
        
        
        //variables para barra de salud del boss
        this.vidaTotalBoss = 50; //50
        this.actual_life =  50; //50
        this.life_width = 300;
        this.porcentaje = 100;
        this.colorBar = 0x27F058;

        //
        this.moveMeteoro = false;
        this.iddlePlayer = false;
        this.golpesTierra = 0;
        this.animarExplosion1 = false;
        this.animarExplosion2 = false;
        this.animarExplosion3 = false;
        this.animarExplosion4 = false;
        this.animarExplosion5 = false;
        this.enfriandoArmar = false;
        this.animarFireBoss = false;
        this.bossEnMovimiento = false;
        this.escudoCreado = false;
        this.invencibleBoss = false;
        this.bossDie = false;

    }

    preload(){
        this.load.path = './assets/';
        this.load.image('bg',`img/backgrounds/space_01.png?${_autoVersionPhaser}`)
            .image('hearth',`img/planet_hearth.png?${_autoVersionPhaser}`) 
            .image('life',`img/life.png?${_autoVersionPhaser}`)
            .image('mt01',`img/meteoritos/mt01.png?${_autoVersionPhaser}`)
            .image('mt02',`img/meteoritos/mt02.png?${_autoVersionPhaser}`)
            .image('mt03',`img/meteoritos/mt03.png?${_autoVersionPhaser}`)
            .image('asteroide01',`img/meteoritos/asteroide01.png?${_autoVersionPhaser}`)
            .image('asteroide02',`img/meteoritos/asteroide02.png?${_autoVersionPhaser}`)
            .image('asteroide03',`img/meteoritos/asteroide03.png?${_autoVersionPhaser}`)
            .image('misil',`img/misil.png?${_autoVersionPhaser}`)
            .image('misil_boss',`img/misil_left.png?${_autoVersionPhaser}`)
            .image('icon_misil',`img/icons/icon_misil.png?${_autoVersionPhaser}`)
            .image('icon_misil_ammo',`img/icons/icon_misil_ammo.png?${_autoVersionPhaser}`)
            .image('final_boss', `img/backgrounds/final_boss.png?${_autoVersionPhaser}`)            

            //SPRITES 
            .spritesheet('explosion1', 'img/sprites/explosion_01_50x50.png', { frameWidth: 50, frameHeight: 50 })
            .spritesheet('redSpacio', 'img/PlayerFly/redSprite_spacio.png', { frameWidth: 73, frameHeight: 100 })
            .spritesheet('boss_centinela', 'img/boss/centinela_sprite.png', { frameWidth: 300, frameHeight: 180 })
            .spritesheet('shield', 'img/PlayerFly/escudoSprite.png', { frameWidth: 100, frameHeight: 100 })

            .audio('pop',['sonidos/pop.wav'])
            .audio('shot',['sonidos/shot.wav'])
            .audio('killed',['sonidos/killed.wav'])
            .audio('fire_boss',['sonidos/disparo_boss.mp3'])
            .audio('inicioBoss',['sonidos/inicioBoss.mp3'])

            //https://licensing.jamendo.com/es/catalogo/proyecto/videojuegos
            .audio('bgMusic',['sonidos/bgMusicSpacio.mp3'])    
            .audio('bgMusicBoss',['sonidos/bgMusicSpacioBoss.mp3'])    
        ;
    }

    async create(){
        // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys(); 

        // TEXTS
        this.lifesText = this.add.text(this.cw-165, 10, 'X ' + this.lifesCounter, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.lifesText.setDepth(1);        
        this.scoreText = this.add.text(this.cw / 2 - 65, 0, 'RECORD: ' + this.score, { fontStyle: 'strong', font: '19px Arial', fill: '#6368BC' });
        this.scoreText.setDepth(1);        
        this.ammoText = this.add.text(this.cw - 50, 10,this.ammo, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.ammoText.setDepth(1);
        
        // CREATE AUDIOS
        this.popSound = this.sound.add('pop');
        this.shotSound = this.sound.add('shot');
        this.killedSound = this.sound.add('killed');
        this.disparoBossSound = this.sound.add('fire_boss');
        this.inicioBossSound = this.sound.add('inicioBoss');

        // BACKGROUND MUSIC
        this.bgMusic = this.sound.add('bgMusic');
        this.bgMusic.loop = true;
        this.bgMusic.play();
        this.bgMusicBoss = this.sound.add('bgMusicBoss');
        this.bgMusicBoss.loop = true;

        // CREATE SPRITES
        this.background = this.add.image(this.cw / 2, this.ch / 2, 'bg');
        this.lifeSprite = this.add.image(this.cw-200, 18, 'life').setDepth(1);
        this.misilIconSprite = this.add.image(this.cw - 70, 25, 'icon_misil').setDepth(1);
        this.hearth     = this.physics.add.image(this.cw / 2, this.ch / 2, 'hearth').setScale(2).setCircle(175).setImmovable(true); 
        this.ammoImage  = this.physics.add.image(this.cw / 4, 20, 'icon_misil_ammo')
                                         .setActive(false)
                                         .setDepth(2)
                                         .setVisible(false);
        this.imgBossFinal = this.add.image(this.cw/2, this.ch/2,'final_boss').setVisible(false);

        //OBJETOS DE CLASES
        this.explosion1 = new Explosion(this, 100, 100, 'explosion1').setImmovable(true).setVisible(false);
        this.explosion2 = new Explosion(this, 30, 70, 'explosion1').setImmovable(true).setVisible(false);
        this.explosion3 = new Explosion(this, 70, 175, 'explosion1').setImmovable(true).setVisible(false);
        this.explosion4 = new Explosion(this, 100, 250, 'explosion1').setImmovable(true).setVisible(false);
        this.explosion5 = new Explosion(this, 30, 280, 'explosion1').setImmovable(true).setVisible(false);
        this.player     = new PlayerSpacio(this, this.cw / 4, this.ch + 200, 'redSpacio');
        this.pShield    = new PlayerSpacioShield(this, this.cw / 4, this.ch + 200, 'shield').setVisible(false).setActive(false);
        this.centinela  = new BossCentinela(this,this.cw +160, this.ch / 2, 'boss_centinela').setVisible(false).setActive(false);

        //CONTENEDORES
        this.containerInfo = this.add.container(0, -100, 
            [ this.lifeSprite, this.lifesText, this.scoreText, this.misilIconSprite, this.ammoText]
        ).setDepth(5);

        // GROUPS
        this.misilGroup = new Bullet(this.physics.world, this);
        this.misil_boss_Group = new Bullet(this.physics.world, this);
        this.meteoroGroup = new Meteorito(this.physics.world, this);
        

        await this.reducirPlanet();         
        //TWEENS
        this.controlTweens('hearth');        

        // ADD COLIDERS BETWEEN SPRITES
        this.physics.add.collider(this.hearth, [this.meteoroGroup, this.misilGroup, this.misil_boss_Group], this.hithearth, null, this);
        this.physics.add.collider(this.misilGroup, this.meteoroGroup, this.hitMisil, null, this);
        this.physics.add.collider(this.centinela, this.misilGroup, this.hitBoss, null, this);
        this.physics.add.collider(this.player, [this.meteoroGroup,this.misilGroup, this.misil_boss_Group], this.hitPlayer, null, this);
        this.physics.add.overlap(this.player, this.ammoImage, this.reloadAmmo, null, this);

        //CREAR BARRA DE SALUD DEL BOSS
        this.life_bar = new Phaser.Geom.Rectangle(590, -10, this.life_width, 10);
        this.vida_boss = this.add.graphics({ fillStyle: { color: this.colorBar } });
        this.vida_boss.fillRectShape(this.life_bar).setVisible(false).setDepth(2);
        
         
        
    }
    
    reducirPlanet(){
        return new Promise(async (resolve)=>{
            let scale = 2;
            for(let i=0; i<20; i++){
                scale -= 0.058;
                this.hearth.setScale(scale);               
                await delay(100);
            }            
            resolve(true)
        });
    }

    controlTweens(tween){
        let self = this;
        switch(tween){
            case 'hearth':
                this.tweenHearth = this.tweens.add({
                    targets: this.hearth,
                    x: 20,
                    angle: 360,
                    ease: 'Power1',
                    duration: 5000,
                    delay: 500,
                    yoyo: false,
                    //repeat: 1,
                    onStart: function () { },
                    onComplete: function () {
                        self.completAnimationPlanet();
                    },
                    //onUpdate: function () {}
                    //onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
                    //onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
                });
            break;

            case 'containerInfo':
                this.tweenHearth = this.tweens.add({
                    targets: this.containerInfo,
                    y: 0,
                    ease: 'Power1',
                    duration: 2000,
                    onComplete: function () {
                        //self.moveMeteoro = true;                     
                    },
                });
            break;
            
            case 'player':
                this.iddlePlayer = true;                
                this.tweens.add({
                    targets: [this.player],
                    y: this.ch/2,
                    ease: 'Power1',
                    duration: 2000,
                    onComplete: function () {
                        self.moveMeteoro = true;
                        self.player.setCollideWorldBounds(true);                                             
                    },
                });
            break;

            case 'mostrarBoss':
                this.iddleBoss = true;                
                this.tweens.add({
                    targets: this.centinela,
                    x: this.cw-160,
                    ease: 'Power1',
                    duration: 3000,
                    onComplete: function () {
                        self.controlTweens('mostrarVidaBoss');
                        setTimeout(() => {
                            //mostrar jefe
                            self.controlTweens('movimientoBoss');                            
                        }, 1000);                         
                    },                    
                });
            break;

            case 'movimientoBoss':
                this.centinela.setY(50);
                this.bossEnMovimiento = true;              
                this.tweenMovBoss = this.tweens.add({
                    targets: this.centinela,
                    y: this.ch-40,
                    ease: 'Power2',
                    duration: 3000,
                    delay: 1000,
                    yoyo: true,
                    hold: 1000,                    
                    repeat: -1         
                });
            break;

            case 'mostrarVidaBoss':
                this.vida_boss.setVisible(true);           
                this.tweens.add({
                    targets: this.vida_boss,
                    y: 50,
                    ease: 'Power2',
                    duration: 2000,   
                });
            break;
        }
    }

    completAnimationPlanet(){
        //console.log("complete animation planets");
        this.controlTweens('containerInfo');
        this.controlTweens('player');
    }

    hithearth(hearth,objeto){
        console.log('glope a tierra');
        this.golpesTierra ++;
        if(this.golpesTierra < 6){
            objeto.destroy();
            switch(this.golpesTierra){
                case 1: this.explosion1.setVisible(true); this.animarExplosion1 = true; break;
                case 2: this.explosion2.setVisible(true); this.animarExplosion2 = true; break;
                case 3: this.explosion3.setVisible(true); this.animarExplosion3 = true; break;
                case 4: this.explosion4.setVisible(true); this.animarExplosion4 = true; break;
                case 5: this.explosion5.setVisible(true); this.animarExplosion5 = true; break;
            }
        }else{
            console.log("planeta destruido")
            this.finished = 1;
        }
    }

    hitMisil(bullet,enemy){ 
        
        bullet.setVisible(false);
        bullet.setActive(false);
        bullet.destroy();        
        switch(enemy.texture.key){
            case 'mt01':
            case 'mt02':
            case 'mt03':
            case 'asteroide01':
            case 'asteroide02':
            case 'asteroide03':
                enemy.hitsToKill --;
                if(enemy.hitsToKill == 0){
                    enemy.destroy();
                    this.popSound.play();
                    this.score += 10;
                    this.scoreText.setText('RECORD: ' + this.score);                    

                    //Obtener nueva vida
                    if (this.score % this.newLife == 0) {
                        this.lifesCounter++;
                        this.lifesText.setText('X ' + this.lifesCounter);
                    }

                    if (this.score == this.scoreLimit) {
                        this.moveMeteoro = false;
                        this.bgMusic.stop();
                        this.centinela.setVisible(true).setActive(true);

                        this.imgBossFinal.setVisible(true);                        
                        this.inicioBossSound.play(); 

                        this.meteoroGroup.clear(true,true); // clear( [removeFromScene] [, destroyChild])
                        this.misilGroup.clear(true,true);

                        this.time.addEvent({
                            delay: 3000,
                            callback: () => {
                                this.imgBossFinal.setVisible(false);
                                this.inicioBossSound.stop();
                                this.bgMusicBoss.play();
                                this.controlTweens('mostrarBoss');  
                            }
                        });
                    }

                }else{
                    let velX = (enemy.texture.key.includes('mt'))? -150 : -100;
                    enemy.setVelocityX(velX);
                }              
            break;

            case 'misil':
                console.log("colision misil->meteoro")
            break;
        }
        
    }
    hitBoss(boss,misil){
        misil.setVisible(false);
        misil.setActive(false);
        misil.destroy();

        if (!this.invencibleBoss) {            
            this.actual_life --;
            if(this.bossEnMovimiento) { this.controlBarraSaludBoss(); }
            
            if( this.actual_life > 0){
                this.iddleBoss = false;
                this.animarFireBoss = false;
                this.invencibleBoss = true;

                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.invencibleBoss = false;
                        this.iddleBoss = true;
                    }
                });
            }
            
            if( this.actual_life == 0){
                this.iddleBoss = false;
                this.misilGroup.clear(true,true);
                this.misil_boss_Group.clear(true,true);
                //destruir boss
                this.destruisBoss(boss);
                this.popSound.play();                         
            }
        }
    }

    hitPlayer(player,object){
        if (!this.invenciblePlayer) {
            this.invenciblePlayer = true;
            this.killedSound.play();
            this.lifesCounter--;
            this.lifesText.setText('X ' + this.lifesCounter);
            object.destroy();
            player.setTint(0x1abc9c);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.invenciblePlayer = false;
                    player.clearTint();
                }
            });
    
            if (this.lifesCounter <= 0) {
                this.meteoroGroup.clear(true, true); // clear( [removeFromScene] [, destroyChild])                
                this.finished = 1;   
            }
    
        }  
    }
    
    hitShield(shield,object){
        if(object.texture.key == 'misil_boss' && this.cursors.left.isDown){
            object.destroy();
        }
    }


    //Añadiendo los enemigos
    addEnemy(type) {
        //this.reboundSound.play();
        this.enemiesGlobalCounter++;
        let rebote = Phaser.Math.Between(0,10);
        rebote = ((rebote == 8 || rebote == 4 ))? true : false;
        switch (type) {
            case 0:                
                this.meteoroGroup.newItem('asteroide0',rebote);                
            break;
            case 1:
                this.meteoroGroup.newItem('mt0',rebote);
            break;
        }
    }
    
    fire() {        
        if (this.ammo >= 1 && this.powerupCounter === 0) {
            this.misilGroup.newItemSpacial();
            this.shotSound.play();
            this.ammo--;
            this.ammoText.setText(this.ammo);
        }
    
        if (this.ammo == 0) {
            this.ammoImage.setVisible(true).setActive(true);
        }
    }

    fire_boss(){
        this.misil_boss_Group.newItemSpacialBoss();
        this.disparoBossSound.play();
        this.animarFireBoss = true;
    }
    
    reloadAmmo() {
        if (this.ammo === 0) {
            this.ammo = 30;
            var randomY = Phaser.Math.Between(20, this.ch-20);
            this.ammoImage.setY(randomY).setActive(false).setVisible(false);
            this.ammoText.setText(this.ammo);
        }    
    }

    controlBarraSaludBoss(){
        this.vida_boss.clear();
        this.porcentaje = (this.actual_life/this.vidaTotalBoss)*100;
        this.life_width = (300*this.porcentaje)/100;

        if(this.porcentaje <= 50){this.colorBar = 0xFEC93C;}
        if(this.porcentaje <= 30){this.colorBar = 0xFB5304;}
        if(this.porcentaje <= 10){this.colorBar = 0xFB0F04;}

        //this.life_bar = new Phaser.Geom.Rectangle(590, -10, this.life_width, 10);
        this.life_bar.y = 50;
        this.life_bar.width = this.life_width;
        this.vida_boss = this.add.graphics({ fillStyle: { color: this.colorBar } });
        this.vida_boss.fillRectShape(this.life_bar).setVisible(true);
    }

    destruisBoss(boss){
        this.bossDie = true;
        this.iddleBoss = false;
        this.bossEnMovimiento = false;
        this.animarFireBoss = false;
        this.tweenMovBoss.stop(); //detener el movimiento del sprite del boss

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.iddleBoss = false;
                this.bossDie = false;
                boss.destroy();
                this.bgMusicBoss.stop();

                //cuando exista la scena 3
                //window.parent.gestionarAvanceJuego(11,'NivelDisponibleUsario',3)

                let niveles = [
                    {nombre: "Laboratory", idJuego: 11, nivel: "1",disponible: 'S'},
                    {nombre: "Space", idJuego: 11, nivel: "2",disponible: 'S'}
                    //aqui se habilitaria el siguiente nivel ejemplo
                    //{nombre: "", idJuego: 11, nivel: "3",disponible: 'S'}
                ]
                //guardar en local storage el avance del juego para el usuario actual
                window.parent.guardar_datos_juegos(niveles);
                //guardar_datos_juegos(niveles);

                this.scene.start('Winner');
            }
        });

          
    }
    

    update(time, delta){
        // INPUT CONTROL
        if (this.input.keyboard.checkDown(this.cursors.space, 250) && this.iddlePlayer && !this.cursors.left.isDown) {
            if(!this.enfriandoArmar){
                this.fire();
                this.enfriandoArmar = true;
                setTimeout(()=>{
                    this.enfriandoArmar = false;
                },500);
            }  
            
        }else if (this.cursors.up.isDown && this.iddlePlayer && !this.cursors.left.isDown) {
            this.player.setVelocityY(-120);
        }
        else if (this.cursors.down.isDown && this.iddlePlayer && !this.cursors.left.isDown) {
            this.player.setVelocityY(120);
        }
        else {
            this.player.setVelocityY(0)
        }
        
        //CONTROL COLISIONES CON EL ESCUDO
        if(this.cursors.left.isDown && !this.escudoCreado){            
            this.pShield  = new PlayerSpacioShield(this, this.player.x, this.player.y, 'shield').setVisible(false).setActive(false);
            this.colision_escudo = this.physics.add.collider(this.pShield, this.misil_boss_Group, this.hitShield, null, this);
            this.escudoCreado = true;
            
        }else if(this.cursors.left.isDown && this.escudoCreado){
            this.pShield.setActive(true).setVisible(true).anims.play('IDLE',true)
        }else{
            this.escudoCreado = false;
            this.pShield.destroy();
        }
        

        //  ENEMIES RESPAWN CONTROL AFTER GAME OVER
        if (time > this.respawnInterval && this.respawn == 0 && this.moveMeteoro) {
            this.respawn = Math.trunc(time);
        }
        if (time > this.respawn && this.score <= this.scoreLimit && this.moveMeteoro) {
            // POWERUP
            if (this.enemiesGlobalCounter % 15 == 0 && this.enemiesGlobalCounter != 0) {
                //this.powerupGroup.newItem();
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

        //animar explosiones a la tierra
        if(this.animarExplosion1){ this.explosion1.anims.play('X',true); }
        if(this.animarExplosion2){ this.explosion2.anims.play('X',true); }
        if(this.animarExplosion3){ this.explosion3.anims.play('X',true); }
        if(this.animarExplosion4){ this.explosion4.anims.play('X',true); }
        if(this.animarExplosion5){ this.explosion5.anims.play('X',true); }

        //animar al player y al boss
        if(this.iddlePlayer){this.player.anims.play('IDLE',true)}
        if(this.iddleBoss && !this.bossDie){this.centinela.anims.play('IDLE',true)}
        if(this.bossDie){this.centinela.anims.play('DIE',true)}

        //CONTROL DE DISPAROS DEL BOSS
        if (time > this.respawnInterval && this.respawn == 0 && this.bossEnMovimiento && !this.invencibleBoss) {
            this.respawn = Math.trunc(time);
        }
        if (time > this.respawn  && this.bossEnMovimiento) {
            this.fire_boss();            
            this.respawn += this.respawnInterval;
        }

        if(this.animarFireBoss && !this.invencibleBoss){ 
            this.iddleBoss = false;
            this.centinela.anims.play('FIRE',true);
            setTimeout(() => {
                this.animarFireBoss = false;
                this.iddleBoss = true;
            }, 500);
        }

        if(this.invencibleBoss){
            this.centinela.anims.play('HIT',true);
        }

        //game over en la scena
        if(this.finished > 0){
            this.bossEnMovimiento = false;
            this.iddleBoss = false;
            this.misilGroup.clear(true,true);
            this.misil_boss_Group.clear(true,true);
            this.bgMusic.stop();
            this.bgMusicBoss.stop();

            this.scene.start('GameOver');
            this.finished = 0;
        }

        
        
    }
}

export default SecondScene;