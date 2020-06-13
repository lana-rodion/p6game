// Display game rules with toggle button
$( document ).ready(function() {
    $("#game-rules").css( "display", "none" );
    $("#rules").click(function() {
        $("#game-rules").toggle("slow");
    } );
});