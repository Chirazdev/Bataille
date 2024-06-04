class Guerrier {
    // Le constructeur 
    constructor() {
        this.type = "Guerrier"; // Type de guerrier
        this.force = 10; // Force du guerrier
        this.cout = 1; // Coût d'une unité de ce guerrier
        this.armure = 1; // Niveau d'armure du guerrier
        this.degat = 1; // Dégâts infligés par le guerrier
        this.pv = 100; // Points de vie du guerrier
    }

    // Méthode pour attaquer un autre guerrier
    frapper(guerrier) {
        let somme = this.lancerMultiples(this.force); // Génère un nombre aléatoire en fonction de la force du guerrier
        guerrier.degatsReçus(somme); // Inflige des dégâts au guerrier cible
    }

    // Méthode pour infliger des dégâts au guerrier en fonction de son armure
    degatsReçus(nbDegat) {
        this.pv -= nbDegat / this.armure; // Réduit les points de vie du guerrier en fonction des dégâts et de l'armure
    }

    // Méthode pour vérifier si le guerrier est mort
    estMort() {
        return this.pv <= 0; // Retourne vrai si les points de vie du guerrier sont inférieurs ou égaux à zéro
    }

    // Méthode pour afficher les informations du guerrier
    afficheInfosGuerriers() {
        return `Type : ${this.type}<br>
                PV : ${this.pv}<br>
                Armure : ${this.armure}<br>
                Force : ${this.force} (Force multiplié par dégat : ${this.degat})<br>
                Cout unité : ${this.cout}`;
    }
  // Méthode pour obtenir le chemin de l'image du guerrier en fonction de son type
  getImageSrc() {
    switch (this.type) {
        case 'Elfe':
            return '../images/elf.png'; // Image de l'elfe
        case 'Chef Elfe':
            return '../images/chef elf.png'; // Image du chef elfe
        case 'Nain':
            return '../images/nain.png'; // Image du nain
        case 'Chef Nain':
            return '../images/chef-nain.png'; // Image du chef nain
        default:
            return ''; // Retourne une chaîne vide si le type n'est pas reconnu
    }
}

    // Getters et setters pour les attributs du guerrier

    getArmure() {
        return this.armure;
    }

    getDegat() {
        return this.degat;
    }

    getType() {
        return this.type;
    }

    getForce() {
        return this.force;
    }

    getCout() {
        return this.cout;
    }

    getPv() {
        return this.pv;
    }

    setPv(pv) {
        this.pv = pv;
    }

    setType(type) {
        this.type = type;
    }

    setForce(force) {
        this.force = force;
    }

    setCout(cout) {
        this.cout = cout;
    }

    setDegat(degat) {
        this.degat = degat;
    }

    setArmure(armure) {
        this.armure = armure;
    }

    // Méthode pour générer un nombre aléatoire 
    lancerMultiples(value) {
        return Math.floor(Math.random() * value) + 1;
    }

  
}
