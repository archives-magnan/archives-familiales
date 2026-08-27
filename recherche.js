/* Recherche et filtres de la page d'accueil.
 *
 * Ce fichier ne fait qu'ajouter du confort. Sans lui, la page reste complète :
 * les vingt enregistrements sont tous listés, et les boutons radio en CSS pur
 * offrent encore un tri à un critère. Le script se contente de masquer ces
 * boutons et d'en proposer de meilleurs — plusieurs critères à la fois, et une
 * recherche en texte libre.
 *
 * Rien ici n'est écrit en dur : la liste des étiquettes disponibles est
 * reconstruite à partir des pastilles présentes dans la page. Étiqueter un
 * enregistrement de plus fait apparaître son filtre tout seul.
 */
(function () {
  var liste = document.querySelector('.pistes');
  var panneau = document.getElementById('recherche');
  var filtresCss = document.getElementById('filtres');
  if (!liste || !panneau) return;

  var cartes = Array.prototype.slice.call(liste.querySelectorAll('li'));
  if (!cartes.length) return;

  var champ = document.getElementById('q');
  var zoneEtiquettes = document.getElementById('etiquettes');
  var compte = document.getElementById('compte');

  /* Comparer sans se soucier des accents ni de la casse : on cherche
     « fiancailles » et on trouve « fiançailles ». */
  function aplatir(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /* Ce que chaque carte offre à la recherche : son titre, plus le texte
     éventuellement déposé dans data-recherche — prévu pour les transcriptions,
     le jour où elles existeront. */
  cartes.forEach(function (carte) {
    var titre = carte.querySelector('.titre');
    carte._texte = aplatir((titre ? titre.textContent : '') + ' ' +
                           (carte.getAttribute('data-recherche') || ''));
    carte._tags = (carte.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean);
  });

  /* La liste des filtres se déduit des pastilles réellement posées. */
  var connues = [];
  var vus = {};
  cartes.forEach(function (carte) {
    carte.querySelectorAll('.tag[data-tag]').forEach(function (pastille) {
      var code = pastille.getAttribute('data-tag');
      if (!vus[code]) {
        vus[code] = true;
        connues.push({ code: code, libelle: pastille.textContent.trim() });
      }
    });
  });
  /* Les enregistrements pas encore identifiés n'ont pas de pastille — ce sont
     eux qu'on veut pouvoir isoler, c'est la liste de ce qui reste à écouter. */
  if (cartes.some(function (c) { return c._tags.indexOf('a-identifier') !== -1; })) {
    connues.push({ code: 'a-identifier', libelle: 'À identifier' });
  }

  var choisies = [];

  connues.forEach(function (t) {
    var b = document.createElement('button');
    b.type = 'button';
    /* Les pastilles portent des libellés en minuscule (« récit ») ; en bouton
       de filtre, une majuscule se lit mieux. */
    b.textContent = t.libelle.charAt(0).toUpperCase() + t.libelle.slice(1);
    b.setAttribute('data-tag', t.code);
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () {
      var i = choisies.indexOf(t.code);
      if (i === -1) { choisies.push(t.code); } else { choisies.splice(i, 1); }
      b.setAttribute('aria-pressed', i === -1 ? 'true' : 'false');
      appliquer();
    });
    zoneEtiquettes.appendChild(b);
  });

  function appliquer() {
    var q = aplatir(champ.value.trim());
    var visibles = 0;

    cartes.forEach(function (carte) {
      /* Plusieurs étiquettes cochées se cumulent : on veut « chanson ET
         guerre », pas l'une ou l'autre. C'est précisément ce que les boutons
         radio du CSS ne savent pas faire. */
      var passeTags = choisies.every(function (c) {
        return carte._tags.indexOf(c) !== -1;
      });
      var passeTexte = !q || carte._texte.indexOf(q) !== -1;
      var montrer = passeTags && passeTexte;
      carte.hidden = !montrer;
      if (montrer) visibles++;
    });

    if (visibles === cartes.length) {
      compte.textContent = cartes.length + ' enregistrements';
    } else if (visibles === 0) {
      compte.textContent = 'Aucun enregistrement ne correspond.';
    } else {
      compte.textContent = visibles + ' enregistrement' + (visibles > 1 ? 's' : '') +
                           ' sur ' + cartes.length;
    }
  }

  champ.addEventListener('input', appliquer);

  /* Échap vide la recherche : le réflexe attendu dans un champ de ce type. */
  champ.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && champ.value) { champ.value = ''; appliquer(); }
  });

  /* On ne remplace les boutons CSS qu'une fois les nôtres prêts : si le script
     s'arrêtait avant, la page resterait filtrable. */
  if (filtresCss) filtresCss.hidden = true;
  panneau.hidden = false;
  appliquer();
})();
