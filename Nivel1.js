class Nivel1 extends Phaser.Scene {
    constructor() {
      super('nivel1');
    }

   

    create() {
        
        this.scene.run('UIScene');

        this.background0 = this.add.tileSprite(800, 120, 4740, 190, 'background0');
        this.background1 = this.add.tileSprite(800, 310, 4740, 190, 'background1');
        this.background2 = this.add.tileSprite(800, 310, 4740, 190, 'background2');
        this.background3 = this.add.tileSprite(800, 310, 4740, 190, 'background3');

        borde= this.physics.add.staticGroup();
        bordefinal= this.physics.add.staticGroup();
        suelo= this.physics.add.staticGroup();

        borde.create(0,400, 'borde');
        bordefinal.create(3179,400, 'borde');
        suelo.create(0,475, 'suelo');
        suelo.create(1700,475, 'suelo');

        game.config.backgroundColor.setTo(108, 210, 222);

        var mapa = this.make.tilemap({ key: 'nivel'});
        var tilesets = mapa.addTilesetImage('Tileset', 'tiles');
        layer = mapa.createLayer('mundo', tilesets, 0, 0);

        var plataformas = mapa.createDynamicLayer('plataforma', tilesets, 0, 0);
        plataformas.setCollisionByProperty({piso: true});

        jugador = this.physics.add.sprite(10,350,'Juan',0);
        jugador.setSize(13)
        
        arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        //coin = this.physics.add.sprite(50,350, "coin",0);
        //coin.setSize(13)

        coins = this.physics.add.group({
            key: 'coins',
            repeat: 40,
            setXY: {x: 70, y: 190, stepX: 100}
        });

        coins.children.iterate(function (child) {

            child.x += Phaser.Math.FloatBetween(55, 200)
            child.y += Phaser.Math.FloatBetween(200, 10) 
            child.score = 10;

        });

        //scoreText = this.add.text(20, 300, '0', { fontFamily:'Arial' ,fontSize: '30px', fill: '#0x00000' });
        //scoreText.setScrollFactor(0);
        this.score = 0;


        speed = this.physics.add.sprite(1010,350, "speed",0);
        speed.setSize(13)

        heart = this.physics.add.sprite(1514,190, "heart",0);
        heart.setSize(13)



        this.physics.add.overlap(jugador, coins, this.collectCoin, null, this);
        //his.physics.add.overlap(jugador, coin, this.collectCoin, null, this);
        this.physics.add.overlap(jugador, speed, this.collectSpeed, null, this);
        this.physics.add.overlap(jugador, heart, this.collectHeart, null, this);

        this.cameras.main.startFollow(jugador);
    
        //Zoom
        this.cameras.main.setZoom(6);

        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);


        this.physics.add.collider(jugador, plataformas);
        this.physics.add.collider(jugador, suelo);
        this.physics.add.collider(jugador, borde);
        this.physics.add.collider(jugador, bordefinal);
        this.physics.add.collider(coins, plataformas);
        //this.physics.add.collider(coin, plataformas);
        this.physics.add.collider(speed, plataformas);
        this.physics.add.collider(heart, plataformas);
    }
    
    update() {
        jugador.body.setVelocityX(0);
    
        if(izquierda.isDown){
            jugador.body.setVelocityX(-velocidad);
            jugador.flipX = true;
        }
    
        if(derecha.isDown){
            jugador.body.setVelocityX(velocidad);
            jugador.flipX = false;
        }
    
        if(arriba.isDown && jugador.body.onFloor()){
            jugador.body.setVelocityY(alturaSalto);
        }
    
        if((izquierda.isDown || derecha.isDown) && jugador.body.onFloor()){
            jugador.anims.play('caminar',true);
        }else if(!jugador.body.onFloor()){
            jugador.anims.play('salto', true);
        }else{
            jugador.setFrame(2);
        }
        
        //coin.anims.play('girar', true);
        speed.anims.play('girar1', true);
        heart.anims.play('girar2', true);
           
    }

    collectCoin (jugador, coins)
    {
        coins.disableBody(true, true);
        this.score += 10
        //scoreText.setText('' + score);
        this.registry.set('scores', this.score);
    }

    collectSpeed (jugador, speed)
    {
        speed.disableBody(true, true);
    }

    collectHeart (jugador, heart)
    {
        heart.disableBody(true, true);
    }

}