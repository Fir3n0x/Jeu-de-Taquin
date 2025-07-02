export class Grid {

    private id : number;
    private board : number[] = new Array(16);
    private pattern : number[][] = [];
    private currentPattern : number;
    private numberOfCurrentPattern : number = 0;
    private scoreboard : Map<string,number>;
    private validatedTiles : boolean[] = new Array(16).fill(false);
  
    constructor() {
      this.id = 0;
      this.board = [2,1,4,3,5,1,3,2,3,4,2,0,1,2,5,-1];
      this.pattern = [[1,2],[2,2],[3,3]];
      this.currentPattern = 0;
      this.maxPossiblePatterns();
      this.scoreboard = new Map();  
    }

    /* Getters and Setters */
  
    public getId() : number {
      return this.id;
    }
  
    public getCurrentPattern() : Array<number> {
      return this.pattern[this.currentPattern];
    }
  
    public getNumberOfCurrentPattern() : number {
      return this.numberOfCurrentPattern;
    }
  
    public getBoard() : Array<number>{
      return this.board;
    }

    public setScoreboard(scoreboard :Map<string,number>) : void {
        this.scoreboard = scoreboard;
    }

    public setBoard(board : number[]) : void {
      this.board = board;
    }

    public setPattern(pattern : number[][]) : void {
      this.pattern = pattern;
    }

    public setId(id : number) : void {
      this.id = id;
    }
  
    public getPattern() : number[][]{
      return this.pattern;
    }
  
    public getScoreboard() : Map<string,number>{
      return this.scoreboard;
    }

    public getValidatedTiles(i : number) : boolean{
      return this.validatedTiles[i];
    }

    /* Getters and Setters */

    public onTileClick(x : number) : number{ 
      let emptyIndex = this.board.indexOf(-1);
      let size = 0;
  
      if((emptyIndex-x) % 4 == 0 ){ // on a column
        size = Math.abs(emptyIndex-x) / 4;
        let direction = (emptyIndex > x) ? - 4 : 4; // Move down or up
        for(let i=0 ; i<size ; i++){
          [this.board[emptyIndex], this.board[emptyIndex + direction]] = [this.board[emptyIndex + direction], this.board[emptyIndex]];
          emptyIndex += direction;
        } 
      }
      else if(this.isOnSameLine(emptyIndex,x)){
        size = Math.abs(emptyIndex - x);
        let direction = (emptyIndex > x) ? -1 : 1; // Move right or left
        for(let i=0 ; i<size ; i++){
          [this.board[emptyIndex], this.board[emptyIndex + direction]] = [this.board[emptyIndex + direction], this.board[emptyIndex]];
          emptyIndex += direction;
        }
      }
      this.checkPattern();
      return size;
    }
  
    public isOnSameLine(x1 : number, x2 : number){
      return Math.floor(x1/4) == Math.floor(x2/4);
    }
  
    public checkPattern() : void {
  
      let tempValidatedTiles = new Array(16).fill(false);
      let goodPatterns = 0;
  
      for(let i = 0; i<15; i++){
        if(this.pattern[this.currentPattern][0] == this.board[i] && this.isOnSameLine(i,i+1) && this.pattern[this.currentPattern][1] == this.board[i+1]){
          tempValidatedTiles[i] = true;
          tempValidatedTiles[i+1] = true;
          goodPatterns++;
        }
      }
      this.validatedTiles = tempValidatedTiles;
      if(goodPatterns >= this.numberOfCurrentPattern){
        this.currentPattern++;
        this.switchPattern();
      }
    }
  
    public switchPattern() : void  {
      this.validatedTiles.fill(false);
      if(this.pattern.length > this.currentPattern){
        this.maxPossiblePatterns();
        this.checkPattern();
      }
    }

    public isFinish() : boolean {
      return this.currentPattern == this.pattern.length;
    }

    public maxPossiblePatterns() : void {
        const img1 = this.pattern[this.currentPattern][0];
        const img2 = this.pattern[this.currentPattern][1]
        const countImg1 = this.board.filter(tile => tile === img1).length
        const countImg2 = this.board.filter(tile => tile === img2).length
        if(img1 === img2){
          this.numberOfCurrentPattern = Math.floor(countImg1/2) + 1;
        }
        else{
          this.numberOfCurrentPattern = Math.min(countImg1,countImg2);
        }
    }
}
