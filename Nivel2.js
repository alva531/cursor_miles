class Nivel2 extends Phaser.Scene {
    constructor() {
      super('nivel2');
    }

   

    create() {
        
        velocidad = 100;
        alturaSalto = -300;
        initialTime = 40
        esqueletoizquierda= true
        esqueleto1izquierda= true
        esqueleto2izquierda= true
        esqueleto3izquierda= true
        esqueleto4izquierda= true
        esqueleto5izquierda= true

        serpienteizquierda= true
        serpiente1izquierda= true
        serpiente2izquierda= true

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

        var mapa = this.make.tilemap({ key: 'nivel2'});
        var tilesets = mapa.addTilesetImage('Tileset', 'tiles');
        layer = mapa.createLayer('mundo', tilesets, 0, 0);

        var plataformas = mapa.createDynamicLayer('plataforma', tilesets, 0, 0);
        plataformas.setCollisionByProperty({piso: true});

        var plataformaborde = mapa.createDynamicLayer('plataformaborde', tilesets, 0, 0);
        plataformaborde.setCollisionByProperty({borde: true});

        var torre = mapa.createDynamicLayer('torre', tilesets, 0, 0);
        torre.setCollisionByProperty({final: true});

        jugador = this.physics.add.sprite(15,350,'Juan',0);
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

        heart = this.physics.add.sprite(2200,150, "heart",0);
        heart.setSize(13)

        speed = this.physics.add.sprite(765,300, "speed",0);
        speed.setSize(13)
        collectSpeed= false

        esqueleto = this.physics.add.sprite(200,310,'esqueleto',0);
        esqueleto.setSize(15)

        esqueleto1 = this.physics.add.sprite(1050,0,'esqueleto',0);
        esqueleto1.setSize(15)

        esqueleto2 = this.physics.add.sprite(1750,0,'esqueleto',0);
        esqueleto2.setSize(15)

        esqueleto3 = this.physics.add.sprite(2280,0,'esqueleto',0);
        esqueleto3.setSize(15)

        esqueleto4 = this.physics.add.sprite(2000,0,'esqueleto',0);
        esqueleto4.setSize(15)

        esqueleto5 = this.physics.add.sprite(2380,0,'esqueleto',0);
        esqueleto5.setSize(15)

        serpiente = this.physics.add.sprite(1400,0,'serpiente',0);
        serpiente.setSize(15)

        serpiente1 = this.physics.add.sprite(2200,0,'serpiente',0);
        serpiente1.setSize(15)

        serpiente2 = this.physics.add.sprite(2800,0,'serpiente',0);
        serpiente2.setSize(15)


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
        this.physics.add.overlap(jugador, esqueleto5, this.recibeHit, null, this);
        this.physics.add.overlap(jugador, serpiente, this.recibeHitS, null, this);
        this.physics.add.overlap(jugador, serpiente1, this.recibeHitS, null, this);
        this.physics.add.overlap(jugador, serpiente2, this.recibeHitS, null, this);

        this.cameras.main.startFollow(jugador);
    
        //Zoom
        this.cameras.main.setZoom(6);

        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);


        this.physics.add.collider(jugador, plataformas);
        this.physics.add.collider(jugador, torre, this.ganar, null, this);
        this.physics.add.collider(jugador, suelo, this.caida, null, this);
        this.physics.add.collider(jugador, borde);
        this.physics.add.collider(jugador, bordefinal);
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
        this.physics.add.collider(esqueleto5, plataformas);
        this.physics.add.collider(esqueleto5, plataformaborde, this.cambiarDirection5, null, this);
        this.physics.add.collider(serpiente, plataformas);
        this.physics.add.collider(serpiente, plataformaborde, this.cambiarDirectionS, null, this);
        this.physics.add.collider(serpiente1, plataformas);
        this.physics.add.collider(serpiente1, plataformaborde, this.cambiarDirectionS1, null, this);
        this.physics.add.collider(serpiente2, plataformas);
        this.physics.add.collider(serpiente2, plataformaborde, this.cambiarDirectionS2, null, this);
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

        if (esqueleto5izquierda=== true)
        {
            esqueleto5.setVelocityX(17);
            esqueleto5.flipX = false;
        }
        else if (esqueleto5izquierda=== false)
        {
            esqueleto5.setVelocityX(-17);
            esqueleto5.flipX = true;
        }
        esqueleto5.anims.play('caminaresqueleto', true);

        if (serpienteizquierda=== true)
        {
            serpiente.setVelocityX(14);
            serpiente.flipX = false;
        }
        else if (serpienteizquierda=== false)
        {
            serpiente.setVelocityX(-14);
            serpiente.flipX = true;
        }
        serpiente.anims.play('serpiente', true);

        if (serpiente1izquierda=== true)
        {
            serpiente1.setVelocityX(14);
            serpiente1.flipX = false;
        }
        else if (serpiente1izquierda=== false)
        {
            serpiente1.setVelocityX(-14);
            serpiente1.flipX = true;
        }
        serpiente1.anims.play('serpiente', true);

        if (serpiente2izquierda=== true)
        {
            serpiente2.setVelocityX(14);
            serpiente2.flipX = false;
        }
        else if (serpiente2izquierda=== false)
        {
            serpiente2.setVelocityX(-14);
            serpiente2.flipX = true;
        }
        serpiente2.anims.play('serpiente', true);

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

    caida(){
        this.scene.stop('UIScene');
        this.scene.start('Gameover');
        this.music.stop('Music')
        this.sound.play('Death')
    }

    ganar(){
        this.music.stop('Music')
        this.scene.stop('UIScene');
        this.scene.start('creditos');
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

    recibeHitS(){

        if (jugador.herido===false){

        this.vidas = 0
        jugador.herido= true
        jugador.recuperar=this.time.now +1000
        this.registry.set('vidas', this.vidas);
        this.sound.play('Hit')

        }
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

    cambiarDirection5(){
        if (esqueleto5izquierda=== true){
            esqueleto5izquierda= false
        }
        else{
            esqueleto5izquierda= true
        }

    }
    
    cambiarDirectionS() {        
        if (serpienteizquierda=== true){
            serpienteizquierda= false
        }
        else{
            serpienteizquierda= true
        }

    }   

    cambiarDirectionS1() {        
        if (serpiente1izquierda=== true){
            serpiente1izquierda= false
        }
        else{
            serpiente1izquierda= true
        }

    }

    cambiarDirectionS2() {        
        if (serpiente2izquierda=== true){
            serpiente2izquierda= false
        }
        else{
            serpiente2izquierda= true
        }

    }

}
