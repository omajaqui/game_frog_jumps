export default class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.sprite = sprite; 
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.init();
        this.animateExplosion();   
    }

    init(){
        this.setDepth(0);
    }

    animateExplosion() {
        this.anims.create({
            key: 'X',
            frames: this.anims.generateFrameNumbers(this.sprite, { start: 0, end: 5 }),
            frameRate: 8,
            //repeat: -1
        }); 
    }
}