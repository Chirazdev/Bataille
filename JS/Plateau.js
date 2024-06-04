class Plateau {
    constructor() {
        // Liste temporaire utilisée pour le déplacement des unités
        this.listeTemp = [];
        // Tableau pour stocker les carreaux du plateau
        this.carreaux = [];
        // Compteur de carreaux initialisé à 0
        this.nbCarreaux = 0;
        // Ajoute plusieurs carreaux au plateau en fonction du nombre défini
        this.ajouterCarreauMultiples(5);
    }

    placerGuerrier(guerrier, couleur) {
        // Place un guerrier sur le premier carreau si la couleur est bleue
        if (couleur === 'Bleu') {
            this.carreaux[0].ajouterGuerrier(guerrier, couleur);
        } else { 
            // Place un guerrier sur le dernier carreau si la couleur est rouge
            this.carreaux[4].ajouterGuerrier(guerrier, couleur);
        }
    }

    ajouterUnCarreau(nbCarreau) {
        // Crée un nouveau carreau avec un numéro spécifique
        let carreau = new Carreau(nbCarreau);
        // Ajoute le carreau à la liste des carreaux du plateau
        this.carreaux[carreau.getNumeroDeLaCase()] = carreau;
        // Incrémente le compteur de carreaux
        this.nbCarreaux++;
    }

    ajouterCarreauMultiples(nbCases) {
        // Ajoute plusieurs carreaux au plateau en appelant la méthode ajouterUnCarreau
        for (let i = 0; i < nbCases; i++) {
            this.ajouterUnCarreau(i);
        }
    }

    avancerLesUnites() {
        // Réinitialise la liste temporaire
        this.listeTemp = [];
        // Déplace les unités rouges vers la gauche si elles sont seules sur un carreau
        for (let i = 0; i < 5; i++) {
            if (this.carreaux[i].getListeRouge().length > 0 && this.carreaux[i].getListeBleu().length === 0) {
                this.listeTemp = this.listeTemp.concat(this.carreaux[i].getListeRouge());
                this.carreaux[i - 1].getListeRouge().push(...this.listeTemp);
                this.carreaux[i].getListeRouge().length = 0;
                this.listeTemp = [];
            }
        }
        // Déplace les unités bleues vers la droite si elles sont seules sur un carreau
        for (let i = 4; i >= 0; i--) {
            if (this.carreaux[i].getListeRouge().length === 0 && this.carreaux[i].getListeBleu().length > 0) {
                this.listeTemp = this.listeTemp.concat(this.carreaux[i].getListeBleu());
                this.carreaux[i + 1].getListeBleu().push(...this.listeTemp);
                this.carreaux[i].getListeBleu().length = 0;
                this.listeTemp = [];
            }
        }
    }

    verifRencontreGuerrier(chBleu, chRouge) {
        // Vérifie s'il y a des rencontres entre les guerriers sur chaque carreau et déclenche des batailles
        this.carreaux.forEach(carreau => {
            carreau.bataille(chBleu, chRouge);
        });
    }

    gagner() {
        // Détermine le gagnant en vérifiant la présence des unités sur les carreaux de départ
        let couleur = 'Noir';
        let carreau0 = this.carreaux[0];
        let carreau4 = this.carreaux[4];
        if (carreau0.getListeRouge().length > 0 && carreau0.getListeBleu().length == 0) {
            couleur = "Rouge";
        }
        if (carreau4.getListeBleu().length > 0 && carreau4.getListeRouge().length == 0) {
            couleur = 'Bleu';
        }
        return couleur; // Renvoie la couleur du château gagnant ou "Noir" si aucun château n'a gagné
    }

    // Retourne la liste des carreaux du plateau
    getCarreaux() {
        return this.carreaux;
    }

    // Retourne le nombre de carreaux sur le plateau
    getNbCarreaux() {
        return this.nbCarreaux;
    }

    // Définit la liste des carreaux du plateau
    setCarreaux(carreaux) {
        this.carreaux = carreaux;
    }

    // Définit le nombre de carreaux sur le plateau
    setNbCarreaux(nbCarreaux) {
        this.nbCarreaux = nbCarreaux;
    }
}
