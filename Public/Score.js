/**
 * Created by Vampiire on 5/22/17.
 */

function Score(){

// determines if a point has been scored by the top or bottom player
// awards point and updates respective DOM element
    this.scorePoint = function(ball){
        if(ball.y >= STAGE_HEIGHT){
            topScore++;
            this.showScore('topScore', topScore);
            ball.randomize(width/2,height/2);

            // play point scored sound if mute is off
            if(!mute){
                pointAwarded.playMode('restart');
                pointAwarded.play();
            }
        }

        if(ball.y <= 0){
            bottomScore++;
            this.showScore('bottomScore', bottomScore);
            ball.randomize(width/2,height/2);

            // play point scored sound if mute is off
            if(!mute){
                pointAwarded.playMode('restart');
                pointAwarded.play();
            }

        }

    };

// on point score of a ball have that ball reset to center
//     this.reset = function(ball){
//         ball.y = width/2;
//         ball.x = height/2;
//         ball.xvel = 0;
//         ball.yvel = 0;
//
//     // issue with multiple balls: allows "ball drop" before all balls have been reset
//         // works fine with 1 ball
//         start = false;
//
//     };

    this.showScore = function(pointsDiv, playerPoints){
        document.getElementById(pointsDiv).textContent = playerPoints;
    }
}
