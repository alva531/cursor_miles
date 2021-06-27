let config = {
    type: Phaser.auto,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false}
    },
    scale: {
        mode: Phaser.Scale.CENTER_BOTH,
        parent:"game"
    },
    pixelArt: true,
    scene: [Preloader, Nivel1, Nivel2,UIScene, Gameover, Menu, Creditos]
};

var game = new Phaser.Game(config);

var jugador;
var arriba,derecha,izquierda;

//Enemigos

var esqueleto;
var esqueletoizquierda;
var esqueleto1;
var esqueleto1izquierda;
var esqueleto2;
var esqueleto2izquierda;
var esqueleto3;
var esqueleto3izquierda;
var esqueleto4;
var esqueleto4izquierda;
var esqueleto5;
var esqueleto5izquierda;

var serpiente;
var serpiente1;
var serpiente2;
var serpienteizquierda;
var serpiente1izquierda;
var serpiente2izquierda;


var primernivelsinterminar;

var velocidad;
var alturaSalto;

var music
var mapa;
var piso;
var layer;
var coin;
var speed;
var collectSpeed;
var heart;
var coins;
var score;

// Paredes invisibles

var borde;
var bordefinal;
var suelo;

// Interfaz

var vidas;
var scoreText;
var timedEvent;
var initialTime;
var timeText;