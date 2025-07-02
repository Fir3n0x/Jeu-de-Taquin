import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface GridData {
  id: number;
  board: number[];
  pattern: number[][];
}

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http: HttpClient) {}

  public getAllNames() : Promise<Array<string>> {
    return lastValueFrom(this.http.get<Array<string>>('api/game/grid/names'));
  }
  
  public getGrid(id : number) : Promise<GridData>{
    return lastValueFrom(this.http.get<GridData>('api/game/grid/' + id))
  }

  public getScoreBoard(id : number) : Promise<Map<string,number>>{
    return lastValueFrom(this.http.get<Map<string,number>>('api/game/grid/' + id + '/scoreboard'));
  }

  public patchScoreBoard(ScoreDTO: { score: number; idGrid: number; playerName: String}) : Observable<void> {
    return this.http.patch<void>('api/game/grid/scoreboard',ScoreDTO)
  }
  
}
