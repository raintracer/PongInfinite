/**
 * Created by Vampiire on 5/22/17.
 */

module.exports = Score;

const Factory = require('./ObjectFactory');
const factory = new Factory();

const Constants = { STAGE_WIDTH: 400, STAGE_HEIGHT: 500, CHAOS : 1, TRANSFER_COEFFICIENT : 0.4};

let topScore=0, bottomScore=0;

function Score() {

// determines if a point has been scored by the top or bottom player
// awards point and updates respective DOM element
    this.scorePoint = function (ball) {
        if (ball.y >= Constants.STAGE_HEIGHT) {
            topScore++;
            // IDEA ____________>
            // turn the client index into an ejs to serve score and player information
            let newBall = factory.createObject("Ball", Constants.STAGE_WIDTH/2, Constants.STAGE_HEIGHT/2, ball.red, ball.green, ball.blue);
            // ball.randomize();
            factory.deleteObject(ball.id);
            // newBall.randomize();
        }

        if (ball.y <= 0) {
            bottomScore++;
            let newBall = factory.createObject("Ball", Constants.STAGE_WIDTH/2, Constants.STAGE_HEIGHT/2, ball.red, ball.green, ball.blue);
            // ball.randomize();
            factory.deleteObject(ball.id);
            // ball.randomize();

        }
    };

    this.getScore = function(){
        return { top : topScore, bottom : bottomScore};
    }

}

