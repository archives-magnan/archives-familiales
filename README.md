# Archives sonores de la famille

Ce dépôt contient un petit site qui donne à écouter des enregistrements de
voix familiales, ainsi que les fichiers audio eux-mêmes. Les QR codes imprimés
dans le livre de famille pointent vers ce site.

Ce fichier s'adresse à celui ou celle qui reprendra le projet — peut-être dans
très longtemps, peut-être sans rien connaître à tout ça. Tout est expliqué en
partant de zéro.

---

## Comment c'est organisé

Deux choses, dans deux endroits différents :

| Quoi | Où | À quoi ça sert |
| :--- | :--- | :--- |
| **Les fichiers maîtres** | Le Google Drive personnel d'**Anne Rizoulières** | Les originaux de la numérisation, en pleine qualité. On n'y touche jamais. |
| **Le site et les fichiers d'écoute** | Ce dépôt, publié par GitHub Pages | Les pages, et les versions `.mp3` compressées que le site fait jouer. |

Tout ce qui est en ligne tient donc dans **un seul endroit**. Récupérer
l'archive complète, c'est une seule commande :

```bash
git clone https://github.com/archives-magnan/archives-familiales.git
```

C'est volontaire : moins il y a de comptes et de services à maintenir, plus le
dispositif a de chances de survivre à ceux qui l'ont créé.

### Pourquoi un site plutôt qu'un QR code vers le fichier directement ?

Parce qu'un QR code imprimé sur du papier est définitif. Le site est une
couche intermédiaire : si un jour GitHub ferme ou que tout déménage ailleurs,
il suffira de faire pointer la même adresse vers le nouvel endroit. Les QR
codes du livre continueront de fonctionner.

Ne supprimez pas cette couche pour « simplifier ».

---

## Les adresses

Chaque enregistrement a un numéro et une adresse qui ne change jamais :

```
https://archives-magnan.github.io/archives-familiales/01/
https://archives-magnan.github.io/archives-familiales/02/
```

Dans le dépôt, cela correspond à :

```
index.html        ← la page d'accueil, qui liste tout
404.html          ← la page affichée quand une adresse n'existe pas
qr/               ← les QR codes du livre, un par emplacement
style.css         ← l'apparence, commune à toutes les pages
theme.js          ← le bouton clair/sombre et les deux vues de l'arbre
recherche.js      ← la recherche et les filtres de la page d'accueil
audio/            ← les fichiers .mp3
arbre/index.html  ← l'arbre généalogique
01/index.html     ← la page du premier enregistrement
02/index.html     ← le deuxième, et ainsi de suite
```

Les liens entre les pages sont **relatifs** : aucun nom de compte n'apparaît
dans le code. Si le site déménage un jour, rien n'est à réécrire.

---

## Les gestes courants

### Ajouter un enregistrement

1. Préparer la version d'écoute au format `.mp3` à partir du fichier maître,
   nommée `AUDIO-00N_Prenom-Nom_ecoute.mp3`.
2. La déposer dans le dossier `audio/` (sur github.com : ouvrir le dossier,
   *Add file* → *Upload files*).
3. Copier le dossier `01/` en `02/`.
4. Dans `02/index.html`, remplacer le nom du fichier audio et les
   informations de la fiche.
5. Ajouter un bloc dans la liste de `index.html` — il y a un commentaire à
   l'endroit exact.
6. Enregistrer. Le site se met à jour tout seul en une minute environ.

### Compléter l'arbre généalogique

Tout l'arbre tient dans `arbre/index.html`, en haut duquel un commentaire
montre le « bloc personne » à recopier. Une personne se déroule en cliquant
sur son nom : c'est une fonction native du navigateur, il n'y a aucun
programme derrière, donc rien qui puisse cesser de marcher un jour.

La page propose deux façons de regarder le même arbre — **Liste**, repliable,
et **Arborescence**, tout déplié avec des traits reliant chacun à ses parents.
**Les deux lisent le même texte** : les noms n'existent qu'à un seul endroit
dans le fichier, et ajouter quelqu'un le fait apparaître dans les deux vues.
Ne jamais recopier l'arbre pour créer une troisième vue — deux copies finissent
toujours par diverger.

Ce qui est marqué *à retrouver* est ce qu'on ignorait au moment d'écrire la
page. **Ne jamais deviner pour combler un trou** : un arbre faux se recopie de
génération en génération sans que personne puisse plus le vérifier, alors
qu'un trou, lui, appelle une question à quelqu'un qui sait encore.

**Deux règles tenues sur cet arbre**, décidées en famille et à respecter si
vous le complétez :

- **Aucune date de naissance pour une personne vivante.** Un nom seul n'est
  pas grand-chose ; un nom accompagné d'une date de naissance et d'une
  filiation, si. Les dates des personnes décédées, elles, ont leur place.
- **On ne remonte pas plus haut qu'Albert et Mady et leurs parents**, et on
  n'affiche pas les frères et sœurs de ces derniers. Ce n'est pas un arbre
  généalogique complet, c'est le cadre de famille des personnes qu'on entend
  dans ces archives.

### Le menu du haut

Le menu est recopié à l'identique dans chaque page, entre les balises
`<header class="barre">`. Il n'y a pas de logiciel de construction derrière ce
site, et c'est voulu : n'importe qui peut le modifier avec un éditeur de texte
sans rien installer. En contrepartie, **ajouter une entrée au menu demande de
la recopier dans chaque page**. Attention au chemin : depuis un sous-dossier
comme `01/` ou `arbre/`, les liens commencent par `../`.

### Le bouton clair / sombre

C'est le seul programme du site (`theme.js`), et il ne fait que ça. Si le
navigateur refuse de l'exécuter, les pages restent parfaitement lisibles :
elles suivent alors le réglage clair/sombre du système, et le bouton ne
s'affiche pas du tout. Aucune page ne dépend de lui pour être lue.

### Transcrire un enregistrement

Chaque page d'écoute réserve une place à la transcription, au-dessus de la
fiche. C'est ce qui rend une bande audible quand la voix ne l'est plus tout à
fait : on peut lire ce qu'on n'entend pas, chercher un mot dans la page, et le
texte survivra au format audio lui-même.

La méthode : une première passe par un outil de transcription automatique,
puis une correction à l'oreille par quelqu'un de la famille — c'est là que se
rattrapent les noms propres et les lieux, qu'aucune machine ne devine. **Ce
qui reste incompris se note `[inaudible]`**, jamais comblé au jugé.

### Les QR codes du livre

Ils sont dans `qr/`, en `.svg` (à privilégier : net à n'importe quelle taille)
et en `.png`. La page `qr/index.html` les montre tous, avec les consignes
d'impression.

**Un code ne connaît pas le titre de l'enregistrement, seulement son numéro.**
C'est la page qui porte le contenu. Deux conséquences : décider quel
enregistrement occupe quel emplacement ne change rien aux codes, et un code déjà
imprimé reste valable si l'hébergement déménage un jour.

Pour en régénérer un — par exemple si l'adresse du site change :

```bash
brew install qrencode
qrencode -t SVG -l H -m 4 -o qr/01.svg \
  "https://ADRESSE-DU-SITE/archives-familiales/01/"
```

`-l H` demande 30 % de redondance : un livre se corne, se tache et vieillit, le
code doit rester lisible avec un tiers de sa surface abîmée. `-m 4` réserve le
cadre blanc autour du code, qui fait partie du code.

**Vérifier chaque code après l'avoir généré**, en le scannant. Un QR faux est
indétectable à l'œil.

### Étiqueter un enregistrement

La page d'accueil se cherche et se filtre. `recherche.js` fournit la barre de
recherche et des étiquettes **cumulables** — on peut demander « chanson » *et*
« guerre » à la fois. La recherche ignore les accents : taper `fiancailles`
trouve « fiançailles ».

**Si ce fichier ne s'exécute pas, la page reste utilisable** : des boutons radio
en CSS pur prennent le relais, avec un seul critère à la fois. Et si même le CSS
lâchait, les vingt enregistrements resteraient tous listés. Rien d'essentiel ne
dépend d'un programme.

**Les boutons de filtre ne sont écrits nulle part** : le script les reconstruit
à partir des pastilles présentes dans la page. Étiqueter un enregistrement de
plus fait apparaître son filtre tout seul, sans toucher au script.

Trois dimensions, et **volontairement pas une de plus** — un vocabulaire qui
enfle cesse d'être un filtre :

| Dimension | Valeurs | Combien |
| :--- | :--- | :--- |
| **Nature** | `recit`, `chanson` | exactement une |
| **Voix** | `voix-albert`, `voix-suzanne`… | qui on entend |
| **Thème** | `guerre`, `magnan-freres`… | de quoi ça parle |

Dans `index.html`, chaque enregistrement porte ses étiquettes sur son `<li>` :

```html
<li data-tags="recit voix-suzanne guerre">
```

Un enregistrement qu'on n'a pas encore identifié porte `data-tags="a-identifier"`
et rien d'autre : il apparaît alors sous le filtre du même nom, qui sert de
liste de choses à faire. **Ne pas étiqueter au jugé** — une étiquette posée à
tort ne se rediscute jamais.

Chaque pastille porte son code : `<span class="tag" data-tag="guerre">guerre</span>`.
C'est ce code que le script lit pour bâtir les filtres.

Chaque `<li>` porte aussi un `data-recherche=""` vide. **C'est l'endroit prévu
pour un extrait de transcription** : la recherche le fouille déjà, il ne reste
qu'à le remplir le jour venu — le script n'aura pas à changer.

### Modifier le texte d'une page

Sur github.com, ouvrir le fichier, cliquer sur l'icône en forme de crayon,
modifier, puis valider en bas de page. Aucun logiciel à installer.

### Remplacer un fichier audio

Déposer le nouveau fichier dans `audio/` sous le même nom. L'adresse de la
page ne bouge pas, donc les QR codes déjà imprimés restent valables.

---

## Ce à quoi il faut faire attention

- **Ce dépôt est public.** N'importe qui ayant l'adresse peut écouter et
  récupérer les fichiers. C'était le but — les membres de la famille ne doivent
  pas avoir à créer de compte. Mais cela vaut d'y réfléchir avant de mettre en
  ligne un enregistrement où des personnes vivantes sont nommées ou
  reconnaissables. Les pages ne proposent volontairement pas de bouton de
  téléchargement, mais que ce soit clair : **ce n'est pas une protection**, le
  fichier reste accessible à qui sait regarder.
- **Le fichier maître ne se remplace jamais.** Une version nettoyée,
  ré-égalisée ou compressée se range **à côté** de l'original, jamais à sa
  place. On peut toujours refaire une version d'écoute à partir du maître ;
  l'inverse est impossible.
- **Seuls les `.mp3` vont en ligne.** Les fichiers maîtres (`.wav`, `.flac`)
  sont trop lourds : GitHub refuse tout fichier de plus de 100 Mo, et
  l'ensemble du site doit rester sous 1 Go — soit une vingtaine d'heures
  d'écoute en `.mp3`, largement de quoi voir venir. Si un jour ça déborde,
  c'est le signe qu'il faut louer un hébergement, pas supprimer des voix.
- **Un fichier déposé reste dans l'historique** même après suppression. Mieux
  vaut préparer le `.mp3` correctement une fois que de le remplacer cinq fois.
- **Une seule copie n'est pas une archive.** À ce jour les fichiers maîtres
  n'existent qu'à un seul endroit : le Drive d'Anne Rizoulières. Un compte
  fermé, et ils sont perdus — les `.mp3` de ce dépôt ne les remplaceraient pas,
  ils sont compressés. C'est le point faible du dispositif. Viser au moins deux
  copies, chez deux personnes différentes de la famille.
- **Ce dépôt appartient à une organisation GitHub, pas à une personne.** C'est
  volontaire : plusieurs membres de la famille peuvent en être responsables, et
  la transmission ne dépend de la survie d'aucun compte individuel. Si vous
  reprenez le projet, ajoutez au moins un autre membre comme responsable de
  l'organisation.

---

## Nommage des fichiers

**Les fichiers maîtres portent le titre de l'enregistrement**, sans numéro :

```
Grand-Père chante.wav          ← le maître, hors ligne, intouchable
```

**Les versions en ligne portent le même titre, simplifié** — une adresse web ne
supporte ni accents, ni espaces, ni parenthèses :

```
audio/grand-pere-chante.mp3    ← la version d'écoute, appelée par la page /06/
```

Pas de numéro dans les noms de fichiers, ni d'un côté ni de l'autre : **c'est le
titre qui fait le lien**, et il est unique. Comme les emplacements ont été
numérotés dans l'ordre alphabétique des titres, le dossier `audio/` trié par nom
se trouve être dans l'ordre du site — utile, mais ce n'est pas ce sur quoi on
s'appuie.

Chaque page indique le fichier qu'elle attend, en bas de sa fiche.

**Une information incertaine se note comme incertaine** — « vers 1965 »,
« probablement à Rennes », « date inconnue ». Une supposition familiale
transformée en certitude devient un faux souvenir pour les générations
suivantes.

---

## Qui contacter

Le projet est tenu par **Samuel Rizoulières**, qui administre l'organisation
GitHub `archives-magnan`. Les fichiers maîtres sont conservés par **Anne
Rizoulières**.

Les adresses et numéros ne sont volontairement pas écrits ici : ce dépôt est
public, et une adresse laissée en clair sur GitHub est récoltée par les robots
à spam en quelques jours. Un membre de la famille saura retrouver ces deux
personnes.
