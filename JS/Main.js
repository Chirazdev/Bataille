var startButton = document.getElementById("startButton");
var auto = document.getElementById("autoplayButton");

var modal = document.getElementById("myModal");
var moda = document.getElementById("mim");
var slides = document.getElementsByClassName("slide");
var piste = document.getElementById("piste");
var playButton = document.getElementById("playButton");
var lancerparti = document.getElementById("novelle");
var nouvelletour = document.getElementById("novelletour");
var tourNumberElement = document.getElementById('tourNumber');
var closeVideo = document.getElementById("closeButtonWin");
var restart = document.getElementById("restart");

var piste = document.getElementById("piste");

var formContainer = document.getElementById("formContainer");
var close = document.getElementsByClassName("close")[0];
var castleSelectionText = document.createElement('h1');

var musicButton = document.getElementById('musicButton');
var musicIcon = document.getElementById('musicIcon');
var backgroundMusic = document.getElementById('backgroundMusic');

var slideIndex = 1; // Initialisation de l'index des diapositives

var worrior; // Variable pour stocker le guerrier sélectionné
var chateau; // Variable pour stocker le château sélectionné
var partie = new Partie(); // Création d'une nouvelle partie

// ================================================================================================

let autoplayEnabled = false;
let autoplayInterval;// Fonction appelée lorsqu'un château est sélectionné
function autplay() {
    clearInterval(autoplayInterval); // Clear any existing interval
    autoplayInterval = setInterval(() => {
        partie.nouveauTour();
    }, 2000);
}

function noautoplay() {
    clearInterval(autoplayInterval);
}
function chose(event) {
    var screenWidth = window.innerWidth;
    var clickX = event.pageX;
    var clickY = event.pageY - window.scrollY;
    var thirdWidth = screenWidth / 4;
    var buttonHeight = document.querySelector('#musicButton').offsetHeight;

    if (clickY >= buttonHeight){
        if (clickX <= thirdWidth) {
            castleSelectionText.style.display = "block";
            castleSelectionText.textContent = "Train your warriors";
            modal.style.display = "block";
            moda.style.display = "block";
            chateau = partie.getChateauBleu();    
            showSlides(1, 'Bleu');
        } else if (clickX >= 3 * thirdWidth) {
            castleSelectionText.style.display = "block";
            castleSelectionText.textContent = "Train your warriors";
            modal.style.display = "block";
            moda.style.display = "block";
            chateau = partie.getChateauRouge();    
            showSlides(1, "Rouge");
        }
    }
}

// Fonction pour afficher les diapositives
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var slideTexts = document.getElementsByClassName("slide-text");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slideTexts[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    slideTexts[slideIndex - 1].style.display = "block"; 
    worrior = slideTexts[slideIndex - 1];
}

// Fonction pour passer à la diapositive suivante ou précédente
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Fonction pour afficher une diapositive spécifique
function currentSlide(n) {
    showSlides(slideIndex = n);
}

//  =============================================================================

// Gestion de la fermeture de la modal de détails du guerrier
document.getElementById('closeButton2').onclick = function() {
    document.getElementById('fight').style.display = "none";
    document.getElementById('mim4').style.display = "none";
    document.getElementById('guerrierModal').style.display = "none";
    document.getElementById('mim3').style.display = "none";
    document.getElementById('fight').style.display = "none";
    document.getElementById('mim4').style.display = "none";
}
auto.addEventListener("click", () => {
    if (autoplayEnabled) {
        noautoplay();
        autoplayEnabled = false;
    } else {
        autplay();
        autoplayEnabled = true;
    }
});
// Gestion de la fermeture de la modal vidéo
closeVideo.addEventListener("click", () => {
    var modal = document.getElementById('mim2');
    var video = document.getElementById('videoPlayer');
    modal.style.display = 'none';
    video.pause();
    video.currentTime = 0;
    location.reload();

})

// Gestion de la fermeture de la modal de sélection de château
close.onclick = function() {
    moda.style.display = "none";
    modal.style.display = "none";
    castleSelectionText.textContent = "Select the Castle";
    slideIndex = 1;
    document.getElementById('guerrierModal').style.display = "none";
    document.getElementById('mim3').style.display = "none";
}

// Gestion du bouton de musique
musicButton.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicIcon.src = '../images/volume.png'; // Chemin de l'icône "musique activée"
    } else {
        backgroundMusic.pause();
        musicIcon.src = '../images/mute.png'; // Chemin de l'icône "musique désactivée"
    }
});

// Gestion du bouton de démarrage
startButton.addEventListener("click", () => {
    document.querySelector('.container').innerHTML = '';
    castleSelectionText.textContent = "Select the Castle";
    piste.style.display = "Block";
    document.querySelector('.container').appendChild(castleSelectionText);
    document.addEventListener("click", (event) => { chose(event) });
})

// Gestion du bouton pour lancer la partie
lancerparti.addEventListener("click", () => {
    partie.lancerPartie();
    auto.style.display = "block"

})

// Gestion du bouton pour un nouveau tour
nouvelletour.addEventListener("click", () => {
    partie.nouveauTour();
})

// Gestion du bouton pour jouer (entraîner un guerrier)
playButton.addEventListener("click", () => {
    switch (worrior.textContent) {
        case "Nain":
            chateau.creerUnNain();
            break;
        case "Elf":
            chateau.creerUnElfe();
            break;
        case "Chef Nain":
            chateau.creerChefNain();
            break;
        case "Chef Elf":
            chateau.creerChefElfe();
            break;
        default:
            console.log('Option invalide, veuillez réessayer.');
            break;
    }
    partie.updateWaitingList();
    moda.style.display = "none";
    modal.style.display = "none";
})

// Gestion du bouton pour redémarrer la page
restart.addEventListener("click", () => {
    location.reload();
})

// Gestion des boutons pour passer aux diapositives suivantes et précédentes
document.getElementById("nextButton").addEventListener("click", function() {
    plusSlides(1);
});

document.getElementById("prevButton").addEventListener("click", function() {
    plusSlides(-1);
});
