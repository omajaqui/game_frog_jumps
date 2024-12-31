export default class Boss extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);    
    }

    newItem(){
        //elegir numer de enemigo al azar
        let enemy = (Math.random() * (2 - 1) + 1).toFixed(0);

        this.create(Phaser.Math.Between(0, this.scene.scale.width), 80, `boss${enemy}`)
            .setActive(true)
            .setVisible(true)
            .setGravityY(500)
            .setCollideWorldBounds(true)
            .setDepth(2)
            .setCircle(68)
            .setBounce(1, 1)
            .setVelocityX((Phaser.Math.Between(0, 1) ? 250 : -250))
            .hitsToKill = 50;
        this.name = "boos";
                  
    }
}