// A $( document ).ready() block.
$(function() {
    $("#game-rules").css( "display", "none" );
    $("#rules").click(function() {
        $("#game-rules").toggle("slow");
    } );
});