export default class Bullet extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);

        this.scene = scene;
    }

    newItem(x = 17, y = 30) {
        var item = this.create(this.scene.player.x + x, this.scene.player.y - y, 'bullet2')
            .setActive(true)
            .setVisible(true)
            .setDepth(2);
        item.body.velocity.y = -400;
        item.outOfBoundsKill = true;
    }

    newDoubleItem() {
        this.newItem(30,30);
        this.newItem(7,30);
    }
    
    newItemSpacial() {
        var item = this.create(this.scene.player.x + 45, this.scene.player.y -15, 'misil')
            .setActive(true)
            .setVisible(true)
            .setDepth(2)
            .setScale(0.8);
        item.body.velocity.x = 200;
        item.outOfBoundsKill = true;
    }

    newItemSpacialBoss(){
        var item = this.create(this.scene.centinela.x - 45, this.scene.centinela.y, 'misil_boss')
            .setActive(true)
            .setVisible(true)
            .setDepth(2)
            .setScale(0.8);
        item.body.velocity.x = -300;
        item.outOfBoundsKill = true;
        item.name = 'misilBoss';
    }

}