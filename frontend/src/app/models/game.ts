import { BehaviorSubject } from "rxjs";
import { Grid } from "./grid"; 

export class Game {
    private score : number;
    private playerName : string; 
    private grid : Grid;
    public gameFinished = new BehaviorSubject<boolean>(false);

    constructor(){
      this.grid = new Grid(); 
      this.score = 0;
    }

    /* Getters and Setters */

    public getScore() : number {
      return this.score;
    }
  
    public getGrid() : Grid {
      return this.grid;
    }
  
    public setGrid(grid : Grid) : void {
      this.grid = grid;
    }

    public setName(name : string) : void {
      if(name == "") this.playerName = this.randomName();
      else this.playerName = name;
    }
  
    public getPlayerName() : string {
      return this.playerName;
    }

    public setGameFinished(bool : boolean){
      this.gameFinished.next(bool);
    }

    public setScore(score : number) : void {
      this.score = score;
    }

    /* Getters and Setters */

    public randomName() : string{
      const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
      let playerName = "";
      let length = Math.floor(Math.random() * 6) + 3;
      
      for(let i=0 ; i<length ; i++){
        let index = Math.floor(Math.random() * alphabet.length);
        playerName += alphabet[index];
      }
      return playerName
    }

    public isFinish(): boolean {
      if (this.grid.isFinish()) {
          this.gameFinished.next(true);
          console.log("Fini");
      }
      return this.grid.isFinish();
  }

  public onTileClick(x : number) : number {
    let scoreToUpdate = this.getGrid().onTileClick(x);
    this.score += scoreToUpdate;
    return scoreToUpdate;
  }

  public updateScore(x : number)  {
    this.score += x;
  }
}
