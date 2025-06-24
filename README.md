# 91's - PNL : Pochette d'album interactive Synthwave

## Présentation

Ce projet propose une **pochette d'album interactive** inspirée du morceau "91's" de PNL, réalisée en HTML/CSS/JS avec Canvas. L'expérience visuelle plonge l'utilisateur dans un univers **synthwave** rétro-futuriste, animé et audio-réactif, fidèle à l'esthétique des années 80 et à l'ambiance du titre.

---

## Démarche artistique

### Pourquoi le style synthwave ?
Le synthwave est un courant artistique qui s'inspire de la pop culture des années 80 :
- **Couleurs néon** (violet, rose, bleu, jaune)
- **Soleil couchant stylisé**
- **Grille 3D, route infinie, palmiers, buildings rétro**
- **Effets CRT, glitch, scanlines, brume**
- **Typographies et effets glitch**

Ce style évoque la nostalgie, la rêverie, l'évasion et la modernité, des thèmes chers à PNL et particulièrement présents dans "91's" (références à la banlieue, à l'enfance, à l'ascension, à la nuit, à l'introspection).

### Lien avec "91's" de PNL
- **Ambiance nocturne et urbaine** : la route, la voiture rétro, les buildings, la brume évoquent la traversée de la ville la nuit, un thème récurrent chez PNL.
- **Soleil couchant** : symbole de passage, de rêve, d'espoir, de mélancolie.
- **Palette néon** : rappelle les lumières de la ville, les enseignes, l'énergie nocturne.
- **Effets audio-réactifs** : le reflet du soleil vibre avec la musique, créant un lien direct entre le son et l'image.
- **Titre animé** : "91's - PNL" s'affiche en haut, avec un effet glitch et synthwave, clin d'œil à l'identité visuelle du groupe.

### Expérience interactive
- **Bouton Play** centré, animé, pour lancer la musique et l'animation.
- **Reflet du soleil audio-réactif** : la forme et la couleur du reflet changent selon la musique.
- **Ajout d'étoiles scintillantes** au clic dans le ciel.
- **Effets visuels dynamiques** : scanlines, CRT, brume, glitch, RGB split, vignettage, etc.
- **Canvas carré** pour un vrai format "pochette d'album".

---

## Fonctionnalités principales
- Canvas animé (HTML5/JS)
- Soleil jaune/orange stylisé synthwave
- Route, voiture rétro, buildings, palmiers, étoiles
- Reflet audio-réactif synchronisé avec la musique
- Effets visuels : scanlines, CRT, brume, glitch, vignettage, RGB split
- Bouton Play animé (pulse) pour démarrer l'expérience
- Ajout d'étoiles interactif
- Responsive : la pochette reste carrée et centrée

---

## Installation & Lancement

1. **Cloner le projet**
```bash
git clone <repo-url>
cd <nom-du-dossier>
```
2. **Ajouter la musique**
- Place le fichier `91s.mp3` dans le dossier `assets/` (ou remplace par ton propre mp3).
- Place l'image de voiture `Car.png` dans `assets/`.

3. **Lancer localement**
- Ouvre `index.html` dans ton navigateur (Chrome recommandé pour l'audio).

---

## Structure du projet

- `index.html` : structure de la page
- `style.css` : styles, centrage, animation du bouton
- `script.js` : toute la logique Canvas, animation, interactivité, audio
- `assets/` : musique et images

---

## Personnalisation
- Change la palette de couleurs dans `script.js` pour explorer d'autres ambiances
- Remplace la musique ou l'image de voiture pour d'autres univers
- Ajoute de nouveaux effets visuels (particules, météo, etc.)

---

## Crédits & Inspirations
- PNL – "91's"
- Synthwave artists & références visuelles (Vaporwave, Outrun, Miami 80s)
- [Unsplash](https://unsplash.com/) pour les images de référence
- [CodePen](https://codepen.io/) pour l'inspiration d'effets Canvas

---

## Auteur
Guillaume LSX — 2024

---

*Ce projet est un hommage artistique et technique à l'univers de PNL et à l'esthétique synthwave. Libre à toi de le modifier, l'explorer, le partager !* 