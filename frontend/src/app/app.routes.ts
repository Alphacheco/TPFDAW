import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Proyectos } from './proyectos/proyectos.component';
import { ProyectoDetalle } from './proyecto-detalle/proyecto-detalle';
import { ProyectoNuevo } from './proyecto-nuevo/proyecto-nuevo';


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
        path: "proyectos/:id",
        component: ProyectoDetalle
    },
    {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes.component').then(m => m.ClientesComponent)
    },
    {
        path: 'usuarios',
        loadComponent: () => import('./usuarios/usuarios.component').then(m => m.UsuariosComponent)
    },
    {
        path: "**",
        redirectTo: "login"
    },
];
