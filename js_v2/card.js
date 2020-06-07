class Card{

    // Constructeur
    constructor(playerObj, cardId){
        this.player = playerObj;
        this.cardId = cardId;
        // Propriétées listées mais non initialisées
        this.playerName = "";
        this.imgPlayer = "";
        this.pv = "";
        this.weaponDesc = "";
        this.atckBtn = "";
        this.dfsBtn = "";   
    }

    init(){
        
        // Nom du joueur
        this.playerName = this.cardId.querySelector("h1");
        this.playerName.textContent = this.player.name;
        
        // Image
        this.imgPlayer = this.cardId.querySelector("img");
        this.imgPlayer.setAttribute("src", this.player.imgUrl);
        // PV
        this.pv = this.cardId.querySelector("span");
        this.pv.textContent = this.player.health;
       
        // Descriptif arme
        this.weaponDesc = this.cardId.querySelector("p:nth-child(3)");
        this.weaponDesc.textContent = "Pas d'arme équipée : dégâts 10";

        // Bouton attaquer
        this.atckBtn = this.cardId.getElementsByTagName("input")[0];
        // Clonage des boutons pour supprimer les event-listeners des parties précédentes
        let cloneAtckBtn = this.atckBtn.cloneNode();
        // Remplacement du noeud par le clone
        this.atckBtn.parentNode.replaceChild(cloneAtckBtn, this.atckBtn);
        // On repasse la référence au noeud cloné
        this.atckBtn = this.cardId.getElementsByTagName("input")[0];

        // Bouton défendre
        this.dfsBtn = this.cardId.getElementsByTagName("input")[1];
        // Clonage des boutons pour supprimer les event-listeners des parties précédentes
        let cloneDfsBtn = this.dfsBtn.cloneNode();
        // Remplacement du noeud par le clone
        this.dfsBtn.parentNode.replaceChild(cloneDfsBtn, this.dfsBtn);
        // On repasse la référence au noeud cloné
        this.dfsBtn = this.cardId.getElementsByTagName("input")[1];


        // Création des events listeners

        // Attaque
        this.atckBtn.addEventListener("click", (e) => {
            // Le joueur actif attaque le joueur inactif
            if(player1.active === true){
                player2.attack(player1);
            }
            else if (player2.active === true){
                player1.attack(player2);
            }
            
            // On change de joueur actif dans le board
            changePlayer();
            // On check les PV des joueurs
            checkPlayersHealth();
        });

        // Défense
        this.dfsBtn.addEventListener("click", (e) => {
            // Le joueur triggé bloque
            this.player.block();
            // On change de joueur actif dans le board
            changePlayer();
        });
    }

    // Activation de la card
    activate(){
        // On active le pulse de border
        this.cardId.classList.add("pulseBorderAnimation");
        // On active les boutons
        this.atckBtn.removeAttribute("disabled");
        this.dfsBtn.removeAttribute("disabled");
        // On affiche complètement le conteneur
        this.cardId.style.opacity = "1";
    }

    // Désactivation de la card
    deactivate(){
        // On désactive le pulse de border
        this.cardId.classList.remove("pulseBorderAnimation");
        // On désactive les boutons
        this.atckBtn.setAttribute("disabled", true);
        this.dfsBtn.setAttribute("disabled", true);
        // On masque en partie le conteneur
        this.cardId.style.opacity = "0.3";
    }

    // Masquage des boutons de combat
    hideBtn(){
        // On masque le bouton d'attaque et de défense
        this.atckBtn.style.display = "none";
        this.dfsBtn.style.display = "none";
    }

    // Affichage des boutons de combat
    showBtn(){
        // On affiche le bouton d'attaque et de défense
        this.atckBtn.style.display = "block";
        this.dfsBtn.style.display = "block";
    }

    }


function drawCards(){
    // Création des cards
    let card1 = new Card(player1, player1_card);
    let card2 = new Card(player2, player2_card);
    // Initialisation des cards
    card1.init();
    card2.init();
    // Affectation des cards aux players
    player1.card = card1;
    player2.card = card2;
}

