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
style.css         ← l'apparence, commune à toutes les pages
audio/            ← les fichiers .mp3
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

### Modifier le texte d'une page

Sur github.com, ouvrir le fichier, cliquer sur l'icône en forme de crayon,
modifier, puis valider en bas de page. Aucun logiciel à installer.

### Remplacer un fichier audio

Déposer le nouveau fichier dans `audio/` sous le même nom. L'adresse de la
page ne bouge pas, donc les QR codes déjà imprimés restent valables.

---

## Ce à quoi il faut faire attention

- **Ce dépôt est public.** N'importe qui ayant l'adresse peut écouter et
  télécharger. C'était le but — les membres de la famille ne doivent pas avoir
  à créer de compte. Mais cela vaut d'y réfléchir avant de mettre en ligne un
  enregistrement où des personnes vivantes sont nommées ou reconnaissables.
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

```
AUDIO-001_Jeanne-Dupont_original.wav     ← le maître, hors ligne, intouchable
AUDIO-001_Jeanne-Dupont_ecoute.mp3       ← la version en ligne, dans audio/
```

Le numéro `001` est le même que celui de l'adresse du site (`/01/`). C'est ce
qui permet de retrouver le fichier maître à partir d'un QR code.

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
