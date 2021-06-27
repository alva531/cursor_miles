var Preloader = new Phaser.Class({
    Extends: Phaser.Scene,
    Initialize:
    function Preloader(){
        Phaser.Scene.call(this, {key: 'Preloader'});
    },
    
    preload() 
    {

        this.load.spritesheet('Juan', './assets/Juan.png', {frameWidth: 20, frameHeight: 23});
        this.load.spritesheet('JuanHit', './assets/JuanHit.png', {frameWidth: 28, frameHeight: 23});
        this.load.spritesheet('esqueleto', './assets/Skeleton.png', {frameWidth: 20, frameHeight: 22});
        this.load.spritesheet('serpiente', './assets/snake.png', {frameWidth: 19, frameHeight: 18});

        this.load.tilemapTiledJSON('nivel', './assets/Nivel 1.json');
        this.load.tilemapTiledJSON('nivel2', './assets/Nivel 2.json');
        this.load.image('tiles', './assets/Tileset.png');
        this.load.image('background0', './assets/BG0.png');
        this.load.image('background1', './assets/BG1.png');
        this.load.image('background2', './assets/BG2.png');
        this.load.image('background3', './assets/BG3.png');
        this.load.image('borde', './assets/borde.png');
        this.load.image('suelo', './assets/suelo.png');
        this.load.image('menu', './assets/menu.png');
        this.load.image('creditos', './assets/creditos.png');
        this.load.image('gameover', './assets/gameover.png');
        this.load.image('coin1', './assets/coin1.png');
        this.load.spritesheet('speed', './assets/speed.png',{frameWidth: 32, frameHeight: 28});
        this.load.spritesheet('coin', './assets/coin.png', {frameWidth: 14, frameHeight: 28});
        this.load.spritesheet('heart', './assets/Heart.png',{frameWidth: 32, frameHeight: 28});
        this.load.audio('SpeedAudio', './assets/sounds/Speed.wav');
        this.load.audio('CoinAudio', './assets/sounds/Coin.wav');
        this.load.audio('HeartAudio', './assets/sounds/Heart.wav');
        this.load.audio('Music', './assets/sounds/Music.wav')
        this.load.audio('Hit', './assets/sounds/Hit.wav')
        this.load.audio('Death', './assets/sounds/Death.wav')
        this.load.audio('Jump', './assets/sounds/Jump.wav')
        this.load.audio('Select', './assets/sounds/Select.wav')
    


        this.cameras.main.setBounds(0, 0, 3392, 100);
        this.physics.world.setBounds(0, 0, 3392, 240);

        this.registry.set('scores', 0);
        this.registry.set('vidas', 3);

    },

    create()
    {


        jugar = this.add.text(1337, 530, 'JUGAR', 
        {fontSize: '150px', fill: '#FFFFFF'});
        jugar.setInteractive()

        jugar.on('pointerdown', () => this.scene.start('nivel1'), this.sound.play('Select'))

        creditos = this.add.text(980, 850, 'CREDITOS', 
        {fontSize: '170px', fill: '#FFFFFF'});
        creditos.setInteractive()

        creditos.on('pointerdown', () => this.scene.start('creditos'), this.sound.play('Select'))

        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers('Juan', { start: 0, end: 3 }),
            repeat: -1,
            frameRate: 10
        });

        this.anims.create({
            key: 'salto',
            frames: this.anims.generateFrameNumbers('Juan', { start: 6, end: 9 }),
            repeat: -1,
            frameRate: 15
        });

        this.anims.create({
            key: 'JuanHit',
            frames: this.anims.generateFrameNumbers('JuanHit', { start: 0, end: 3 }),
            repeat: -1,
            frameRate: 3
        });

        this.anims.create({
            key: 'girar',
            frames: this.anims.generateFrameNumbers('coin', {start:0, end:5}),
            repeat: -1,
            frameRate: 10
        });
        

        this.anims.create({
            key: 'girar1',
            frames: this.anims.generateFrameNumbers('speed', {start:0, end:5}),
            repeat: -1,
            frameRate: 10
        });

        this.anims.create({
            key: 'girar2',
            frames: this.anims.generateFrameNumbers('heart', {start:0, end:3}),
            repeat: -1,
            frameRate: 10
        });

        this.anims.create({
            key: 'caminaresqueleto',
            frames: this.anims.generateFrameNumbers('esqueleto', { start: 0, end: 3 }),
            repeat: -1,
            frameRate: 3
        });
        
        this.anims.create({
            key: 'serpiente',
            frames: this.anims.generateFrameNumbers('serpiente', { start: 0, end: 6 }),
            repeat: -1,
            frameRate: 3
        });


        this.add.image(window.innerWidth/2,window.innerHeight/2,'menu').setScale(1);

    }   

});
