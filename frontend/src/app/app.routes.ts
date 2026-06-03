import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Proyectos } from './proyectos/proyectos';
import { ProyectoDetalle } from './proyecto-detalle/proyecto-detalle';
import { ProyectoNuevo } from './proyecto-nuevo/proyecto-nuevo';
import { ProyectoEditar } from './proyecto-editar/proyecto-editar';


export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: "proyectos",
        component: Proyectos
    },
    {
        path: "proyectos/nuevo",
        component: ProyectoNuevo
    },
    {
        path: 'proyectos/:id/editar',
        component: ProyectoEditar
    },
    {
        path: "proyectos/:id",
        component: ProyectoDetalle
    },
    {
        path: "**",
        redirectTo: "login"
    },
    {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes').then(m => m.ClientesComponent)
    }
];
