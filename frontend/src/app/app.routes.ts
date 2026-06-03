import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Proyectos } from './proyectos/proyectos';
import { ProyectoDetalle } from './proyecto-detalle/proyecto-detalle';
import { ProyectoNuevo } from './proyecto-nuevo/proyecto-nuevo';
import { ProyectoEditar } from './proyecto-editar/proyecto-editar';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: "proyectos",
        component: Proyectos,
        canActivate: [authGuard]
    },
    {
        path: "proyectos/nuevo",
        component: ProyectoNuevo,
        canActivate: [authGuard]
    },
    {
        path: 'proyectos/:id/editar',
        component: ProyectoEditar,
        canActivate: [authGuard]
    },
    {
        path: "proyectos/:id",
        component: ProyectoDetalle,
        canActivate: [authGuard]
    },
    {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes').then(m => m.ClientesComponent),
        canActivate: [authGuard]
    },
    {
        path: 'usuarios',
        loadComponent: () => import('./usuarios/usuarios').then(m => m.UsuariosComponent),
        canActivate: [authGuard]
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
