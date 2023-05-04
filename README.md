# runic-arena

Projet Digital campus

## MEMO Commandes

Lancer script projet :
npm run start => Démarre le server npm run migration => Créé un fichier .sql pour la migration courante / exécute la
migration dans la base de données.

Pour installer les nodes modules suivants:   
Multer : `npm i multer`   
Fontawesome :

```
npm i --save @fortawesome/fontawesome-svg-core 
npm i --save @fortawesome/free-solid-svg-icons 
npm i --save@fortawesome/free-regular-svg-icons 
npm i --save @fortawesome/vue-fontawesome@latest-3
```

## MEMO GIT

### Pour créer une branche depuis dev :

- on part sur dev
- on pull sur dev
- on crée sa branche depuis dev pour avoir toutes les modifs de dev

### Pour nommer la branche:

feature|fix|hotfix/numissue-nom_branche_associee

### Pour nommer les commits

[#numissue] nomCommit Si le commit ferme l'issue on mettra
[Close #numissue] nomCommit

## Brief

Le studio de jeux vidéo indépendant « Goblins » souhaite développer le jeu « Runic Arena ». Il s’agirait d’un jeu par
navigateur de type TCG (Trading Card Game) permettant à des joueurs de collectionner des cartes et de s’affronter avec,
dans des batailles au tour par tour.

Vous êtes l’équipe en charge de développer :

- **L’API** qui sera utilisée par l’application pour gérer la bibliothèque de cartes.
- Une **interface d’administration (CRUD)** réactive exploitant cette API.

<aside>
📌 Contrainte technique : le studio Goblins développe ses APIs avec le framework JavaScript Express, couplé à l’ORM Prisma. Pour ce qui est de la création d’interfaces réactives, Vue.js est privilégié.

</aside>

## Comprendre le jeu

### Les cartes

Une carte, appelée « invocation » va combattre pour vous dans les batailles.

Elle est définie par :

- Un nom
- Une illustration
- Un type parmi 2 : 🌑 Chaos et ☀️ Halo.
- Une classe parmi 5 : Mage, Soigneur, Guerrier, Archer, Assassin
- Une puissance (ex : `75`)
- De 1 à 2 capacité(s) active(s)
- Une unique capacité passive

### Compétences

L’issue d’un duel est fortement influencée par **le déclenchement de compétences via des capacités actives ou passives**
. Voici les compétences qui existent :

**Buff : sur sa propre carte**

| Nom | Description | Exemple |
| --- | --- | --- |
| Esquive | Esquive les X prochaines attaques | Esquive 2 |
| Protection | Bloque les X prochains dommages | Protection +200 |
| Critique | Double les dommages des X prochaines attaques | Critique 1 |
| Rage | Augmente l’attaque de X | Rage +50 |

**Débuff : sur la carte adverse**

| Nom | Description | Exemple |
| --- | --- | --- |
| Malédiction | Divise par 2 les dommages des X prochaines attaques | Malédiction 1 |
| Epuisement | Réduit l’attaque de X | Rage +50 |
| Folie | À chaque attaque de votre adversaire, il a X% de chance de s’infliger des dégâts égaux à sa puissance | Folie 25% |
| Capitulation | À chaque attaque, votre adversaire à X% de chance d’arrêter sa série d’attaques | Capitulation 30% |

**Dommages**

| Nom | Description | Exemple |
| --- | --- | --- |
| Contre attaque | Pour les X prochaines attaques de votre adversaire, vous lui infligez des dommages égaux à votre puissance | Contre attaque 2 |
| Vol de vie | Soigne X% des dommages infligés | Vol de vie 20% |
| Frappe directe | Pour les X prochaines attaques de votre carte, les dommages infligés ne peuvent être réduits par des débuffs ou buffs adverses | Frappe directe 3 |

<aside>
👉 Ces compétences peuvent être déclenchées par une capacité **passive** ou **active**.

</aside>

### Capacités (actives et passives)

- **Capacités actives**

  Pour qu’une capacité active soit déclenchée, il faut que son coût en cube élémentaire soit satisfait.

- **Capacités passives**

  Pour qu’une capacité passive soit déclenchée, il faut qu’une condition soit vérifiée. Voici les 4 conditions
  existantes :

  | Nom | Description | Exemple |
              | --- | --- | --- |
  | Attaque | Si la carte engage le duel, la compétence est déclenchée | Attaque : Rage +20 |
  | Défend | Si la carte défend sur le duel, la compétence est déclenchée | Défend : Contre attaque 2 |
  | Avantage | Si la carte adverse est d’un certain élément ou d’une classe spécifique, la compétence est déclenchée | Avantage ☀️ Halo : Vol de vie 10% |
  | Groupe | Pour chaque carte d’un élément ou d’une classe spécifique dans sa main, la compétence est déclenchée | Groupe Guerrier : Protection + 50 |

### Gameplay (algorithme de combat)

<aside>
💡 La connaissance du gameplay n’est pas décisive sur ce projet puisqu’il s’agit de la mise en place du backend mais voici pour information en quoi consiste le jeu de carte correspondant.

</aside>

Un combat est constitué de 3 à 5 **duels** (3 duels gagnants sont nécessaires) **opposant une carte d’un joueur avec une
carte de son adversaire**.

<aside>
👉 Si les joueurs remportent un nombre de duels identiques (causé par des égalités), alors le résultat du combat est un match nul.

</aside>

Les decks de chaque joueur sont affichés ouvertement.

À chaque duel, un des deux joueurs annonce avec quelle carte il compte attaquer. Ce joueur est défini aléatoirement au
tout premier tour, puis c’est chacun son tour par la suite.

Voici les phases qui constituent un duel :

| Phase | Nom | Action |
| --- | --- | --- |
| 1 | Génération de mana | 5 points de mana sont générés au début de chaque tour. |
| 2 | Choix de la carte | Le joueur attaquant choisi une carte pour le duel, l’autre joueur choisit à son tour une carte. |
| 3 | Compétence passive | Les compétences passives des 2 cartes opposées sont déclenchées si leurs conditions sont vérifiées. |
| 4 | Utilisation du mana | Chaque joueur peut choisir de dépenser sur sa carte autant de points de mana que sa réserve de mana le permet. Un point de mana permet de lancer un cube runique. Un cube runique est un dé composé de 6 faces :

- 3 faces d’attaque (⚔️ Atk) 50% de chance : permet de lancer une attaque équivalente à la puissance de la carte.
- 3 faces runiques (🔵 Bleu, 🔴 Rouge, 🟡 Jaune) 16.66% de chance chacune : permet de lancer les capacités actives de la
  carte.

Les points de mana non dépensées sont conservés au tour suivant. Cela fait partie de la stratégie. | | 5 | Compétences
actives | La/les compétence(s) active(s) est/sont déclenchée(s) si leur coût en face runique est vérifié. | | 6 |
Dommages | Les attaques sont lancées et les dégâts totaux sont calculés. La carte qui inflige le plus de dégâts remporte
le duel. |

## L’API

L’API comprendra des endpoints de type CRUD commençant par :

- `/cards` pour gérer les **cartes**
- `/skills` pour gérer les **compétences**
- `/classes` pour gérer les **classes**
- `/types` pour gérer les **types**

Un endpoint particulier `GET /cards/name-generator` permettra de générer un nom aléatoirement pour vos cartes. Il sera
utilisé en cliquant sur un bouton depuis le formulaire de création de carte de l’interface d’administration pour
pré-remplir le champ du nom de la carte si l’utilisateur le souhaite.

<aside>
💡 Je vous encourage à réaliser une modélisation de votre base de données avant l’élaboration de votre Schema Prisma.

</aside>

Lors de l’ajout d’une carte via l’API, l’illustration de la carte devra être uploadée et potentiellement retravaillée
sur votre serveur Node.js. Pour cela, je vous recommande les paquets [multer](https://www.npmjs.com/package/multer)
et [jimp](https://www.npmjs.com/package/jimp).

## L’interface d’administration

Cette interface réactive permettra de **gérer les cartes et compétences** en exploitant l’API via des appels `fetch()`
par exemple.

<aside>
💡 Le module [cors](https://www.npmjs.com/package/cors) vous permettra d’autoriser votre frontend à interagir avec votre backend.

</aside>
