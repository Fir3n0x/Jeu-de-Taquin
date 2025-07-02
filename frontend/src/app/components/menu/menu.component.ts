import { Component, signal, WritableSignal } from '@angular/core';
import { Menu } from '../../models/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameServiceService } from '../../services/game-service.service';
import { RestServiceService } from '../../services/rest-service.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  playerName : string = "";
  protected names : WritableSignal<Array<string>> = signal([]);

  constructor(public menu: Menu, private gameService : GameServiceService, 
    private restService: RestServiceService) {
      this.loadAllNames();
    }

  private loadAllNames() {
    this.restService.getAllNames().then(list => {
      this.names.set(list);
      console.log(this.names());
    })
    .catch(err => {
      console.log("Erreur récupération des noms des grilles");
      console.error(err);
    })
  }

  public startGame(idGrid : number) : void{
    this.gameService.startGame(idGrid); // on donnera en paramètre la bonne grille ici
    this.gameService.getGame().setName(this.playerName);
    
  }
}
