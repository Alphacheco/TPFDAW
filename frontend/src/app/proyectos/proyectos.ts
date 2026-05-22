import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ProyectosApiClient, ListProyectoDTO } from "./proyectos-api-client";

@Component({
    selector: "app-proyectos",
    templateUrl: "./proyectos.html",
    styleUrl: "./proyectos.css",
    imports: [CommonModule, RouterLink]
})

export class Proyectos {
    private readonly proyectosApiClient: ProyectosApiClient = inject(ProyectosApiClient);
    private readonly changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    proyectos: ListProyectoDTO[] = [];
    cargando: boolean = true;
    mensajeError: string = "";

    ngOnInit(): void {
        this.proyectosApiClient.obtenerProyectos().subscribe({
            next: (data) => {
                console.log ('proyectos recibidos', data);
                this.proyectos = data;
                this.cargando = false;
                this.changeDetector.markForCheck();
            },
            error: (err) => {
                console.error('error proyectos',err);
                this.mensajeError = "No se pudieron cargar los proyectos";
                this.cargando = false;
                this.changeDetector.markForCheck();
            }
        });
    }
}
