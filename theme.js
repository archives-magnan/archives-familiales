/* Bascule clair / sombre.
 *
 * C'est le seul programme de tout le site. Tout le reste est du texte et de
 * la mise en forme. S'il cesse un jour de fonctionner, ou si le navigateur
 * refuse de l'exécuter, les pages restent parfaitement lisibles : elles
 * suivent alors le réglage clair/sombre du système, et le bouton — qui n'est
 * affiché que par ce fichier — ne s'affiche simplement pas.
 *
 * Ce fichier est chargé dans le <head> sans « defer », volontairement : il
 * doit poser le thème AVANT que la page ne s'affiche, sans quoi on verrait un
 * éclair blanc au chargement d'une page sombre.
 */
(function () {
  var root = document.documentElement;

  // 1. Rétablir le choix précédent, s'il y en a un. Un navigateur en
  //    navigation privée peut refuser l'accès au stockage : on n'insiste pas.
  try {
    var enregistre = localStorage.getItem('theme');
    if (enregistre === 'dark' || enregistre === 'light') {
      root.setAttribute('data-theme', enregistre);
    }
  } catch (e) {}

  // 2. Brancher le bouton une fois la page construite.
  document.addEventListener('DOMContentLoaded', function () {
    brancherImpression();
    brancherVues();

    var bouton = document.getElementById('bascule-theme');
    if (!bouton) return;

    bouton.hidden = false;

    bouton.addEventListener('click', function () {
      var actuel = root.getAttribute('data-theme');

      // Aucun choix explicite encore : on part de ce qu'affiche le système.
      if (!actuel) {
        actuel = window.matchMedia &&
                 window.matchMedia('(prefers-color-scheme: dark)').matches
                   ? 'dark' : 'light';
      }

      var suivant = actuel === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', suivant);

      try { localStorage.setItem('theme', suivant); } catch (e) {}
    });
  });

  /* Les deux vues de l'arbre.
   *
   * Les deux lisent le même balisage : il n'existe qu'un seul exemplaire des
   * noms dans la page, et ajouter quelqu'un le fait apparaître dans les deux
   * vues. Seule la mise en forme change, plus le fait que l'arborescence
   * déplie tout — une arborescence à moitié repliée ne montre rien.
   *
   * Sans ce fichier, les boutons ne s'affichent pas et la page reste en vue
   * liste, qui est complète : on ne perd aucune information, seulement un
   * confort. */
  function brancherVues() {
    var vues = document.getElementById('vues');
    var arbre = document.getElementById('arbre-famille');
    if (!vues || !arbre) return;

    vues.hidden = false;
    var boutons = vues.querySelectorAll('button');
    var replieesEnListe = null;   // l'état de la vue liste, mis de côté

    for (var i = 0; i < boutons.length; i++) {
      boutons[i].addEventListener('click', function () {
        var vue = this.getAttribute('data-vue');

        for (var j = 0; j < boutons.length; j++) {
          boutons[j].setAttribute('aria-pressed',
            boutons[j] === this ? 'true' : 'false');
        }

        var branches = arbre.querySelectorAll('details');

        if (vue === 'arborescence') {
          // Mémoriser ce que le lecteur avait replié, puis tout ouvrir.
          if (replieesEnListe === null) {
            replieesEnListe = [];
            for (var k = 0; k < branches.length; k++) {
              if (!branches[k].open) replieesEnListe.push(branches[k]);
            }
          }
          for (var m = 0; m < branches.length; m++) branches[m].open = true;
          arbre.classList.add('arborescence');
        } else {
          arbre.classList.remove('arborescence');
          if (replieesEnListe) {
            for (var n = 0; n < replieesEnListe.length; n++) {
              replieesEnListe[n].open = false;
            }
            replieesEnListe = null;
          }
        }
      });
    }
  }

  /* Imprimer l'arbre.
   *
   * Une branche repliée ne s'imprime pas : le papier n'a pas de bouton. On
   * déplie donc tout avant l'impression, puis on remet chaque branche comme
   * le lecteur l'avait laissée.
   *
   * La feuille de style tente la même chose de son côté, pour le cas où ce
   * fichier ne s'exécuterait pas — mais les navigateurs ne s'accordent pas
   * sur la façon de masquer le contenu d'un <details>, alors qu'ouvrir la
   * balise, elle, marche partout. */
  function brancherImpression() {
    var repliees = [];

    window.addEventListener('beforeprint', function () {
      repliees = [];
      var tous = document.querySelectorAll('details');
      for (var i = 0; i < tous.length; i++) {
        if (!tous[i].open) { repliees.push(tous[i]); tous[i].open = true; }
      }
    });

    window.addEventListener('afterprint', function () {
      for (var i = 0; i < repliees.length; i++) { repliees[i].open = false; }
      repliees = [];
    });
  }
})();
