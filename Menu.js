class Menu extends Phaser.Scene {
    constructor() {
      super('menu');
    }

    create() {

        jugar = this.add.text(1000, 430, 'JUGAR', 
        {fontSize: '150px', fill: '#FFFFFF'});
        jugar.setInteractive()

        jugar.on('pointerdown', () => this.scene.start('nivel1'), this.sound.play('Select'))

        creditos = this.add.text(670, 670, 'CREDITOS', 
        {fontSize: '170px', fill: '#FFFFFF'});
        creditos.setInteractive()

        creditos.on('pointerdown', () => this.scene.start('creditos'), this.sound.play('Select'))

        this.add.image(window.innerWidth/2,window.innerHeight/2,'menu').setScale(1);

    }
}