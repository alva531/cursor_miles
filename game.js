let config = {
    type: Phaser.auto,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.CENTER_BOTH,
        parent:"game"
    },
    pixelArt: true,
    scene: [Preloader, Nivel1, UIScene]
};

var game = new Phaser.Game(config);

var jugador;

var arriba,derecha,izquierda;

const velocidad = 100;
const alturaSalto = -300;

var texto;
var mapa;
var piso;
var layer;
var coin;
var speed;
var heart;
var coins;
var score;
var scoreText;
var borde;
var bordefinal;
var suelo;