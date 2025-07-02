import { Component, inject } from '@angular/core';
import { GameServiceService } from '../../services/game-service.service';
import { Game } from '../../models/game';
import { Router } from '@angular/router';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-endgame',
  standalone: true,
  imports: [],
  templateUrl: './endgame.component.html',
  styleUrl: './endgame.component.css'
})
export class EndgameComponent {
    gameService = inject(GameServiceService);

    constructor(private router : Router, private overlayService: OverlayService) {}

    public isGameOver() : boolean{
      return this.gameService.getGame().getGrid().isFinish();
    }
  
    public getGame() : Game {
      return this.gameService.getGame();
    }

    public backToMenu() : void {
      //Ajout du nouveau Score dans le Scoreboard de la Grille et retour au menu
      this.overlayService.dispose();
      let id = this.gameService.getGame().getGrid().getId();
  
      const newScores = {
        score: this.gameService.getGame().getScore(),
        idGrid: id,
        playerName: this.gameService.getGame().getPlayerName()
      };
  
      this.gameService.patchScoreboard(newScores).subscribe({
        next: () => {
          console.log('Score enregistré avec succès.');
          this.router.navigate(['/menu']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'enregistrement du score', err);
        }
      });
    } 
}
