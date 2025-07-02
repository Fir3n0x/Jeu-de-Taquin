import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
    { path: 'menu', component: MenuComponent }, 
    { path: 'game/:numero', component: GameComponent, title: 'Game' }, 
    { path: '**', redirectTo: 'menu', pathMatch: 'full' } 
];
