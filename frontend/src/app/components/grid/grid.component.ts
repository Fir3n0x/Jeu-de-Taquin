import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grid } from '../../models/grid';
import { GameServiceService } from '../../services/game-service.service';
import { InteractoModule } from 'interacto-angular';
import { TreeUndoHistory } from 'interacto';
import { TileClickCommand } from '../../commands/TileClickCommand';


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, InteractoModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  providers: [],
})
export class GridComponent {
  gameService = inject(GameServiceService);

  private imageTab : Array<string> = ['/dev/angular.webp','/dev/gitlab.webp','/dev/java.webp','/dev/npm.webp','/dev/spring.webp','/dev/ts.webp'];

  constructor(private undoHistory : TreeUndoHistory, private cdr: ChangeDetectorRef){}

    public updateHistory(i : number) {
      const previousBoard = JSON.parse(JSON.stringify(this.gameService.getGame().getGrid().getBoard()));
      //console.log(previousBoard);
      if(this.gameService.getGame().onTileClick(i) > 0) {
        /* console.log(this.gameService.getGame().getGrid().getBoard()); */
        const addHistory = new TileClickCommand(this.gameService.getGame().getGrid(), i,previousBoard, this.gameService, this.cdr);
        addHistory.execute();
        this.undoHistory.add(addHistory);
        console.log(this.undoHistory)
      }
    } 

  public getImage() : Array<string>{
    return this.imageTab;
  }

  public getGrid() : Grid {
    return this.gameService.getGame().getGrid();
  }

  public getImageById(id : number) : string{
    return id !== -1 ? this.imageTab[id] : '';
  }

  public isGameOver() : boolean {
    return this.getGrid().isFinish();
  }
} 