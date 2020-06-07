class Weapon {
    // Constructeur
    constructor (name, power, Id){
        
        this.name = name;
        this.power = power;
        this.Id = Id;
        this.col = "";
        this.lgn = "";
        this.col = calculatePosition(this.Id).col;
        this.lgn = calculatePosition(this.Id).lgn;

    }  

 // Un joueur s'est équippé de l'arme
    equipped(weapObj){
        if (weapObj === weapon1){
            $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]').removeClass("weapon1");
            
        }
        if (weapObj ===weapon2){
            $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]').removeClass("weapon2");
            
        }
        if (weapObj===weapon3){
            $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]').removeClass("weapon3");
            
        }
        if (weapObj===weapon4){
            $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]').removeClass("weapon4");
            
        }
        // Les coordonnées sont remises à zéro
        this.col = "";
        this.lgn = "";
    }

    // Un joueur drop l'arme
    dropped(weapon,lgn, col){
        // Mise à jour des coordonnées de l'arme actuellement équipée
        this.lgn = lgn;
        this.col = col;
        // On crée le pion dans le grid
        
        if (weapon === weapon1){
        $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]').addClass("weapon1");  
        }
         if (weapon === weapon2){
        $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]').addClass("weapon2");  
        }
         if (weapon === weapon3){
        $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]').addClass("weapon3");  
        }
         if (weapon === weapon4){
        $('div[data-lgn = "' + (this.lgn) +'"][data-col ="'+ (this.col)+'"]').addClass("weapon4");  
        }
    }
}

function drawWeapon(){
    for(var k=0 ; k<4 ; k++) {
        var weaponId = contDoublon();            
        if ( k === 0){
            weapon1 = new Weapon ("EPEE",20,weaponId)
            $('#'+ weaponId ).addClass('weapon1');
            weapons.push(weapon1);         
        }
        else if ( k === 1){
            weapon2 = new Weapon ("LASER",35,weaponId) 
            $('#'+ weaponId ).addClass('weapon2');
          weapons.push(weapon2);
        }
        else if ( k === 2){
            weapon3 = new Weapon ("MAIN",15,weaponId) 
            $('#'+ weaponId ).addClass('weapon3');
          weapons.push(weapon3);
        } 
        else if ( k === 3){
            weapon4 = new Weapon ("PISTOLET",25,weaponId) 
            $('#'+ weaponId ).addClass('weapon4');
          weapons.push(weapon4);
        }                                   
    }
}

