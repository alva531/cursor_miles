class UIScene extends Phaser.Scene{
    constructor(){
        super("UIScene");
    }


   create(){

    this.add.text(1350, 16, 'Score: ', { fontFamily: 'Impact', fontSize: '52px', fill: '#ffd54d' });
    this.score = this.add.text(1500, 16, '0', { fontFamily: 'Impact', fontSize: '52px', fill: '#ffd54d' });

    this.add.text(15, 16, 'Vidas: ', { fontFamily: 'Impact', fontSize: '52px', fill: '#ffd54d' });
    this.vidas = this.add.text(160, 16, '3', { fontFamily: 'Impact', fontSize: '52px', fill: '#ffd54d' });

    timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
    timeText = this.add.text(1050, 16, 'Tiempo:', { fontFamily: 'Impact', fontSize: '52px', fill: '#ffd54d' });


    


    this.registry.events.on('changedata', (parent, key, data) => { 
        if (key === 'scores')
        this.score.setText(data)

        if (key === 'vidas')
        this.vidas.setText(data)
    });


    }

    onSecond(){
        timeText.setText('Tiempo: ' + initialTime);
        initialTime = initialTime - 1;
        if (initialTime === -1){
            this.scene.stop('UIScene');
            this.scene.start('Gameover');
        }
    }
    

    update() {

    }

}