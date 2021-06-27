class Nivel1 extends Phaser.Scene {
    constructor() {
      super('nivel1');
    }

   

    create() {

        primernivelsinterminar= true
        
        velocidad = 100;
        alturaSalto = -300;
        initialTime = 50
        esqueletoizquierda= true
        esqueleto1izquierda= true
        esqueleto2izquierda= true
        esqueleto3izquierda= true
        esqueleto4izquierda= true
        

        this.scene.run('UIScene');

        this.background0 = this.add.tileSprite(800, 120, 4740, 190, 'background0');
        this.background1 = this.add.tileSprite(800, 310, 4740, 190, 'background1');
        this.background2 = this.add.tileSprite(800, 310, 4740, 190, 'background2');
        this.background3 = this.add.tileSprite(800, 310, 4740, 190, 'background3');

        borde= this.physics.add.staticGroup();
        bordefinal= this.physics.add.staticGroup();
        suelo= this.physics.add.staticGroup();

        borde.create(0,400, 'borde');
        bordefinal.create(3178,400, 'borde');
        suelo.create(0,550, 'suelo');
        suelo.create(1700,550, 'suelo');

        game.config.backgroundColor.setTo(108, 210, 222);

        var mapa = this.make.tilemap({ key: 'nivel'});
        var tilesets = mapa.addTilesetImage('Tileset', 'tiles');
        layer = mapa.createLayer('mundo', tilesets, 0, 0);

        var plataformas = mapa.createDynamicLayer('plataforma', tilesets, 0, 0);
        plataformas.setCollisionByProperty({piso: true});

        var plataformaborde = mapa.createDynamicLayer('plataformaborde', tilesets, 0, 0);
        plataformaborde.setCollisionByProperty({borde: true});

        jugador = this.physics.add.sprite(20,350,'Juan',0);
        jugador.setSize(13)
        jugador.herido=false
        jugador.recuperar=0

        arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        
        coin = this.physics.add.group({
            key: 'coin',
            repeat: 40,
            setXY: {x: 70, y: 190, stepX: 200}
        });

        coin.children.iterate(function (child) {

            child.x += Phaser.Math.FloatBetween(55, 200)
            child.y += Phaser.Math.FloatBetween(200, 10) 
            child.score = 10;
            child.setScale(1);
            //child.anims.play('girar', true)

        });


        this.score = 0; 
        this.vidas = 3;


        heart = this.physics.add.sprite(1010,350, "heart",0);
        heart.setSize(13)

        speed = this.physics.add.sprite(1514,190, "speed",0);
        speed.setSize(13)
        collectSpeed= false


        esqueleto = this.physics.add.sprite(188,350,'esqueleto',0);
        esqueleto.setSize(13)

        esqueleto1 = this.physics.add.sprite(800,350,'esqueleto',0);
        esqueleto1.setSize(13)

        esqueleto2 = this.physics.add.sprite(1200,350,'esqueleto',0);
        esqueleto2.setSize(13)

        esqueleto3 = this.physics.add.sprite(1300,200,'esqueleto',0);
        esqueleto3.setSize(13)

        esqueleto4 = this.physics.add.sprite(2400,350,'esqueleto',0);
        esqueleto4.setSize(13)



        this.music =this.sound.add('Music')

        var musicConfig= {
            mute: false,
            volume: 0.3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            decay: 0
        }
        this.music.play(musicConfig)
        
        this.physics.add.overlap(jugador, coin, this.collectCoin, null, this);
        this.physics.add.overlap(jugador, speed, this.collectSpeed, null, this);
        this.physics.add.overlap(jugador, heart, this.collectHeart, null, this);
        this.physics.add.overlap(jugador, esqueleto, this.recibeHit, null, this);
        this.physics.add.overlap(jugador, esqueleto1, this.recibeHit, null, this);
        this.physics.add.overlap(jugador, esqueleto2, this.recibeHit, null, this);
        this.physics.add.overlap(jugador, esqueleto3, this.recibeHit, null, this);
        this.physics.add.overlap(jugador, esqueleto4, this.recibeHit, null, this);

        this.cameras.main.startFollow(jugador);
    
        //Zoom
        this.cameras.main.setZoom(6);

        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);


        this.physics.add.collider(jugador, plataformas);
        this.physics.add.collider(jugador, suelo, this.caida, null, this);
        this.physics.add.collider(jugador, borde);
        this.physics.add.collider(jugador, bordefinal, this.completado, null, this);
        this.physics.add.collider(coin, plataformas);
        this.physics.add.collider(speed, plataformas);
        this.physics.add.collider(heart, plataformas);
        this.physics.add.collider(esqueleto, plataformas);
        this.physics.add.collider(esqueleto, plataformaborde, this.cambiarDirection, null, this);
        this.physics.add.collider(esqueleto1, plataformas);
        this.physics.add.collider(esqueleto1, plataformaborde, this.cambiarDirection1, null, this);
        this.physics.add.collider(esqueleto2, plataformas);
        this.physics.add.collider(esqueleto2, plataformaborde, this.cambiarDirection2, null, this);
        this.physics.add.collider(esqueleto3, plataformas);
        this.physics.add.collider(esqueleto3, plataformaborde, this.cambiarDirection3, null, this);
        this.physics.add.collider(esqueleto4, plataformas);
        this.physics.add.collider(esqueleto4, plataformaborde, this.cambiarDirection4, null, this);
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
    
        speed.anims.play('girar1', true);
        heart.anims.play('girar2', true);

        if (collectSpeed === true){
            velocidad = 140;
            alturaSalto = -325;
        }

        if (this.time.now>jugador.recuperar) {
            jugador.herido= false
        }

        if (esqueletoizquierda=== true)
        {
            esqueleto.setVelocityX(17);
            esqueleto.flipX = false;
        }
        else if (esqueletoizquierda=== false)
        {
            esqueleto.setVelocityX(-17);
            esqueleto.flipX = true;
        }
        esqueleto.anims.play('caminaresqueleto', true);

        if (esqueleto1izquierda=== true)
        {
            esqueleto1.setVelocityX(17);
            esqueleto1.flipX = false;
        }
        else if (esqueleto1izquierda=== false)
        {
            esqueleto1.setVelocityX(-17);
            esqueleto1.flipX = true;
        }
        esqueleto1.anims.play('caminaresqueleto', true);

        if (esqueleto2izquierda=== true)
        {
            esqueleto2.setVelocityX(17);
            esqueleto2.flipX = false;
        }
        else if (esqueleto2izquierda=== false)
        {
            esqueleto2.setVelocityX(-17);
            esqueleto2.flipX = true;
        }
        esqueleto2.anims.play('caminaresqueleto', true);

        if (esqueleto3izquierda=== true)
        {
            esqueleto3.setVelocityX(17);
            esqueleto3.flipX = false;
        }
        else if (esqueleto3izquierda=== false)
        {
            esqueleto3.setVelocityX(-17);
            esqueleto3.flipX = true;
        }
        esqueleto3.anims.play('caminaresqueleto', true);

        if (esqueleto4izquierda=== true)
        {
            esqueleto4.setVelocityX(17);
            esqueleto4.flipX = false;
        }
        else if (esqueleto4izquierda=== false)
        {
            esqueleto4.setVelocityX(-17);
            esqueleto4.flipX = true;
        }
        esqueleto4.anims.play('caminaresqueleto', true);

        if (this.vidas <=0){
            this.scene.start('Gameover')
            this.sound.play('Death')
            this.music.stop('Music')
        }

    }



    collectCoin (jugador, coin)
    {
        coin.disableBody(true, true);
        this.score += 10
        this.registry.set('scores', this.score);
        this.sound.play('CoinAudio');
    }



    collectSpeed (jugador, speed)
    {
        speed.disableBody(true, true);
        collectSpeed= true
        this.sound.play('SpeedAudio');
    }

    collectHeart (jugador, heart)
    {
        heart.disableBody(true, true);
        this.vidas += 1
        this.registry.set('vidas', this.vidas);
        this.sound.play('HeartAudio');
    }

    recibeHit(){

        if (jugador.herido===false){

        this.vidas -= 1
        jugador.herido= true
        jugador.recuperar=this.time.now +1000
        this.registry.set('vidas', this.vidas);
        this.sound.play('Hit')
        }
    }

    caida(){
        this.scene.stop('UIScene');
        this.scene.start('Gameover');
        this.music.stop('Music')
        this.sound.play('Death')
    }

    cambiarDirection(){
        if (esqueletoizquierda=== true){
            esqueletoizquierda= false
        }
        else{
            esqueletoizquierda= true
        }

    }

    cambiarDirection1(){
        if (esqueleto1izquierda=== true){
            esqueleto1izquierda= false
        }
        else{
            esqueleto1izquierda= true
        }

    }

    cambiarDirection2(){
        if (esqueleto2izquierda=== true){
            esqueleto2izquierda= false
        }
        else{
            esqueleto2izquierda= true
        }

    }

    cambiarDirection3(){
        if (esqueleto3izquierda=== true){
            esqueleto3izquierda= false
        }
        else{
            esqueleto3izquierda= true
        }

    }

    cambiarDirection4(){
        if (esqueleto4izquierda=== true){
            esqueleto4izquierda= false
        }
        else{
            esqueleto4izquierda= true
        }

    }

    completado(){
        this.scene.stop('nivel1');
        primernivelsinterminar= false;
        this.scene.start('nivel2', { score: this.score });
        this.music.stop('Music');
    }
}