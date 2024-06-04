import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/home/home.component')},
    { path: 'log-in', loadComponent: () => import('./pages/log-in/log-in.component')},
    { path: 'sign-up', loadComponent: () => import('./pages/sign-up/sign-up.component')},
    { path: 'registro', loadComponent: () => import('./pages/registro/registro.component')},
];
