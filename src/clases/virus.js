export default class Virus extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);

    }

    newItem(){
        //elegir numer de enemigo al azar
        let enemy = (Math.random() * (3 - 1) + 1).toFixed(0);

        this.create(Phaser.Math.Between(0, this.scene.scale.width), 20, `virus${enemy}`)
            .setActive(true)
            .setVisible(true)
            .setGravityY(300)
            .setCollideWorldBounds(true)
            .setDepth(2)
            .setCircle(45)
            .setBounce(1, 1)
            .setVelocityX((Phaser.Math.Between(0, 1) ? 100 : -100))
            .hitsToKill = 1;
    }    
}