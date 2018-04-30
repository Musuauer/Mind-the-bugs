'use strict';

/* eslint-disable indent */

// Enemies our player must avoid
class Enemy {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	constructor(x,y,speed){
		this.x = x;
		this.y = y;
		this.speed = speed;
        this.sprite = 'images/eagle.png';
    }
    
}

const enemy1 = new Enemy (-100, 60, 150);
const enemy2 = new Enemy (-300, 60, 150);
const enemy3 = new Enemy (-600, 60, 150);
const enemy4 = new Enemy (-850, 60, 150);
const enemy5 = new Enemy (-200, 142, 30);
const enemy6 = new Enemy (-500, 142, 30);
const enemy7 = new Enemy (-700, 142, 30);
const enemy8 = new Enemy (250, 225, 20);
const enemy9 = new Enemy (100, 225, 20);
const enemy10 = new Enemy (-70,225, 20);
const enemy11 = new Enemy (-350, 225, 20);


let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11];

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
        83 + player.y > this.y)  {
            startAgain();

}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};

function startAgain(){

    player.x = 200;
    player.y = 405;
}
class Player{
	constructor(x, y){
		this.x = x;
		this.y = y;

	}
	update(){
        this.sprite = 'images/splash.png';
        if (this.y < 0){
            console.log('win');
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            window.setTimeout(startAgain, 2000);
        }
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

	}
}
const player = new Player(200, 405);
player.update();

document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
    };
	player.handleInput(allowedKeys[e.keyCode]);
});