class Partie {
    constructor() {
        // Initialisation des châteaux rouge et bleu ainsi que du plateau de jeu
        this.chateauRouge = new Chateau("Rouge");
        this.chateauBleu = new Chateau("Bleu");
        this.plateau = new Plateau();
        this.tour = 1; // Initialisation du compteur de tours
    }

    lancerPartie() {
        // Vérifie si les deux châteaux ont des unités dans leur liste d'attente
        if (this.chateauRouge.getListeDattente().length === 0 && this.chateauBleu.getListeDattente().length === 0) {
            alert("Vous n'avez pas entrainé des unités dans les deux chateaux !");
        } else {
            // Sort les guerriers des deux châteaux, les place sur le plateau et met à jour l'affichage
            this.chateauBleu.sortirGuerrier();
            this.chateauRouge.sortirGuerrier();
            this.placerGuerriers();
            this.update();
            this.updateWaitingList();
            nouvelletour.style.display ='block'; // Affiche le bouton pour lancer un nouveau tour
            lancerparti.style.display ='none'; // Cache le bouton pour lancer la partie
            tourNumberElement.style.display = "block"; // Affiche l'élément qui montre le numéro du tour
        }
    }

    nouveauTour() {
        this.tour++; // Incrémente le compteur de tours
      nouvelletour.style.display ='block'; // Affiche le bouton pour lancer un nouveau tour
        document.getElementById('guerrierModal').style.display = "none";
        document.getElementById('mim3').style.display = "none";
        document.getElementById('fight').style.display = "none";
        document.getElementById('mim4').style.display = "none";
        tourNumberElement.textContent = 'Tour: ' + this.tour; // Met à jour le texte affichant le numéro du tour
        let couleur = this.plateau.gagner(); // Vérifie s'il y a un gagnant
        if (couleur === "Noir") {
            // Mise à jour des ressources des châteaux
            this.chateauBleu.setRessources(this.chateauBleu.getRessources() + 1);
            this.chateauRouge.setRessources(this.chateauRouge.getRessources() + 1);
            // Avancement des unités sur le plateau
            this.plateau.avancerLesUnites();
            // Sortie des guerriers des châteaux
            this.chateauBleu.sortirGuerrier();
            this.chateauRouge.sortirGuerrier();
            // Placement des guerriers sur le plateau
            this.placerGuerriers();
            // Vérification des rencontres entre guerriers
            this.plateau.verifRencontreGuerrier(this.getChateauBleu(), this.getChateauRouge());
            // Mise à jour de l'affichage du plateau et de la liste d'attente
            this.update();
            this.updateWaitingList();
            // Vérifie à nouveau s'il y a un gagnant après les mises à jour
            couleur = this.plateau.gagner();

            // Si un château a gagné, affiche un message et lance une vidéo
            if (couleur !== "Noir") {
                var modal = document.getElementById('mim2');
                var video = document.getElementById('videoPlayer');
                var messageElement = document.getElementById('winnerMessage');
                messageElement.textContent = "Le Chateau : " + couleur + " a gagne !";
                modal.style.display = 'block';
                piste.style.display='none'
                video.play();
            }
        }
    }

    placerGuerriers() {
        // Place les guerriers bleus sur le plateau
        for (let guerrier of this.chateauBleu.getListeTemp()) {
            this.plateau.placerGuerrier(guerrier, this.chateauBleu.getCouleur());
        }
        // Place les guerriers rouges sur le plateau
        for (let guerrier of this.chateauRouge.getListeTemp()) {
            this.plateau.placerGuerrier(guerrier, this.chateauRouge.getCouleur());
        }
    }

    updateWaitingList() {
        // Mise à jour de l'affichage des listes d'attente des châteaux
        const waiting = document.getElementById("waitingList");
        const bleuWaitingList = document.getElementById("bleuWaitingList");
        const rougeWaitingList = document.getElementById("rougeWaitingList");
        bleuWaitingList.innerHTML = ''; // Réinitialise la liste d'attente bleue
        rougeWaitingList.innerHTML = ''; // Réinitialise la liste d'attente rouge
        waiting.style.display = "block"; // Affiche la liste d'attente

        // Ajoute les guerriers bleus à la liste d'attente bleue
        this.chateauBleu.getListeDattente().forEach(guerrier => {
            const img = document.createElement('img');
            img.src = guerrier.getImageSrc();
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.objectFit = "contain";
            bleuWaitingList.appendChild(img);
        });

        // Ajoute les guerriers rouges à la liste d'attente rouge
        this.chateauRouge.getListeDattente().forEach(guerrier => {
            const img = document.createElement('img');
            img.src = guerrier.getImageSrc();
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.objectFit = "contain";
            rougeWaitingList.appendChild(img);
        });
    }

    update() {
        // Mise à jour de l'affichage des carreaux du plateau
        const plateaus = this.plateau.getCarreaux();
        plateaus.forEach((carreau, index) => {
            const bleuList = document.getElementById(`l${index}`);
            const rougeList = document.getElementById(`l${index}`);
            bleuList.innerHTML = ''; // Réinitialise la liste bleue pour ce carreau
            rougeList.innerHTML = ''; // Réinitialise la liste rouge pour ce carreau

            // Fonction pour créer un élément HTML représentant un guerrier
            const createWarriorElement = (guerrier, colorClass) => {
                const warriorContainer = document.createElement('div');
                warriorContainer.className = 'warrior-container';

                const img = document.createElement('img');
                img.src = guerrier.getImageSrc();
                img.className = `warrior-img ${colorClass}`;

                // Ajoute un événement de clic pour afficher les détails du guerrier
                img.onclick = function() {
                    document.getElementById('fight').style.display = "none";
                    document.getElementById('mim4').style.display = "none";
                    document.getElementById('guerrierDetails').innerHTML = guerrier.afficheInfosGuerriers();
                    document.getElementById('guerrierModal').style.display = "block";
                    document.getElementById('mim3').style.display = "block";
                };

                // Crée une barre de vie pour le guerrier
                const hpBar = document.createElement('div');
                hpBar.className = 'hp-bar';

                const hp = document.createElement('div');
                hp.className = 'hp';
                hp.style.width = `${guerrier.getPv()}%`;

                hpBar.appendChild(hp);
                warriorContainer.appendChild(img);
                warriorContainer.appendChild(hpBar);

                return warriorContainer;
            };

            // Ajoute les guerriers bleus au carreau
            carreau.getListeBleu().forEach(guerrier => {
                bleuList.appendChild(createWarriorElement(guerrier, 'bleu'));
            });

            // Ajoute les guerriers rouges au carreau
            carreau.getListeRouge().forEach(guerrier => {
                rougeList.appendChild(createWarriorElement(guerrier, 'rouge'));
            });
        });
    }

    // Méthodes pour obtenir et définir les châteaux rouge et bleu
    getChateauRouge() {
        return this.chateauRouge;
    }

    getChateauBleu() {
        return this.chateauBleu;
    }

    setChateauRouge(chateauRouge) {
        this.chateauRouge = chateauRouge;
    }

    setChateauBleu(chateauBleu) {
        this.chateauBleu = chateauBleu;
    }
}
