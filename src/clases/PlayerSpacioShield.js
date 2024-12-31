export default class PlayerSpacioShield extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); 
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.init();
        this.animateShield();   
    }

    init(){
        this
        .setCollideWorldBounds(true)
        //.setGravityY(300)
        .setDepth(2)
        .setImmovable(true)
        .setCircle(50)
        //.body.setSize(35,80,36,50); // custom mask => setSize(width, height, XinSprite, YinSprite)
    }

    animateShield() {
        this.anims.create({
            key: 'IDLE',
            frames: this.anims.generateFrameNumbers('shield', { start: 0, end: 41 }),
            frameRate: 12,
            repeat: -1
        }); 
    }
}