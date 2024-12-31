export default class Meteorito extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);

    }

    newItem(img,rebote=false){
        //elegir numer de enemigo al azar
        let enemy = (Math.random() * (3 - 1) + 1).toFixed(0);
        let sprite = img+enemy
        let circle = (img == 'mt0')? 32 : 45;
        let velX = (img == 'mt0')? -150 : -100;
        let kill = (img == 'mt0')? 2 : 4;
        let gravity = (rebote)? 300 : 0;
        let velY = (rebote)? -500 : 0;

        this.create(this.scene.scale.width+70, Phaser.Math.Between(70, this.scene.scale.height-70), sprite)
            .setActive(true)
            .setVisible(true)
            .setGravityY(gravity)
            //.setCollideWorldBounds(true)
            .setDepth(2)
            .setCircle(circle)
            //.setBounce(1, 1)
            .setVelocityX(velX)
            //.setVelocityY(velY)
            .setImmovable(true)
            //.body.setSize(35,35,35,35) // custom mask => setSize(width, height, XinSprite, YinSprite)
            .hitsToKill = kill
        ;        
    }    
}