#USER STORIES

En tant que Joueur:

---FRONTEND---

MENU\
Je veux établir un nom d'utilisateur
Afin d'être référencé dans le tableau des scores.
Acceptance criteria:
-Le nom d'utilisateur doit pouvoir être établit au menu du jeu
-Le nom d'utilisateur doit pouvoir être affiché à droite de l'écran en jeu.
-Le nom d'utilisateur doit pouvoir être utilisé pour inscrire le score du joueur dans le tableau des scores.

Je veux sélectionner un tableau de jeu
Afin de diversifier l'expérience de jeu utilisateur.
Acceptance criteria:
-Il faut pouvoir sélectionner un tableau de jeu parmi une liste de tableaux proposés.
-Il faut pouvoir voir son tableau sélectionné en jeu.
-Il faut que l'utilisateur soit en mesure de pouvoir re-modifier le tableau de jeu, une fois de retour dans le menu.

Je veux pouvoir accéder à la page de jeu en cliquant sur le nom du tableau de jeu.
Afin de faciliter l'accessibilité.
Acceptance criteria:
-Pour lancer la partie, l'utilisateur doit être en mesure de pouvoir lancer une partie en cliquant sur le tableau de jeu sur lequel il souhaite jouer.
-Chacun des tableaux de jeu doit être en mesure de pouvoir lancer la partie.

GAME\
Je veux pouvoir accéder à mon historique de coups.
Afin de pouvoir voir les différents coups joués.
Acceptance criteria:
-L'utilisateur doit être en mesure de voir les coups qu'il a joué dans la partie gauche de son écran (situé dans un onglet), en jeu.

Je veux pouvoir annuler et rafraîchir un coup
Afin de faciliter la jouabilité.
Acceptance criteria:
-L'utilisateur doit pouvoir revenir en arrière sur les coups qu'il a joué.

Je veux pouvoir cliquer sur un des tableaux de jeu stockés en historique
Afin de revenir à une position antérieure.
Acceptance criteria:
-En revenant sur un coup déjà joué, l'historique de coup affiché doit pouvoir s'actualiser de manière dynamique.

Je veux pouvoir avoir un affichage de l'historique dynamique qui affiche l'arbre des coups
Afin que le joueur puisse se retrouver dans le jeu.
Acceptance criteria:
-La consultation doit pouvoir être dynamique du point de vue de l'utilisateur.
-L'historique de coup doit pouvoir s'adapter à la position du tableau de jeu dans laquelle le joueur se trouve.

Je veux pouvoir avoir un jeu initialisé (grille carrée de 4*4)
Afin de pouvoir commencer le jeu.
Acceptance criteria:
-L'utilisateur doit être en mesure de pouvoir lancer une partie de lui-même.
-Le lancement de la partie se fait en cliquant sur le tableau de jeu sur lequel le joueur veut jouer.

Je veux que la partie aie un ensemble de 6 symboles
Afin de définir le nombre de symbole.

Je veux que la partie montre chaque symbole au moins 2 fois ou maximum 3 fois
Afin de diversifier le jeu.

Je veux que le joueur reproduise toutes les associations possibles du pattern afin de compléter le pattern
Afin de pouvoir terminer la partie.

Je veux que le joueur qui ait fait le moins de coups soit mieux classé qu'un autre avec un nombre de coup supérieur
Afin de réaliser un classement.

Je veux pouvoir passer au pattern suivant une fois le pattern actuel complété
Afin de continuer la partie.

Je veux pouvoir générer un nom d'utilisateur aléatoire si aucun nom n'est défini au début du jeu
Afin de pouvoir identifier le joueur.

Je veux que le nom de chaque grille soit visible dans la liste de grille du menu
Afin de pouvoir se repéré dans le choix des différentes grilles.

Je veux pouvoir déplacer des tuiles du tableau de jeu (le nombre de tuile bougé doit être ajouté au nombre de coup total)
Afin de pouvoir avancer dans le jeu.
-L'utilisateur doit être en mesure de déplacer les tuiles du tableau de jeu en cliquant sur la tuile qu'il souhaite déplacer.
-Plusieurs tuiles peuvent être déplacées d'un coup sur une ligne si le coup est possible.

Je veux pouvoir voir le motif à assembler
Afin de pouvoir connaître le motif.
Acceptance criteria :
-On veut pouvoir visualiser le motif actuel que l'on doit composer sur la grille du jeu.

Je veux pouvoir avoir une validation du motif assemblé
Afin de pouvoir validé le coup.
Acceptance criteria :
-Les cases contenant le motif à assembler changent de couleur pour spécifier à l'utilisateur que le motif est correct.

Je veux pouvoir visualiser le nom du joueur en train de jouer
Afin d'avoir un repère sur la personne qui joue.
Accptance criteria : 
-On doit pouvoir le nom que l'on a renseigné pendant la partie.

Je veux pouvoir avoir le nombre de coup affiché
Afin de pouvoir avoir une indication.
Accptance criteria :
-Le score doit être affiché sur le côté droit de la grille afin de savoir notre nombre de coups actuel

Je veux pouvoir avoir un menu d'affichage en fin de partie
Afin de pouvoir avoir un résumé de la partie.
Accptance criteria :
-Un texte apparaît en dessous du score pour nous dire que c'est la fin du jeu.

Je veux pouvoir avoir une indication en dessous du scoreboard en fin de partie
Afin de pouvoir dire au joueur que la partie est bien finie.
Accptance criteria :
-Un menu doit apparaître à la fin de la partie pour prévenir le joueur qu'il a assemblé tous les motifs demandés.

Je veux pouvoir revenir au menu, une fois la partie finie
Afin de pouvoir relancer une partie.
Accptance criteria :
-Un bouton apparaît en fin de partie pour revenir au menu ce qui permettra de relancer une partie.

Je veux pouvoir afficher le classement du top 5 Score (Rank,Name,Score) en pleine partie
Afin de pouvoir se comparer aux autres.
Accptance criteria :
-Un bouton classement est présent sur la page du jeu et permet de connaître via un affichage, les 5 meilleurs scores des joueurs précédents.

Je veux que le nombre de coup soit dynamique
Afin que l'utilisateur puisse voir le nombre de coup joué.
Accptance criteria :
-L'affichage du nombre de coups change à chaque déplacement, que ce soit un déplacement d'une ou plusieurs tuiles ou d'un undo/redo qui augmente le nombre de tuiles déplacées.

---BACKEND---

Je veux que le back end stocke dans la base de donnée des grilles prédéfinies et les meilleurs scores fait par les joueurs
Afin de pouvoir obtenir un historique des performances.

Je veux que le back end fournissent le front end avec des routes
Afin de pouvoir afficher les informations du menu et d'afficher la partie.

Je veux que le back end stocke le nouveau score fait par un joueur et n'affiche seulement que le meilleur score de ce joueur soit gardé
Afin que le joueur puisse être classé.