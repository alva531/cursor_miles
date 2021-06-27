class Gameover extends Phaser.Scene{
    constructor(){
        super("Gameover");
    }

    create() {

        this.add.text(250, 910, 'ATRAS', { font: '100px Arial', fill: '#ffffff' }).setOrigin(0.5).setInteractive()
        .on('pointerdown', () => this.atras() );
        this.add.text(1500, 910, 'REINICIAR', { font: '150px Arial', fill: '#ffffff' }).setOrigin(0.5).setInteractive()
        .on('pointerdown', () => this.reiniciar() );

        this.add.image(window.innerWidth/2,window.innerHeight/2,'gameover').setScale(1);
        
    }
    reiniciar() {
        if (primernivelsinterminar === true){

            this.scene.start('nivel1')

        }else{

            this.scene.start('nivel2')
        }
        this.sound.play('Select')
    }
    atras() {
        this.scene.start('menu')
        this.sound.play('Select')
    }

}