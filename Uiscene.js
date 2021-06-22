class UIScene extends Phaser.Scene{
    constructor(){
        super("UIScene");
    }


   create(){

    this.add.text(1600, 16, 'Score: ', { font: '52px Arial', fill: '#ffe100' });
    this.score = this.add.text(1800, 16, '0', { font: '52px Arial', fill: '#ffe100' });

    this.registry.events.on('changedata', (parent, key, data) => { 
        if (key === 'scores')
        this.score.setText(data)
    });

    }


    update() {

    }

}