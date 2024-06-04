class Carreau {
    // Constructeur de la classe Carreau
    constructor(nbCarreau) {
        this.listeBleu = []; // Liste des guerriers bleus sur ce carreau
        this.listeRouge = []; // Liste des guerriers rouges sur ce carreau
        this.numeroDeLaCase = nbCarreau; // Numéro de ce carreau
    }

    // Méthode pour ajouter un guerrier à la liste des bleus ou des rouges
    ajouterGuerrier(guerrier, couleur) {
        if (couleur === "Rouge") {
            this.listeRouge.push(guerrier); // Ajouter aux rouges
        } else {
            this.listeBleu.push(guerrier); // Ajouter aux bleus
        }
    }

    // Méthode pour déclencher une bataille entre les armées bleue et rouge
    bataille(chBleu, chRouge) {
        // Vérifie que les deux listes ne sont pas vides

        if (this.listeBleu.length !== 0 && this.listeRouge.length !== 0) {
            let compte = 0;
            let nbGuerriers = this.listeBleu.length + this.listeRouge.length;

            // Boucle principale de la bataille
            while (compte !== nbGuerriers) {
                // Tour des bleus
                if (this.listeRouge.length !== 0 && this.listeBleu.length !== 0) {
                    for (let i = 0; i < this.listeBleu.length; i++) {
                        if (this.listeRouge.length !== 0) {
                            let guerrier = this.listeRouge[0];
                            document.getElementById('fight').style.display = "none";
                            document.getElementById('mim4').style.display = "none";
                            this.afficherBataille(this.listeBleu[i], guerrier);
                            if (guerrier.estMort()) {
                                this.listeRouge.shift(); // Enlever le guerrier rouge mort
                                chRouge.listeGuerriers = chRouge.listeGuerriers.filter(g => g !== guerrier);
                            }
                            compte++;
                        }
                    }
                }
                // Tour des rouges
                if (this.listeRouge.length !== 0 && this.listeBleu.length !== 0) {
                    console.log("---- Tour rouges ----");
                    for (let i = 0; i < this.listeRouge.length; i++) {
                        if (this.listeBleu.length !== 0) {
                            let guerrier = this.listeBleu[0];
                            document.getElementById('fight').style.display = "none";
                            document.getElementById('mim4').style.display = "none";
                            this.afficherBataille(this.listeRouge[i], guerrier);
                            if (guerrier.estMort()) {
                                this.listeBleu.shift(); // Enlever le guerrier bleu mort
                                chBleu.listeGuerriers = chBleu.listeGuerriers.filter(g => g !== guerrier);
                            }
                            compte++;
                        }
                    }
                }
                // Fin de la bataille si le nombre de guerriers est atteint
                compte = nbGuerriers;
            }
        }
    }

    // Méthode pour afficher les détails de la bataille entre deux guerriers
    afficherBataille(guerrier1, guerrier2) {
        guerrier1.frapper(guerrier2); // Le guerrier1 attaque le guerrier2
        document.getElementById('fightDetails').innerHTML = guerrier1.getType() + " attaque " + guerrier2.getType();
        document.getElementById('fight').style.display = "block";
        document.getElementById('mim4').style.display = "block";
    }

    // Getters et setters pour accéder et modifier les propriétés de la classe

    getNumeroDeLaCase() {
        return this.numeroDeLaCase;
    }

    getListeRouge() {
        return this.listeRouge;
    }

    getListeBleu() {
        return this.listeBleu;
    }

    setListeRouge(listeRouge) {
        this.listeRouge = listeRouge;
    }

    setListeBleu(listeBleu) {
        this.listeBleu = listeBleu;
    }

    setNumeroDeLaCase(numeroDeLaCase) {
        this.numeroDeLaCase = numeroDeLaCase;
    }
}