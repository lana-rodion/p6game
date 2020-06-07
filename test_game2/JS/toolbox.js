// Fonction pour selectionner un entier aleatoire entre deux nombres entiers (min et max)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
// Fonction permettant d'obtenir les coordonnées "data-lgn" et "data-col" en fonction de l'Id de la case
function calculatePosition (caseId) {
    var lgnInd = $('#' + caseId).attr("data-lgn");
    var colInd = $('#' + caseId).attr("data-col");
    var coord = {
        lgn : lgnInd,
        col : colInd
    }
    return coord;
}; 

// Fonction de controle  si doublon et attribution ID
function contDoublon(){
    var caseRandom = getRandomInt(0,99);
        if (caseRandom <10){
            caseRandom = '0' + caseRandom;
        }
        else {
            caseRandom = String(caseRandom);
        }                   
        var nbreComp = caseSelec.includes(caseRandom);                     
        if (nbreComp === false){ 
            console.log(nbreComp)              
            caseSelec.push(caseRandom);                   
            return caseRandom                  
        }
        else {
            return this.contDoublon();                 
        }               
}
// Fonction de controle  si doublon et attribution ID mais aussi si les joueurs ne sont pas a proximite
function checkContDoublon(){
    var caseRandom = getRandomInt(0,99);
        if (caseRandom <10){
            caseRandom = '0' + caseRandom;
        }
        else {
            caseRandom = String(caseRandom);
        }                   
        var nbreComp = caseSelec.includes(caseRandom);                          
        if (nbreComp === false){
            if ( !checkPlayerPositions(player1.lgn, calculatePosition(caseRandom).lgn, player1.col, calculatePosition(caseRandom).col )) {                          
                caseSelec.push(caseRandom);                   
                return caseRandom 
            } 
            else {
                return this.checkContDoublon(); 
            }               
        }
        else {
            return this.checkContDoublon();                 
        }               
}


function checkPlayerPositions(x1,x2,y1,y2){
    // S'il sont à moins d'une ligne d'écart
    if ((Math.abs(x1 - x2)  === 1) & (Math.abs(y1- y2) === 0)){
        return true;
    }   
    // S'il sont sur la même ligne
    else if ((Math.abs(x1 - x2)  === 0) & (Math.abs(y1- y2) === 1)){
        return true;
    }   
    // Sinon
    else{
        // Variable globale à false : pas de contact
        return false;
    }  
};
