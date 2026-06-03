import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, Router } from "@angular/router";
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
    private readonly router: Router = inject(Router);

    proyectos: ListProyectoDTO[] = [];
    cargando: boolean = true;
    mensajeError: string = "";

    ngOnInit(): void {
        this.proyectosApiClient.obtenerProyectos().subscribe({
            next: (data) => {
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

    exportarCSV() {
        this.proyectosApiClient.exportasCSV().subscribe(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'proyectos.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }

    irAUsuarios() {
        this.router.navigateByUrl('/usuarios');
    }

    irAClientes() {
        this.router.navigateByUrl('/clientes');
    }
}
