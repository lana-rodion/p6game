"use strict"
let board = document.getElementById("gameGrid");

let count = -1;
for(let i = 0; i < 100; i++)
{
    count++;
    let cell = document.createElement("div");
    cell.setAttribute("id", count);
    cell.setAttribute("style", "width: 2.5em; display: inline-block; height: 2.5em; background-color: #efefef; border: 1px solid #000;");
    if(count > 9) {
        board.appendChild(document.createElement("br"));
        count = 0;
    }
    board.appendChild(cell);
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");

});