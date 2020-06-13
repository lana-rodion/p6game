// A $( document ).ready() block.
$( document ).ready(function() {
    $("#game-rules").css( "display", "none" );
    $("#rules").click(function() {
        $("#game-rules").toggle("slow");
    } );
});