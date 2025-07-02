import { UndoableCommand } from 'interacto';
import { Grid } from '../models/grid';
import { GameServiceService } from '../services/game-service.service';
import { ChangeDetectorRef } from '@angular/core';

export class TileClickCommand extends UndoableCommand {
    private clickedTile : number;
    private newState : Array<number>;
    private oldState : Array<number>;
    constructor(private grid : Grid, private index: number, protected board : Array<number>, private gameService : GameServiceService, private cdr: ChangeDetectorRef) {
        super();
        this.clickedTile = index;
        this.oldState = board;
        this.newState = grid.getBoard();
    }

    protected override createMemento(): void {
        this.newState = this.grid.getBoard();
    }

    public override canExecute(): boolean {
        return this.grid.getValidatedTiles(this.clickedTile);
    }

    public override execution(): void {
        this.grid.onTileClick(this.index);
        console.log("exec")
    }

    public setOldBoard(board: number[]) {
        this.oldState = board;
    }

    public override undo(): void {
        this.gameService.getGame().getGrid().setBoard(this.oldState);
        this.gameService.getGame().getGrid().checkPattern();
        this.gameService.getGame().updateScore(1);
        this.cdr.markForCheck();
    }

    public override redo(): void {
        this.gameService.getGame().getGrid().setBoard(this.newState);
        this.gameService.getGame().getGrid().checkPattern();
        this.gameService.getGame().updateScore(1);
        this.cdr.markForCheck();    
    }

    public override getUndoName(): string {
        return "";
    }

    public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
        return TileClickCommand.getSnapshot(this.newState);
    }

    public static getSnapshot(gridState: Array<number>): Promise<HTMLElement> | HTMLElement | undefined {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const tileSize = 110;

    // Définir les dimensions de la grille
    const gridSize = Math.sqrt(gridState.length); // Taille de la grille (supposée carrée)
    if (!Number.isInteger(gridSize)) {
        throw new Error('Le tableau de jeu n\'est pas une grille carrée');
    }
    let imageTab : Array<string> = ['/dev/angular.webp','/dev/gitlab.webp','/dev/java.webp','/dev/npm.webp','/dev/spring.webp','/dev/ts.webp'];
    canvas.width = gridSize * tileSize;
    canvas.height = gridSize * tileSize;

    // Charger les images de manière asynchrone
    return new Promise((resolve) => {
        const imagePromises = gridState.map((tile) => {
            if (tile === -1) return Promise.resolve(null); // Ignorer la case vide

            const img = new Image();
            img.src = imageTab[tile];
            return new Promise<HTMLImageElement>((imgResolve) => {
                img.onload = () => imgResolve(img);
            });
        });

        Promise.all(imagePromises).then((images) => {
            // Dessiner les images dans la grille
            images.forEach((img, index) => {
                const x = (index % gridSize) * tileSize; // Colonne
                const y = Math.floor(index / gridSize) * tileSize; // Ligne

                if (img) {
                    ctx.drawImage(img, x, y, tileSize, tileSize); // Dessiner l'image
                } else {
                    // Dessiner un carré vide pour la case vide
                    ctx.fillStyle = 'lightgrey';
                    ctx.fillRect(x, y, tileSize, tileSize);
                }
            });

            ctx.stroke();
            const imgCache = new Image();
            imgCache.src = canvas.toDataURL('image/png');
            resolve(imgCache);
        });
    });
}

    
}
