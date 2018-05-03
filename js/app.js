'use strict';

/* eslint-disable indent */
//---------------------------modal----------
const congrats = document.querySelector('.popup');
//---restart-from-modal
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', restartGame);


//---------------ENEMIES-------------------

class Enemy {
	constructor(x,y,speed){
		this.x = x;
		this.y = y;
		this.speed = speed;
        this.sprite = 'images/crow.png';
    }
}

//New enemies, organized by row
const enemy1 = new Enemy (-100, 60, 80);
const enemy2 = new Enemy (-300, 60, 80);
const enemy3 = new Enemy (-600, 60, 100);
const enemy4 = new Enemy (-850, 60, 20);
const enemy5 = new Enemy (-200, 142, 180);
const enemy6 = new Enemy (-500, 142, 150);
const enemy7 = new Enemy (-700, 142, 180);
const enemy8 = new Enemy (250, 225, 120);
const enemy9 = new Enemy (100, 225, 20);
const enemy10 = new Enemy (-70,225, 25);
const enemy11 = new Enemy (-350, 225, 25);

// Array of enemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11];

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    move(this, dt);
   
	if (playerCollidedWithCrow(this)) {
		playAudio('Crow.mp3');
		startAgain();
	}
};

function playerCollidedWithCrow(crow){
	return player.x < crow.x + 90 &&
        player.x + 67 > crow.x &&
        player.y < crow.y + 70 &&
        50 + player.y > crow.y;
}

function playAudio(path) {
	var audio = new Audio(path);
    audio.play();
}

function move(thing, dt) {
	thing.x += thing.speed * dt;
    if (thing.x > 505) {
        thing.x = -350;
     }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};

//---------------PLAYER-----------------------

class Player{
	constructor(x, y){
		this.x = x;
		this.y = y;

	}
	update(){
        
    }

	render(){
        this.sprite = 'images/Frog.png';
        
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

	}
	handleInput(allowedKeys){
        if (allowedKeys ==='left' && this.x > 0) {
            this.x -= 100;
        }
        if (allowedKeys ==='right' && this.x < 400) {
            this.x += 100;
        }
        if (allowedKeys ==='up' && this.y > 0) {
            this.y -= 83;
        }
        if (allowedKeys ==='down' && this.y < 380) {
            this.y += 83;
        }
        win();
	}
}
const player = new Player(200, 405);
player.update();

//Hearts available as lives of the frog
class Heart{
    constructor(x,y){
        this.x = x;
        this.y = -10;
        this.sprite = 'images/Heart.png';
    }
    render(){
        this.sprite = 'images/Heart.png';
        
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
}

const heart1 = new Heart (360, -10);
const heart2 = new Heart (410, -10);
const heart3 = new Heart (460, -10);

const allHearts = [heart1, heart2, heart3];


//Star image to appear when the player reaches the water
class Star{
    constructor(x,y){
        this.x = x;
        this.y = -10;
        this.sprite = 'images/Star.png';
    }
    moveNewStar(starCount){
        this.x = starCount * 50;
    }
    render(){
        this.sprite = 'images/Star.png';
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

const allStars = [];

//Splash image to show up when player reaches the water
class Splash{
	constructor(x, y){
		this.x = x;
		this.y = y;

	}

	render(){
        this.sprite = 'images/water-splash.png';
        
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}
const splash = new Splash (-2000, 40);


// Manage stars
function createNewStar(allStars){
    let newStar = new Star(0, -10);
        allStars.push(newStar);
}
function checkStars(allStars){
        if(allStars.length === 2){
            allStars[1].moveNewStar(1);
        }
        else if (allStars.length === 3){
            allStars[2].moveNewStar(2);
        }
}
function  addStar(allStars){
    if (allStars.length <=2){
        createNewStar(allStars);
    }
    checkStars(allStars);
}
//Win
const playerWonGame = allStars => allStars.length === 3;

//When player reaches the water
const reachWater = player => player.y < 0;

function hidePlayer(player){
    return player.y = -1000;
}
function addSplash(splash, player){
    splash.x = player.x;
}
//Reset player's position if it reaches the water
function resetPlayer(player){
    player.x = 200;
    player.y = 405;
}
function hideSplash(splash){
    splash.x = -2000;
}
function startAgain(){
    window.addEventListener('keyup', Keystroke);
    hideSplash (splash);
    resetPlayer(player);
}
//Check if player wins
function win(){
    if (reachWater(player)) {
                window.removeEventListener('keyup', Keystroke);
                hidePlayer(player);
                addSplash(splash, player);
                playAudio('splash.mp3');
                addStar(allStars);
                
                window.setTimeout(startAgain, 2000);
               // window.setTimeout(youWon, 2000);
    }
    if (playerWonGame(allStars)) {
		window.setTimeout(callWinModal, 2000);
	}
}

function lost(){
    
}
if (allHearts.length === 0){
    lost();
}

// Keystroke listener
function Keystroke(e){
    var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
    };
	player.handleInput(allowedKeys[e.keyCode]);
}
window.addEventListener('keyup', Keystroke);

// -------------------------------------------MODAL-------------------------------------------//
function callWinModal() {
	congrats.classList.toggle('show-popup');
}

// -------------------------------------------RESTART--------------------------------------//

function restartGame() {
	location.reload();
}