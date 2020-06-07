class Board {

    constructor (selector, COL=10, LGN=10){
        this.COL = COL;
        this.LGN = LGN;
        this.selector = selector;
        //this.cellsNodeList = [];
        this.drawGame();
    }
    // AFFICHAGE DU JEU

    drawGame(){
        const jeu = $(this.selector);
        for(let i =0; i < this.LGN; i++){
            // Création des lignes
            var lgn = $('<div>');
            for(var j =0; j< this.COL; j++){
                // Création des colonnes et des cellules
                var col = $('<div>').addClass('cell').attr("ID",i.toString() + j.toString()).attr("data-lgn",i).attr("data-col",j).click(function(){clickCase($(this))});
                lgn.append(col);
            }
            jeu.append(lgn);
        }
    }
}

// Création des murs
function drawWall() {
    for(let k=0;k < nbWall ; k++) {
        let wallId = contDoublon();
        $('#'+ wallId).addClass('blocked');
    }
}

// Création des eventlisteners de déplacement
function clickCase(e){
    // Si la cellule est autorisée au déplacement et que les joueurs ne sont pas en contact (pas de combat)
    if (e.hasClass("displAllowed")){
        // On déplace le pion vers la case cliquée
        movePlayer(e.attr("ID"));
        // On change de joueur
        changePlayer();
        // On retire la class displAllowed des cellules de déplacement du player inactif et ajoute les deplacements du joueur actif dans le cas ou il n'y a pas contact avec un autre joueur
        if(checkPlayerPositions(player1.col,player2.col,player1.lgn, player2.lgn) === false){
            // On retire la class displAllowed des cellules de déplacement du player inactif
            dispNodeList.forEach((deplId) => {
                $('#'+ deplId ).removeClass("displAllowed");
            });
            // On vide la liste des cellules de déplacement autorisés
            dispNodeList = [];
            // On affiche les deplacements possibles du joueur actif
            dispDeplMouvement();
        }
        // On retire la class displAllowed des cellules de déplacement du player inactif sans ajouter les deplacements du joueur actif dans le cas ou il y a contact avec un autre joueur
        else {
            // On retire la class displAllowed des cellules de déplacement du player inactif
            dispNodeList.forEach((deplId) => {
                $('#'+ deplId ).removeClass("displAllowed");
            });
        }
    }
}


function movePlayer(Id){
    // On calcule la position du click de deplacement en fonction de l'Id de la case
    finalCol = calculatePosition(Id).col;
    finalLgn = calculatePosition(Id).lgn;
    if (player1.active === true){
    // On supprime l'image du joueur sur sa position initiale
        $('div[data-lgn = "' + (player1.lgn) +'"][data-col ="'+(player1.col)+'"]').removeClass('player1');
        player1.goTo("player1");
    }
    else {
    // On supprime l'image du joueur sur sa position initiale
        $('div[data-lgn = "' + (player2.lgn) +'"][data-col ="'+(player2.col)+'"]').removeClass('player2');
        player2.goTo("player2");
    }
}

function dispDeplMouvement(){
    if (player1.active === true){
        player1.setDispNodelist();
    }

    else{
        player2.setDispNodelist();
    }
}

function changePlayer(){
    // On change de joueur actif
    if (player1.active === true){
        player1.active = false;
        player2.active = true;
        if(checkPlayerPositions(player1.col,player2.col,player1.lgn, player2.lgn) === true){
            // On désactive la card du joueur inactif
            player2.card.deactivate();
            // On active la card du joueur actif
            player1.card.activate();
        }
    }

    else{
        player1.active = true;
        player2.active = false;
        if(checkPlayerPositions(player1.col,player2.col,player1.lgn, player2.lgn) === true){
            // On désactive la card du joueur inactif
            player1.card.deactivate();
            // On active la card du joueur actif
            player2.card.activate();
        }

    }
}

// Lancement du combat
function fight(){
// On affiche les boutons de combat
    player1.card.showBtn();
    player2.card.showBtn();
// On lance le son
    let audio = new Audio('Audio/gong.mp3');
    audio.play();
}

// Check si un des players est mort
function checkPlayersHealth(){
    // On boucle sur les players
    for (let player of players){
        // S'il n'a plus de points de vie
        if (player.health <= 0){
            // On désactive la card du joueur
            player.card.deactivate();
            // On annonce la fin du combat
            let span = $("#announcement");
            // On ajoute le texte
            span.text(player.name + " EST MORT !");
            span.addClass("popAnimation");
            // On supprime l'animation au bout de 2 sec
            setTimeout(()=>{span.removeClass("popAnimation");}, 5000);
            // On lance le son
            let audio = new Audio('Audio/KO.wav');
            audio.play();
        }
    }
}