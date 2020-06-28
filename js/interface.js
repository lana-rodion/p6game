// Display game rules with toggle button
$( document ).ready(function() {

    $("#game-rules").css( "display", "none" );

    /*$("#rules").click(function() {
        $("#game-rules").toggle("slow");
    });*/

    $("#rules").click(function(){
        $("#game-rules").slideToggle(1000);
    });
});

/* TO DO music volume buttons
    <button id="volumeUp" class="btn-song float-right mt-2" onclick="play()"><i class="fas fa-volume-up"></i></button>
    <button id="volumeMute" class="btn-song float-right mt-2" style="display: none;"><i class="fas fa-volume-mute"></i></button>
*/

const musicFond = document.getElementById("musicFond");

function play() {
    musicFond.play();
}

function mute() {
    musicFond.pause();
}
