class Player {
    // Constructeur
    constructor (name, health,imgUrl, active){
        
        this.name = name;
        this.health = 100;
        this.strength = 10;
        this.imgUrl = imgUrl;
        this.nbCasesDisp = 3;
        this.active = false;
        this.equippedWeapon = "";    
        // Coordonnées de fin de déplacement
        this.finalCol = "";
        this.finalLgn = "";
        // Coordonnées du joueur                
        this.col = "";
        this.lgn = "";
        
        

    } 
    // On determine la position du player1
    setPositionPlayer1(){
        this.playerId = contDoublon();
        this.col = calculatePosition(this.playerId).col;
        this.lgn = calculatePosition(this.playerId).lgn;
    };
    // On determine la position du player2 tout en s'assurant qu'il soit pas a coté du player1
    setPositionPlayer2(){
        this.playerId = checkContDoublon();
        this.col = calculatePosition(this.playerId).col;
        this.lgn = calculatePosition(this.playerId).lgn;
    };

    // Remplissage des cellules de déplacement autorisées
    setDispNodelist(){
        // On boucle sur les lgn en négatif     
        for(let i = 1; i <= this.nbCasesDisp; i++){
            // On vérifie qu'on ne sort pas de la table          
            if (this.lgn-i >= 0){               
                let deplId = $('div[data-lgn = "' + (this.lgn-i) +'"][data-col ="'+(this.col)+'"]').attr('id');
                // Si c'est une cellule bloquée, on sort de la boucle
                if ($('div[id = "' +deplId+'"]').hasClass('blocked')){
                    break;
                }
                // Si ce n'est pas une cellule bloquée
                else{
                    dispNodeList.push(deplId);                                       
                }  
            }
            else {
                break;
            }
        }
        // On boucle sur les lgn en positif
        for(let i = 1; i <= this.nbCasesDisp; i++){
            // On vérifie qu'on ne sort pas de la table
            if (Number(this.lgn)+i < 10){                
                let deplId = $('div[data-lgn = "' + (Number(this.lgn)+i) +'"][data-col ="'+(this.col)+'"]').attr('id');               
                // Si c'est une cellule bloquée, on sort de la boucle
                if ($('div[id = "' +deplId+'"]').hasClass('blocked')){
                    break;
                }
                // Si ce n'est pas une cellule bloquée
                else{
                    dispNodeList.push(deplId);                                        
                }  
            }
            else {
                break;
            }
        }
        // On boucle sur les col en négatif
        for(let i = 1; i <= this.nbCasesDisp; i++){
            // On vérifie qu'on ne sort pas de la table
            if (this.col-i >= 0){
                let deplId = $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+(this.col-i)+'"]').attr('id');                
                // Si c'est une cellule bloquée, on sort de la boucle             
                if ($('div[id = "' +deplId+'"]').hasClass('blocked')){
                    break;
                }
                // Si ce n'est pas une cellule bloquée
                else{
                    dispNodeList.push(deplId);                                        
                }  
            }
            else {
                break;
            }
        }
        // On boucle sur les col en positif
        for(let i = 1; i <= this.nbCasesDisp; i++){
            // On vérifie qu'on ne sort pas de la table
            if (Number(this.col)+i < 10){             
                let deplId = $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+(Number(this.col)+i)+'"]').attr('id');               
                // Si c'est une cellule bloquée, on sort de la boucle 
                if ($('div[id = "' +deplId+'"]').hasClass('blocked')){             
                    break;
                }
                // Si ce n'est pas une cellule bloquée
                else{
                    dispNodeList.push(deplId);                                       
                }  
            }
            else {
                break;
            }
        }
        // On boucle sur la liste des cellules de déplacement autorisés
        dispNodeList.forEach((deplId) => {          
            // On ajoute la classe displAllowed
            $('#'+ deplId ).addClass("displAllowed");
        });
        
    }

     
     // Déplacement case par case du joueur
    goTo(ClassObj){
        // On calcule le vecteur de déplacement      
        let depLgn = finalLgn - this.lgn;
        let depCol = finalCol - this.col;
        // On se déplace verticalement
        if (depLgn !== 0){
            // On crée un tableau des cases que le joueur va parcourir
            let tabCaseSelec = [];
            // On boucle sur les lgns
            for (let i = 1; i <= Math.abs(depLgn); i++){
                // On calcule l'incrément
                let incLgn = Math.abs(depLgn)/depLgn;
                // On met à jour les coordonnées
                this.lgn = Number(this.lgn) + Number(incLgn);
                // On déplace le joueur
                // "a" represente la case que le joueur a parcouru         
                let a =$('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]');
                // Chaque case parcouru est insérée dans le tableau
                tabCaseSelec.push(a);
                // On verifie qu'il n'y est pas d'armes ou qu'il rentre pas en contact avec l'adversaire durant son deplacement
                this.checkSituation();
                // Si il y a contact avec le joueur, on stoppe le deplacment
                if (checkPlayerPositions(player1.col,player2.col,player1.lgn, player2.lgn) === true){
                    break;
                }
            }
            // On determine avec le last le dernier element du tableau
            let last = tabCaseSelec[tabCaseSelec.length-1];
            // On y affecte la classe du joueur
            last.addClass(ClassObj);
            
        }
        // On se déplace horizontalement
        if (depCol !== 0){
            // On crée un tableau des cases que le joueur va parcourir
            let tabCaseSelec = [];
            // On boucle sur les lgns
            for (let i = 1; i <= Math.abs(depCol); i++){
                // On calcule l'incrément
                let incCol = Math.abs(depCol)/depCol;
                // On met à jour les coordonnées
                this.col = Number(this.col) + Number(incCol);
                // On déplace le pion
                // "a" represente la case que le joueur a parcouru  
                let a =$('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]');
                // Chaque case parcouru est insérée dans le tableau
                tabCaseSelec.push(a);
                // On verifie qu'il n'y est pas d'armes ou qu'il rentre pas en contact avec l'adversaire durant son deplacement
                this.checkSituation();
                // Si il y a contact avec le joueur, on stoppe le deplacment
                if (checkPlayerPositions(player1.col,player2.col,player1.lgn, player2.lgn)=== true){
                    break;
                }
            }
            // On determine avec le last le dernier element du tableau
            let last = tabCaseSelec[tabCaseSelec.length-1];
            // On y affecte la classe du joueur
            last.addClass(ClassObj);
        }
        
    } 

    // Fonction lancée à chaqué déplacement
    checkSituation(){
        // On boucle sur les armes
        for (let weapon of weapons){
            // On regarde si les coordonnées correspondent
            if ( (weapon.col == this.col) && (weapon.lgn == this.lgn)){
                // S'il n'a pas déjà une arme
                if (this.equippedWeapon === ""){
                    // L'arme passe en statut équipée
                    weapon.equipped(weapon);
                    // On affecte l'arme au player
                    this.equippedWeapon = weapon;
                    // On équipe l'arme
                    this.equipWeapon();
                    
                }
                else{
                    // On drop l'arme actuellement équipée sur la position actuelle du pion du joueur
                    this.equippedWeapon.dropped(this.equippedWeapon,this.lgn, this.col);
                    // La nouvelle arme passe en statut équipée
                    weapon.equipped(weapon);
                    // On affecte la nouvelle arme au player
                    this.equippedWeapon = weapon;
                    // On équipe l'arme
                    this.equipWeapon();
                    // On sort de la boucle, sinon on équipera toujours la dernière arme de la liste
                    break;
                }
            }
        }
        // On check si les joueurs sont en contact
        checkPlayerPositions(player1.col,player2.col,player1.lgn, player2.lgn);
        // S'ils sont en contact on lance le combat
        if (checkPlayerPositions(player1.col,player2.col,player1.lgn, player2.lgn) === true){
            fight();
        }
    }

      // Équipement de l'arme qui est affectée
    equipWeapon(){
        // Nouvelle url de l'image
        let url = "Images/Players/" + this.name + "_" + this.equippedWeapon.name + ".png";
        // Mise à jour de l'url de l'image
        this.imgUrl = url;
        // Mise à jour de la force du player*/
        this.strength = this.equippedWeapon.power;
        // On affiche la description de l'arme dans la card*/
        this.card.weaponDesc.textContent = "Équipé de : " + this.equippedWeapon.name + " - Dégâts : " + this.equippedWeapon.power;
        // On met à jour l'image dans la card
        this.card.imgPlayer.setAttribute("src", url);
    }

     // Méthode d'attaque
    attack(playerObj){
        // Il ne bloque plus
        this.isBlocking = false;
        // On crée une variable contenant les dégâts à infliger
        let damages;
        // Si l'adversaire est en train de bloquer, il n'encaisse que la moitié des dommages
        if (playerObj.isBlocking === true){
            // Les dégâts sont divisés par 2
            damages = Math.floor(this.strength/2);
        }
        // Sinon on inflige les dégâts normaux
        else{
            damages = this.strength;
        }
        // On frappe
        this.hit(playerObj, damages);
    }

    // Inflige les dégats
    hit(playerObj, damages){
        // On vérifie que la vie ne tombe pas sous zéro
        if (playerObj.health - damages >= 0){
            // Si oui, on fait la soustraction
            playerObj.health = playerObj.health - damages;
        }
        else{
            // Si non, on met la vie à zéro
            playerObj.health = 0;
        }
        // On met à jour la card du joueur attaqué
        playerObj.card.pv.textContent = playerObj.health;
        // On baisse la barre de PV
        // Player1
        if ( playerObj === player1){
        $('#player1_card progress.pv_bar').attr('value',playerObj.health);
        }
        // Player2
        if ( playerObj === player2){
        $('#player2_card progress.pv_bar').attr('value',playerObj.health);
        }
    }

    // Méthode de défense
    block(){
        // Il bloque
        this.isBlocking = true;
    }
 }   

function drawPlayer() {
    player1 = new Player ("KRYLEX",100,"Images/Players/player1.png",false);
    player1.setPositionPlayer1();
    $('#'+ player1.playerId ).addClass('player1');
    players.push(player1); 
    player2 = new Player ("PLUTOR",100,"Images/Players/player2.png",false);
    player2.setPositionPlayer2();
    $('#'+ player2.playerId ).addClass('player2');
    players.push(player2);

};