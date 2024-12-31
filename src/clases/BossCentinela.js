export default class BossCentinela extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); 
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.init();
        this.animateCentinela();   
    }

    init(){
        this
        .setDepth(2)
        .setImmovable(true)
        .body.setSize(200,90,2,0) // custom mask => setSize(width, height, XinSprite, YinSprite)
        ;
    }

    animateCentinela() {
        this.anims.create({
            key: 'IDLE',
            frames: this.anims.generateFrameNumbers('boss_centinela', { start: 0, end: 12 }),
            frameRate: 8,
            yoyo: true,
            repeat: -1
        }); 

        this.anims.create({
            key: 'FIRE',
            frames: this.anims.generateFrameNumbers('boss_centinela', { start: 13, end: 17 }),
            frameRate: 10,
        }); 

        this.anims.create({
            key: 'HIT',
            frames: this.anims.generateFrameNumbers('boss_centinela', { start: 18, end: 30 }),
            frameRate: 12,
        }); 

        this.anims.create({
            key: 'DIE',
            frames: this.anims.generateFrameNumbers('boss_centinela', { start: 31, end: 41 }),
            frameRate: 12,
        }); 
    }
}