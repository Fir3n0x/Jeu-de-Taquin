import { Injectable, signal, WritableSignal } from '@angular/core';
import { RestServiceService } from './rest-service.service';
import { Game } from '../models/game';
import { Grid } from '../models/grid';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  private game : WritableSignal<Game> = signal(new Game());

  constructor(public restService : RestServiceService, private router: Router) {
  }

  /* Getters and Setters */

  public getGame() : Game {
    return this.game();
  }

  public async getScoreboard(id: number): Promise<void> {
    return this.restService.getScoreBoard(id).then((myscoreboard) => {
        // Conversion en Map et tri des scores dans l'ordre décroissant
        const sortedScoreboard = new Map(
            Object.entries(myscoreboard).sort(([, scoreA], [, scoreB]) => scoreA - scoreB)
        );

        console.log("Scoreboard trié pour la grille " + id + " :", sortedScoreboard);

        // Mise à jour du scoreboard trié
        this.game().getGrid().setScoreboard(sortedScoreboard);
    });
}

  /* Getters and Setters */

  public startGame(id : number) : void{
    this.restService.getGrid(id+1).then(data => {
      let grid = new Grid();
      grid.setId(data.id);
      grid.setBoard(data.board);
      grid.setPattern(data.pattern);
      this.getGame().setGrid(grid);
      this.getGame().getGrid().checkPattern();
      this.getGame().setGameFinished(false);
      this.getGame().setScore(0);
      this.router.navigate(['/game', id]);
    })
    .catch(err => {
      console.log("Erreur récupération de la grille");
      console.error(err);
    }) 
  }

  public patchScoreboard(ScoreDTO: { score: number; idGrid: number; playerName: String}) : Observable<void> {
    return this.restService.patchScoreBoard(ScoreDTO);
  }
}
