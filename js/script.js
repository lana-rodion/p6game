"use strict"
window.onload = function() {
	let canvasWidth = 400;
	let canvasHeight = 400;
	//let blockSize = 40;
	let ctx;
	let delay = 100;
	//let xCoord = [];
	//let yCoord = [];
	//let widthInBlocks = canvasWidth / blockSize;
	//let heightInBlocks = canvasHeight / blockSize;
	let score;
	let pointsStart;
	let timeOut;

	function drawScore() {
		ctx.save();
		let centreX = canvasWidth / 2;
		let centreY = canvasHeight / 2;
		ctx.fillText(score.toString(), centreX, centreY); //Number du score est de type string
		ctx.restore();
	}

	function refreshCanvas() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		drawScore();
		timeOut = setTimeout(refreshCanvas, delay);
	}

	function init() {
		let gameGrid = document.getElementById("gameGrid");
		let canvas = document.createElement("canvas");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		canvas.style.border = "5px solid #6c757d";
		canvas.style.margin = "50px auto";
		canvas.style.display = "block"; //pour centrer l'élément sur la page
		canvas.style.backgroundColor = "#ddd";
		gameGrid.appendChild(canvas);
		ctx = canvas.getContext("2d");
		score = 0;
		pointsStart = 100;
		refreshCanvas();
	}

	/*function gameOver() {
		ctx.save();
		let centreX = canvasWidth / 2;
		let centreY = canvasHeight / 2;
		ctx.strokeText("Game Over", centreX, centreY - 180);
		ctx.fillText("Game Over", centreX, centreY - 180);
		ctx.font = "bold 30px sans-serif";
		ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 120);
		ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 120);
		ctx.restore();
	}*/

	/*function player(position) {
		this.position = position;
		this.draw = function () {
			ctx.save();
			ctx.fillStyle = "#33cc33";
			ctx.beginPath();
			let radius = blockSize / 2;
			let x = this.position[0] * blockSize + radius;
			let y = this.position[1] * blockSize + radius;
			ctx.arc(x, y, radius, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.restore();
		};
		this.setNewPosition = function () {
			let newX = Math.round(Math.random() * (widthInBlocks - 1));
			let newY = Math.round(Math.random() * (heightInBlocks - 1));
			this.position = [newX, newY];
		};
	}*/
	document.addEventListener("DOMContentLoaded", (event) => {
		console.log("DOM entièrement chargé et analysé");
		init();
	});
}
















