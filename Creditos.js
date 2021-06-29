class Creditos extends Phaser.Scene{
    constructor(){
        super("creditos");
    }

    create() {

        this.add.text(100, 670, 'ATRAS', { font: '120px Arial', fill: '#ffffff' }).setInteractive()
        .on('pointerdown', () => this.atras() );

        this.add.image(window.innerWidth/2,window.innerHeight/2,'creditos').setScale(1);
    }

    atras() {
        this.scene.start('menu')
        this.sound.play('Select')
    }
}