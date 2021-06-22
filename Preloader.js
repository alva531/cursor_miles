var Preloader = new Phaser.Class({
    Extends: Phaser.Scene,
    Initialize:
    function Preloader(){
        Phaser.Scene.call(this, {key: 'Preloader'});
    },
    
    preload() 
    {
        this.load.bitmapFont('gold', 'assets/gold.png');

        this.load.spritesheet('Juan', 'assets/Juan.png', {frameWidth: 20, frameHeight: 23});

        this.load.tilemapTiledJSON('nivel', 'assets/Nivel 1.json');
        this.load.image('tiles', 'assets/Tileset.png')
        this.load.image('background0', 'assets/BG0.png')
        this.load.image('background1', 'assets/BG1.png')
        this.load.image('background2', 'assets/BG2.png')
        this.load.image('background3', 'assets/BG3.png')
        this.load.image('coins', 'assets/Coin1.png')
        this.load.image('borde', 'assets/borde.png')
        this.load.image('suelo', 'assets/suelo.png')
        this.load.spritesheet('speed', 'assets/speed.png',{frameWidth: 32, frameHeight: 28})
        this.load.spritesheet('coin', 'assets/coin.png', {frameWidth: 32, frameHeight: 28})
        this.load.spritesheet('heart', 'assets/Heart.png',{frameWidth: 32, frameHeight: 32})

        this.cameras.main.setBounds(0, 0, 3392, 100);
        this.physics.world.setBounds(0, 0, 3392, 240);

        this.registry.set('scores', 0)

    },

    create()
    {

        texto = this.add.text(game.config.width / 2, game.config.height / 2, 'Play', 
        {fontSize: '40px', fill: '#FFC912'}).setOrigin(0.5);


        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers('Juan', { start: 0, end: 3 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'salto',
            frames: this.anims.generateFrameNumbers('Juan', { start: 6, end: 9 }),
            frameRate: 15
        });

        this.anims.create({
            key: 'girar',
            frames: this.anims.generateFrameNumbers('coin', {start:0, end:5}),
           frameRate: 10
        });

        this.anims.create({
            key: 'girar1',
            frames: this.anims.generateFrameNumbers('speed', {start:0, end:5}),
           frameRate: 10
        });

        this.anims.create({
            key: 'girar2',
            frames: this.anims.generateFrameNumbers('heart', {start:0, end:3}),
           frameRate: 10
        });


        this.input.on('pointerdown', () => this.scene.start('nivel1') );


    }   

});
