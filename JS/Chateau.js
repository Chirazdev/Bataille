class Chateau {
    // Le constructeur 
    constructor(couleur) {
        this.listeGuerriers = []; // Liste des guerriers actuellement dans le château
        this.listeDattente = []; // Liste d'attente des guerriers à libérer
        this.listeTemp = []; // Liste temporaire pour suivre les guerriers récemment libérés
        this.ressources = 3; // Ressources disponibles initialement
        this.couleur = couleur; // Couleur du château
    }

    // Méthode pour libérer des guerriers de la liste d'attente s'il y a suffisamment de ressources
    sortirGuerrier() {
        this.listeTemp = []; // Réinitialiser la liste temporaire
        let ressources = this.getRessources(); // Obtenir les ressources actuelles
        // Boucler jusqu'à ce que les ressources soient épuisées ou qu'il n'y ait plus de guerriers dans la liste d'attente
        while (ressources !== 0 && this.listeDattente.length !== 0) {
            let guerrier = this.listeDattente[0]; // Obtenir le premier guerrier dans la liste d'attente
            if (guerrier.getCout() <= ressources) { // Vérifier s'il y a suffisamment de ressources pour libérer le guerrier
                this.listeGuerriers.push(guerrier); // Ajouter le guerrier à la liste des guerriers du château
                this.listeTemp.push(guerrier); // Ajouter le guerrier à la liste temporaire
                this.listeDattente.shift(); // Supprimer le guerrier de la liste d'attente
                this.ressources -= guerrier.getCout(); // Déduire le coût du guerrier des ressources
                ressources = this.getRessources(); // Mettre à jour les ressources actuelles
            } else {
                ressources = 0; // Si les ressources ne sont pas suffisantes, sortir de la boucle
            }
        }
    }

    // Méthode pour créer un guerrier nain et l'ajouter à la liste d'attente
    creerUnNain() {
        let nain = new Nain();
        this.listeDattente.push(nain);
    }

    // Méthode pour créer un chef nain et l'ajouter à la liste d'attente
    creerChefNain() {
        let nain = new ChefNain();
        this.listeDattente.push(nain);
    }

    // Méthode pour créer un guerrier elfe et l'ajouter à la liste d'attente
    creerUnElfe() {
        let elfe = new Elfe();
        this.listeDattente.push(elfe);
    }

    // Méthode pour créer un chef elfe et l'ajouter à la liste d'attente
    creerChefElfe() {
        let elfe = new ChefElfe();
        this.listeDattente.push(elfe);
    }

    // Méthode pour effacer tous les guerriers à la fois du château et de la liste d'attente
    nettoyerLaListe() {
        this.listeGuerriers = [];
        this.listeDattente = [];
    }
    // Getters et setters pour accéder et modifier les propriétés de la classe

    getListeTemp() {
        return this.listeTemp;
    }

    getCouleur() {
        return this.couleur;
    }

    setRessources(ressources) {
        this.ressources = ressources;
    }

    getRessources() {
        return this.ressources;
    }

    getListeDattente() {
        return this.listeDattente;
    }

    getListeGuerriers() {
        return this.listeGuerriers;
    }

    setListeGuerriers(listeGuerriers) {
        this.listeGuerriers = listeGuerriers;
    }

    setCouleur(couleur) {
        this.couleur = couleur;
    }

    setListeDattente(listeDattente) {
        this.listeDattente = listeDattente;
    }

    setListeTemp(listeTemp) {
        this.listeTemp = listeTemp;
    }
}
