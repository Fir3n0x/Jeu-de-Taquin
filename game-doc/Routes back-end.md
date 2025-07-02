GET /api/game/grid/{name} : Récupérer une grille (OK, NOT_FOUND) : 

{
  "id" : 1,
  "name" : "Board1"
  "board" : ["0","1","0","4","2","3","0","1","3","4","2","1","0","0","2","3"],
  "patterns" : [["0","0"],["2","2"],...]
  "scoreboard" : {
	{"Joueur1",36},
	{"Joueur2",54},
	{"Joueur3",57}
  }
}


GET api/game/grid : Récupérer les noms des grilles (OK) :

[
  	"Board1",
  	"Board2",
  	"Board3"
  ]

PATCH /api/game/grid : Modifier le scoreboard d'une grille (OK, NOT_FOUND) :

Entrée : 

{
  "id" : 1,
  "score" : 40,
  "playerName" : "Player1"
}

Retour :

{
	{"Joueur1",36},
	{"Joueur2",38},
	{"Joueur3",57}
}



   
