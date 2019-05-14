/* EDITS TO BE MADE:
  1. Stop the spaceship from being able to move out of the game area. 
      Can't use a remove() function to do this as that would only get rid of 
      the soaceship altogether. 
  2. Stop the lasers from leaving the game area. 
      Possibly use a remove() function to do this.

*/
// console.log("Engines fired!")
const startButton = document.getElementById("start-button");
const instructions = document.getElementById("instructions");
const gameArea = document.getElementById("game-area");
const spaceship = document.getElementById("spaceship");
const obstaclesImgs = ["../project-1/moonrock-1.png", "../project-1/moonrock-2.png", "../project-1/moonrock-3.png"];
const scoreCounter = document.querySelector("#score-counter span");

let obstacleInterval; 
let newestLaser;

startButton.addEventListener("click", (event) => {
  playGame()
});



function flySpaceship(event) { // code function to get spaceship to move and shoot.
	//console.log("test")
	// window.addEventListener("keydown", function(event) { // spaceship moves R using > arrow key
		if (event.key === "ArrowLeft") {
			// console.log("39");
      event.preventDefault();
			//event.preventDefault();
			moveLeft();
		} else if (event.key === "ArrowRight") { // spaceship moves L using < arrow key
			// console.log("37");
      event.preventDefault();
			//event.preventDefault();
			moveRight();
		} else if (event.key === " ") { // shoots laserbeam using the spacebar
      // console.log("lazerrrbeammm")
      event.preventDefault();
		// 	event.preventDefault();
			shootLaserbeam();
		// }
		}
  }


function moveLeft() { // code function that moves spaceship right by 5px when > arrow pressed
  let leftPosition = window.getComputedStyle(spaceship).getPropertyValue('left')
  if (spaceship.style.left === "0px") {
    return
  } else {
    let position = parseInt(leftPosition) // parseInt() necessary to calcuate 5px using the axis-position
    position -= 18
    spaceship.style.left = `${position}px`// template literals necessary to convert string text into an expression
  }
}

function moveRight() { // code function that moves spaceship left by 5px when < arrow pressed 
  let leftPosition = window.getComputedStyle(spaceship).getPropertyValue('left')
  if (spaceship.style.left === "820px") {
    return
  } else {
    let position = parseInt(leftPosition) // parseInt() necessary to calcuate 5px using the axis-position
    position += 18
    spaceship.style.left = `${position}px`// template literals necessary to convert string text into an expression
  }
}

function shootLaserbeam() { // function that brings together createLaserElement and moveLaser functions allowing it to shoot the laserbeam
  let laser = createLaserElement();
  gameArea.appendChild(laser);
  let laserSound =  new Audio("../project-1/laser-firing.mp3");
  laserSound.play();
  let firedLasers = document.getElementsByClassName('laser');
  let newestLaser = firedLasers[firedLasers.length -1];
  moveLaser(newestLaser);
}


function createLaserElement() { // function that creates the laser element and appends it to the game-area in html so that the graphics can be shown
  let xPosition = parseInt(window.getComputedStyle(spaceship).getPropertyValue('left'));
  let yPosition = parseInt(window.getComputedStyle(spaceship).getPropertyValue('bottom'));
  let newLaser = document.createElement('img');
  newLaser.src = "../project-1/laserbeam.png";
  newLaser.classList.add('laser');
  newLaser.style.bottom = `${yPosition + 50}px`; // ammend this when the code is running, for now, just need to see if the function is working and laserbeam being displayed
  newLaser.style.left = `${xPosition + 22}px` // ammend this when the code is running, for now, just need to see if the function is working and laserbeam being displayed
  return newLaser
}

function moveLaser(laser) { // this makes the laser appear to be "moving" through the sky, need to use an interval to give it a lag and the effect that it is 'moving'.
  let laserInterval = setInterval(()=> {
    let xPosition = parseInt(laser.style.bottom);
    
    let obstacles = document.querySelectorAll(".obstacle");
    obstacles.forEach(obstacle => {
      if (checkLaserHit(laser, obstacle)) { // here it must coordinate with the checkLaserHit function to see if the laser has hit the obstacle
        obstacle.src = "../project-1/explosion.png";
        obstacle.classList.remove("obstacle");
        obstacle.classList.add("clearpath");
        // let explosionSound = new Audio("../project-1/explosion.mp3");
        // explosion.play();
        scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100 // depending on whether the laser hit/ avoided the target link to the score-counter function to determine if points gained
      }
    })
    
    if (xPosition === 500) { // ammend this when the code is running, for now, just need to see if the function is working and laserbeam being displayed
      laser.style.display = 'none';
      laser.remove();
    } else {
      laser.style.bottom = `${xPosition + 4}px` // ammend this when the code is running, for now, just need to see if the function is working and laserbeam being displayed
    }
  }, 10) // interval set for 1 second
}


function createObstacle() { // create my moonrocks, i.e. obstacles
  let newObstacle = document.createElement('img');
  let obstaclePixel = obstaclesImgs[Math.floor(Math.random()*obstaclesImgs.length)];
  newObstacle.src = obstaclePixel;
  newObstacle.classList.add("obstacle");
  newObstacle.classList.add("obstacle-transition");
  newObstacle.style.bottom = "500px"; // each comes out from the same 'top' length
  newObstacle.style.left = `${Math.floor(Math.random() * 800) + 1}px`; // random in terms of where in the 'top' line each obstacle starts from
  gameArea.appendChild(newObstacle);
  moveObstacle(newObstacle);
}

function moveObstacle(obstacle) { // setting an interval for the movement of the obstacles. This is necessary to give the obstacles the appearance of the spaceship moving towards the obstacles
  let moveObstacleInterval = setInterval(() => {
    let xPosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('bottom'));
    if (xPosition <= 5) { // again just placeholder numbers
      if (Array.from(obstacle.classList).includes("clearpath")) { // this gives the appearance that the obstacle has been destroyed coupled with the explosion img above
        obstacle.remove();
      } else {
        gameOver(); // link to the gameOver() function
        } 
          } else {
            obstacle.style.bottom = `${xPosition - 4}px`; // just placeholder numbers to see if the rocks come out
          }
    }, 50) // interval set at every 2 seconds
  }


function checkLaserHit(laser, obstacle) { // determines if the laser has hit the obstacle. Probably the most important function and unsurprisingly the one giving me the biggest headache...
  let laserBottom = parseInt(laser.style.bottom);
  let laserLeft = parseInt(laser.style.left);
  let laserRight = 900 - (laserLeft + 50);
  let obstacleLeft = parseInt(obstacle.style.left);
  let obstacleRight = 900 - (obstacleLeft + 100);
  let obstacleBottom = parseInt(obstacle.style.bottom);
  if ((laserBottom != 540) && (laserBottom + 80 >= obstacleBottom)) {
    if ((laserLeft >= obstacleLeft) && (laserRight >= obstacleRight)) {
      return true
    } 
  }
}


function gameOver() { // function for when the game ends. Here that is when the spaceship collides into a moonrock
  window.removeEventListener("keydown", flySpaceship);
  clearInterval(obstacleInterval);
  let obstacles = document.querySelectorAll(".obstacle");
  obstacles.forEach(obstacle => obstacle.remove());
  let lasers = document.querySelectorAll(".laser");
  lasers.forEach(laser => laser.remove());
  
  setTimeout (() => {
    alert("Game Over! The aesteroids collided into earth. Your final score is " + scoreCounter.innerText + "!");
  spaceship.style.left = "180px";
  startButton.style.display = 'block';
  instructions.style.display = 'block';
  scoreCounter.innerText = 0;
  }, 1100) 
}


function playGame() { // function to start playing the game. Necessary to get rid of the startButton and instructions. Also to call the function for obstacles + laserbeams.
  startButton.style.display = 'none';
  instructions.style.display = 'none';
  window.addEventListener("keydown", flySpaceship);
  obstacleInterval = setInterval(() => {createObstacle() 
  }, 2100)
}

// flySpaceship()
// shootLaserbeam()
// createObstacle()
// checkLaserHit()

