*Approach and Process*
1. What in my process and approach to this project would I do differently next time?
I would probbaly develop my game logic much more meticulously. This time, I started writing my code with a rough idea of what I wanted the game conceputally to end up looking like. I wasted a lot of time starting on functuons only to realise that additional functions were required to trigger the current function I was working on. I would also probably spend more time at the drawing board, doing reasearch on the best approach to take. In general, I spent a lot of time researching functions to solve the troublesome functions I had already coded. For e.g. a lot of people used canvas but I didn't realise that was an option before I got stuck in. 

2. What in my process and approach to this project went well that I would repeat next time?

My "gung-ho" approach. I have never been a big gamer and I felt quite daunted by the task when we were first assigned it, especially becasue I felt at the beginning of the week my JS was not my strongest point. But I tried to just get stuck into it. It helped that once I set my mind on creating a "space invaders"-like game was pretty excited to code my vision into reality. I also think I kept really optimistic and positive, regardless of the number of glitches, I really wanted to persevere and use as much of the knowledge I had acquired in the first few weeks of lessons.

--

*Code and Code Design*
For each, please include code examples.
- Code snippet up to 20 lines.
- Code design documents or architecture drawings / diagrams.

1. What in my code and program design in the project would I do differently next time?
Not use so many setIntervals()... also would try and think of better game logic than have to draw in the earth! Haha  

=== 

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

===

2. What in my code and program design in the project went well? Is there anything I would do the same next time?
HTML, CSS and all the graphics which I ended up drawing myself. Definitely create my own graphics and customise as many of the stylistic elements as possible. E.g. using border-radius, Google fonts, Pantone colorfinder etc. 

	
*WDI Unit 1 Post Mortem*
1. What habits did I use during this unit that helped me?
Good time managment, having realistic expectations and remembering that perfection is unattainable. 

2. What habits did I have during this unit that I can improve on?
Impulsivity, stubborness and an irrational anxiety for JS functions...

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)
Good, I felt that the material that we learnt in class was all relevant to allowing me to create my first project. Further, I feel that each class was well-delivered with a strong balance of teaching from Akira and independent learning that we are meant to participate in. 