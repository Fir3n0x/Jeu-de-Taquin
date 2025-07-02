import { Component, inject } from '@angular/core';
import { GridComponent } from "../grid/grid.component";
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { UndoableSnapshot } from 'interacto';
import { GameServiceService } from '../../services/game-service.service';
import { OverlayService } from '../../services/overlay.service';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { EndgameComponent } from '../endgame/endgame.component';
import { InteractoModule, interactoTreeUndoProviders } from 'interacto-angular';
import { TileClickCommand } from '../../commands/TileClickCommand';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GridComponent, CommonModule, InteractoModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  providers: [interactoTreeUndoProviders()]
})
export class GameComponent {
  gameService = inject(GameServiceService);

  protected scoreboardClicked: boolean = false;
  protected overlayOpened = false;

  public widthHistory: string = '80%';

  constructor(private overlayService: OverlayService) {}

  public rootRenderer(): UndoableSnapshot {
    return TileClickCommand.getSnapshot(this.gameService.getGame().getGrid().getBoard());
  }

  public isGameOver(): boolean {
    return this.gameService.getGame().getGrid().isFinish();
  }

  public getGame(): Game {
    return this.gameService.getGame();
  }

  public openScoreboard(): void {
    let id = this.gameService.getGame().getGrid().getId();
    this.gameService.getScoreboard(id).then(() => {
      this.overlayService.open(ScoreboardComponent, true);
      this.scoreboardClicked = true;
    });
  }

  public openOverlay(): boolean {
    if (!this.overlayOpened) {
      this.overlayOpened = true;
      this.overlayService.open(EndgameComponent, false);
    }
    return true;
  }

  public moveSplitPane(pane: HTMLElement): void {
    this.widthHistory = `${pane.clientWidth}px`;
  }
}
