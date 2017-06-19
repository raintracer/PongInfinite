/**
 * Created by Vampiire on 5/22/17.
 */

module.exports = Score;
const Constants = require('./ServerMain').Constants;

let topScore=0, bottomScore=0;

function Score() {

// determines if a point has been scored by the top or bottom player
// awards point and updates respective DOM element
    this.scorePoint = function (ball) {
        if (ball.y >= Constants().STAGE_HEIGHT) {
            topScore++;
            ball.randomize(Constants().STAGE_WIDTH / 2, Constants().STAGE_HEIGHT / 2);
        }

        if (ball.y <= 0) {
            bottomScore++;
            ball.randomize(Constants().STAGE_WIDTH / 2, Constants().STAGE_HEIGHT / 2);

        }

    };
}