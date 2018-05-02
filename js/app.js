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
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -350;
     }
   
     // Collision detection algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
     if (player.x < this.x + 90 &&
        player.x + 67 > this.x &&
        player.y < this.y + 70 &&
        50 + player.y > this.y)  {

            var audio = new Audio('Crow.mp3');
            audio.play();
            startAgain();

}
};

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

//Star image to appear when the player reaches the water
class Star{
    constructor(x,y){
        this.x = x;
        this.y = -10;
        this.sprite = 'images/Star.png';
    }
    moveNewStar(){
        this.x += 50;
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
function youWon(){
    toggleModal();
}
//Reset player's position if it reaches the water
function startAgain(){
    document.addEventListener('keyup', Keystroke);
    splash.x = -2000;
    player.x = 200;
    player.y = 405;
}
function win(){
    if (player.y < 0){
                player.y = -1000;
                splash.x = player.x;
                document.removeEventListener('keyup', Keystroke);

                if (allStars.length === 0){
                    let newStar = new Star(0, -10);
                    allStars.push(newStar);
                }
                else if(allStars.length === 1){
                    let newStar = new Star(0, -10);
                    newStar.moveNewStar();
                    allStars.push(newStar);
                }
                else if(allStars.length === 2){
                    let newStar = new Star(0, -10);
                    newStar.moveNewStar();
                    newStar.moveNewStar();
                    allStars.push(newStar); 
                    window.setTimeout(youWon, 2000);
                }
                


               var audio = new Audio('splash.mp3');
               audio.play();


            window.setTimeout(startAgain, 2000);
    }
            

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
document.addEventListener('keyup', Keystroke);

// -------------------------------------------MODAL-------------------------------------------//
function toggleModal() {
	congrats.classList.toggle('show-popup');
}

// -------------------------------------------RESTART--------------------------------------//

function restartGame() {
	location.reload();
}