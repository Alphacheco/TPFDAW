import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectosApiClient } from '../proyectos/proyectos-api-client';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';


@Component({
    selector: "app-proyecto-nuevo",
    standalone: true,
    templateUrl: "./proyecto-nuevo.html",
    styleUrl: "./proyecto-nuevo.css",
    imports: [CommonModule, FormsModule]
})

export class ProyectoNuevo implements OnInit {
    nombre: string = "";
    estado: string = "ACTIVO";
    esInterno: boolean = true;
    idClienteSeleccionado: number | null = null;
    clientesActivos: Array <{ id: number; nombre: string }> = [];
    
    
    private readonly proyectosApiClient = inject(ProyectosApiClient);
    private readonly router = inject(Router);
    private readonly http = inject(HttpClient);

    ngOnInit(): void {
        this.http
        .get<Array<{id: number; nombre: string }>>("/api/v1/clientes?estado=ACTIVO")
            .subscribe({
                next: (clientes) => {
                    this.clientesActivos = clientes;
                },
                error:(err) => {
                    console.error("Error cargando clientes activos", err);
                }
            });
    }

    crearProyecto() {
       const dto: { nombre: string; estado: string; idCliente?: number } = {
            nombre: this.nombre,
            estado: this.estado
       };
       if (!this.esInterno && this.idClienteSeleccionado !== null) {
        dto.idCliente = this.idClienteSeleccionado;
       }

       this.proyectosApiClient.crearProyecto(dto).subscribe({
        next: () => {
            this.router.navigateByUrl("/proyectos");
        },
        error: (err) => {
            console.error("Error creando proyecto", err);
        }
        
        
       });

       }
    

}