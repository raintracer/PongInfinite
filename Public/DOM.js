/**
 * Created by Vampiire on 5/24/17.
 */


let muteButton = document.getElementById('mute'), muteIcon = document.getElementById('muteIcon');

muteButton.onclick = function(){

    if(!mute){
    // set mute to true, change icon to reflect the user's selection
        mute = true;
        muteIcon.className -= 'fa fa-volume-up fa-4x';
        muteIcon.className = 'fa fa-volume-off fa-4x';

    // stop any sounds currently being played when the mute button is pressed for instant silence
        ballCollide.stop();
        paddleCollide.stop();
        pointAwarded.stop();
    }

    else if(mute){

    // set mute to false, change icon to reflect the user's selection
        mute = false;
        muteIcon.className -= 'fa fa-volume-off fa-4x';
        muteIcon.className = 'fa fa-volume-up fa-4x';
    }

};
