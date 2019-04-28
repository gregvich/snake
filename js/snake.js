window.onload = function() { // Un gestionnaire d'évènement pour l'évènement load (chargement) de la fenêtre.
                            // Cela permet d'empêcher l'exécution du code avant le chargement complet de tous les éléments de la page.
                       

    // on crée la variable canvas en dehors de la méthode init pour qu'elle puisse avoir une portée plus large que celle de la fonction init
    var canvasWidth = 900;  // La largeur de notre canvas
    var canvasHeight = 600; // La hauteur de notre canvas
    var blockSize = 30; // la largeur d'un block qui correspond au block du canvas ou du serpent
    var ctx; // je créer la variable contexte pour pouvoir l'utiliser ensuite
    var delay = 100; // exprimé en millisecondes (1 seconde)
    // var xCoord = 0; // (x) horizontal : de base il est tout à gauche
    // var yCoord = 0; // (y) vertical ; de base il est tout en haut
    var snakee; // cette variable représente le serpent. L'objectif est de pouvoir l'utiliser dans toutes les méthodes (qu'elle ait une portée "globale"?)
    var applee;

    init(); // ici on exécute la fonction crée en dessous
        
    function init(){ // on appelle et on créer la fonction init

        // le canvas est la zone dans lequel le jeu va se dérouler
        // on utilise la méthode creatElement pour créer le canvas dynamiquement
        // le canvas est désormais un élément du DOM 
        // https://developer.mozilla.org/fr/docs/Web/API/Document/createElement (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        // Dans un document HTML, la méthode  document.createElement() crée un élément HTML du type spécifié par  tagName
        // exemple : var element = document.createElement(tagName[, options]);
        var canvas = document.createElement('canvas'); 
    
        canvas.width = canvasWidth; // on définit largeur du canvas 
        canvas.height = canvasHeight; // on définit la hauteur du canvas
        canvas.style.border = "1px solid"; // on ajoute un bordure au canvas pour pouvoir mieux la visualiser
        document.body.appendChild(canvas); // ICI on RELIE le Canvas et le html (document) via le body
        ctx = canvas.getContext('2d'); // Je met le contexte en 2d ( il y a 4 possibilités mais ici on choisis 2d) https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/getContext
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4]], "right") // Le body [] est le corps complet du serpent qui est représenté par 3 blocks. le 1er crochet représente le canvas et les crochets chaque block
        // right signifie qu'il ira a droite de base 
        applee = new Apple([10,10]); // Son X et son Y ( x 10, y 10 )
        refreshCanvas(); // on appelle la fonction refreshCanvas pour la charger

   
    }

    function refreshCanvas() { // à chaque seconde on appelle la fonction refreshCanvas qui va permettre de faire bouger le snake par défaut
        
        
         // xCoord += 2; // valeur horizontal ( direction vers laquelle le serpent va se deplacer)
         // yCoord += 2; // valeur vertical : si on met par exemple le yCoord à 0, le block ne se déplacera que sur le xCoord !!

        // A chaque fois qu'une seconde passe ( 1000 milisecondes) on va le mettre dans une nouvelle position
        // ici on efface toute la largeur et la hauteur du canvas
        // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/clearRect (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        ctx.clearRect(0,0, canvasWidth, canvasHeight);

        snakee.advance();
        // Ici la couleur de mon serpent
        // https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Ajout_de_styles_et_de_couleurs (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        //  ctx.fillStyle = "#3465A4"; 

        // (x, y, largeur, hauteur) x = horizontal, y = vertical, puis determiner la largeur et hauteur du block serpent
        // xCoord et yCoord sont les coordonnées du serpent dont les valeurs vont bouger à chaque fois que le canvas va être refresh
        // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillRect (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        //  ctx.fillRect(xCoord, yCoord, 200, 30); 


        snakee.draw(); // Je veux que mon serpent se dessine 

        applee.draw(); // je veux qe la pomme se dessine quand on rafraichit la page
        
        // setTimeout permet de définir un « minuteur » (timer) qui exécute une fonction ou un code donné après la fin du délai indiqué.
        // Execute moi refreshCanvas à chaque fois qu'un certain délai est passé (ici delay = 1000 milisecondes)
        // https://developer.mozilla.org/fr/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx,position) {
        // le canvas on ne lui parle pas en terme de block (il ne comprend notre définition de block), il comprend que les pixels
        // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillRect
        // ctx.fillRect(x, y, largeur, hauteur);
        var x = position[0] * blockSize; // la position de la longueur c'est le x de notre block * la taille de chaque block. position[0] c'est l'index du tableau qui stocke la longueur du block
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize); // ici on veut remplir le rectangle. ce rectangle fera une taille de la taille de nos blocksizes
    }

    // Je crée une fonction pour créer le serpent avec en parametre son body ( le prototype de notre serpent, si jamais on voulait en avoir plusieurs)
    // body = corps du serpent
    function Snake(body, direction) { // body represente le carré du snake rien à voir <body>, on rajoute la direction a notre function constructeur
        this.body = body; 
        this.direction = direction;
        // Rappel sur this :
        // https://github.com/O-clock-Alumni/fiches-recap/blob/master/js/this.md (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        // https://www.youtube.com/watch?v=IudrkWwOw8Y (ALT + CLICK POUR SUIVRE DIRECT LE LIEN)
        // Quand tu fais un console.log(this) ça te renvoie window, la valeur de l'objet global
        // this : lorsqu'il appelé dans une fonction ou appelé globalement fait référence à l'objet global
        // La valeur de this change si on l'appelle dans une methode ( methode = une fonction dans un objet )
        // this lorsqu'il est appelé dans une methode d'un objet this vaut alors la valeur de l'objet
        this.draw = function() { // methode qui permettra de dessiner le corps de notre serpent dans le canvas
            
            // save() ---> Sauvegarde l'état du canevas dans sa globalité
           
            // Les états du canvas sont stockés dans une pile. 
            // Chaque invocation de la méthode save() ajoute une copie de l'état courant  du canvas en haut de la pile.
            // La méthode save() peut être invoquée autant de fois que nécessaire. 
            // Chaque appel de restore() enlève le dernier état sauvegardé de la pile et tous les paramètres sauvegardés sont restaurés.
            ctx.save(); // sauvegarder le contexte du canvas cad son contenu comme il était avant que je commence à rentrer dans cette fonction
            ctx.fillStyle = "#3465A4"; 
            // Pour rappel : le corps du serpent est un ensemble de petits blocks, ces blocks sont définis par son body
            // chaque block a un X et un Y que nous allons mettre dans des tableaux
            // chaque block ( du corps du serpent) sera un tableau avec deux valeurs son X et son Y
                // tant que le i est inferieur à la longueur du corps du serpent
                // ( body est un array donc on peut utiliser la proprité length )
                // ce for permettra de passer sur chacun des membres du body du serpent
                for(var i = 0; i < this.body.length; i++) { 

                    // La variable this a comme valeur l’objet qui est en train d’être construit.

                    // permet de dessiner un block, (contexte du canvas dans lequel elle doit dessiner, et la position du block à dessiner )
                    // On veut passer sur chacun des blocks du body
                    // Au debut de la boucle i = 0, ensuite i = 1, i= 2 etc .. jusqu'a 3 ( le nombre de nos blocks dans le body du serpent)
                    drawBlock(ctx, this.body[i]); 

            }
            ctx.restore()  // restore() ---> Restore le plus récent état sauvegardé du canevas.
        };

        this.advance = function() {// fonction pour le faire avancer 
        // On duplique la tete et on enleve le dernier element du corps ( la queue ) pour le faire déplacer 

        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/slice
        // Slice permet de couper-coller un element ; Le tableau original ne sera pas modifié.
        // this.body[0] est la tete de notre serpent ( le premier element de notre body)

        // la variable nextPosition sera la nouvelle position de la tête        
        var nextPosition = this.body[0].slice(); 
                            
        // Ici on fait avancer le serpent d'une case juste selon l'axe des X ( fait réference au 6 du Snake) en partant de la tête vers la droite (+1). 
        // exemple, si on veut changer la position de l'axe des X en partant vers la gauche on va écrire nextPosition[0] -= 
     
        switch(this.direction) {
            case "left":
            nextPosition[0] -= 1; // Position X - 1 pour le faire déplacer vers la gauche
                break;
            case "right":
            nextPosition[0] += 1; // Position X + 1 pour le faire déplacer vers la droite
                break;
            case "down":
            nextPosition[1] += 1; // Position Y + 1 pour le faire déplacer vers le bas
                break;
            case "up":
            nextPosition[1] -= 1; // Position Y - 1 pour le faire déplacer vers le haut
                break;
            default: // sinon on utilise throw() fonction qui nous permet de renvoyer un message d'erreur
                throw("Invalid Direction");
        }
        // unshit() fonction qui marche sur des array, permet de rajouter ce qu'il y a entre parenthese (ici nextPosition) à la premiere place
        // Une fois que je fais unshift nexposition, il y aura maintenant 4 elements. On rajoute [7,4] automatiquement grace à ça
        this.body.unshift(nextPosition);
        // J'ai besoin maintenant de supprimer la derniere position du corp du serpent avec pop()
        this.body.pop(); // pop permet de supprimer le dernier element d'un array donc la queue 

        };
        
        
        this.setDirection = function(newDirection) // la fonction va donner la direction
    {
        var allowedDirections; // directions autorisées
        switch(this.direction)
        {
        case "left": // Quand tu te deplace sur la gauche et la droite tu ne peux aller que en haut ou en bas
        case "right":
            allowedDirections = ["up", "down"]; // ici c'et un array donc l'index 0,1
            break;
        case "down": // Quand tu te deplace vers le bas et le haut tu ne peux aller que en gauche ou a droite
        case "up":
            allowedDirections = ["left", "right"]; // ici c'et un array donc l'index 0,1
            break;
        default: // sinon on utilise throw() fonction qui nous permet de renvoyer un message d'erreur
            throw("Invalid Direction"); 
            
        }
        if(allowedDirections.indexOf(newDirection) > -1) // si l'index de ma nouvelle direction dans mes allowDirections est supérieur à -1 alors la nouvelle direction est permise
        // alloweDirections est un array qui a pour index 0 les x et pour index 1 les y
        //donc si la nouvelle direction n'est pas égale à l'index 0 et 1 alors elle n'est pas permis        
        // la direction est vraie tant que la tête du serpent ne prend la position de la queue .Si la direction est permise car  .. indexOf(élémentRecherché = L'élément qu'on cherche dans le tableau )
        // indexOf compare élémentRecherché aux éléments contenus dans le tableau en utilisant une égalité stricte (la même méthode utilisée par l'opérateur ===).
       
        {
            this.direction = newDirection; // La direction actuelle du serpent sera la nouvelle direction
        }
    };
    
} // ici c'est la fermeture du snake !!! LOL :'D

    function Apple(position){ //ici on va faire comme avec la position du serpent. // Elle a juste besoin d'une position donc position en parametre
    
    this.position = position;
    this.draw = function() { // fonction qui permet de dessiner la pomme
        ctx.save(); // Pour sauvegarder les anciens parametres dans le contexte
        ctx.fillStyle = "#CC0000";
        ctx.beginPath(); // A VERIFIER!!!!!!!!!!!!!!!!!!!!!!!!!!!!  On veut que la form soit ronde, donc pas de Rect 
        var radius = blockSize/2; // le rayon  (var radius) c'est la position du block divisé par 2
        var x = position[0]*blockSize + radius; //position[0] c'est toujours la coordonée de x
        var y = position[1]*blockSize + radius; // position[1] c'est toujours la coordonée de y
        // ctx.arc(x, y, rayon, angleDépart, angleFin, sensAntiHoraire);
        // x = La position en x du centre de l'arc.
        // y = La position en y du centre de l'arc.
        ctx.arc(x,y,radius, 0, Math.PI*2, true); // si c'est un cercle : il faut multiplier le diamètre par le nombre pi . ici on dessine le cercle
        ctx.fill(); // ici on remplit le cerre
        ctx.restore(); // Pour restorer les anciens parametres dans le contexte

         }
    }

    // on veut que la direction change en fonction de ce que tape l'utilisateur
    // L'évènement onkeydown se déclenche lorsque qu'une touche du clavier est enfoncée.
    // on créer une fonction handlekeydown avec un evenemnt (e) en parametre (on peut transmettre chaque evenement)
    document.onkeydown = function handleKeyDown(event) { // event = evenement Lorque qu'on appui sur la touche

    var key = event.keyCode; // A VERIFIER : la variable key a pour valeur l'evenement d'appuyer sur une touche et donc le code numérique de la touche
     //Le langage Javascript associe à chaque touche du clavier un code numérique. Ainsi toute série de touches (et donc de lettres) peut être encodée avec des nombres.
     
    var newDirection; // choisir la direction EN FONCTION de ce que l'utilisateur a appuyé
    switch(key)
    {
        case 37: // 37 correspond au code de la touche "fleche de gauche"
        newDirection = "left";
            break;
        case 38: // 38 correspond au code de la touche "fleche du haut"
        newDirection = "up";
        break;
        case 39: // 39 correspond au code de la touche "fleche de droite"
            newDirection = "right";
            break;
        case 40: // correspond au code de la touche "fleche du bas"
        newDirection = "down";
            break;
            default: // si le code tappé n'est pas 37/38/39 ou 40, je ne continue pas la fonction, donc je l'arrete avec un return
            return;
    }        
    snakee.setDirection(newDirection);
}
}