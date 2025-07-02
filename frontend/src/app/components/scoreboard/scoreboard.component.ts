import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { GameServiceService } from '../../services/game-service.service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  gameService = inject(GameServiceService);
  @Input() scoreboard: Map<string, number> = this.gameService.getGame().getGrid().getScoreboard();

  sortedScores: [string, number][] = [];

  ngOnInit(): void {
    // Convertir le Map en tableau et trier par score croissant
    this.sortedScores = Array.from(this.scoreboard.entries()).sort((a, b) => a[1] - b[1]);
  }
}
