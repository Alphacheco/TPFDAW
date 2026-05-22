import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectosApiClient } from '../proyectos/proyectos-api-client';
import { Router } from '@angular/router';


@Component({
    selector: "app-proyecto-nuevo",
    standalone: true,
    templateUrl: "./proyecto-nuevo.html",
    styleUrl: "./proyecto-nuevo.css",
    imports: [FormsModule]
})

export class ProyectoNuevo {
    nombre: string = "";
    estado: string = "ACTIVO";
    
    private readonly proyectosApiClient = inject(ProyectosApiClient);
    private readonly router = inject(Router);

    crearProyecto() {
        console.log({
            nombre: this.nombre,
            estado: this.estado
        })

        this.proyectosApiClient.crearProyecto({
            nombre: this.nombre,
            estado: this.estado            
        }).subscribe({
            next: () => {
                this.router.navigateByUrl("/proyectos");
            },
            error: (err) => {
                console.error("Error creando proyecto", err);
            }
        });
    }

}