import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ProyectosApiClient, ListProyectoDTO } from "./proyectos-api-client";

@Component({
    selector: "app-proyectos",
    templateUrl: "./proyectos.html",
    styleUrl: "./proyectos.css",
    imports: [CommonModule, RouterLink, FormsModule]
})
export class Proyectos implements OnInit {
    private readonly proyectosApiClient: ProyectosApiClient = inject(ProyectosApiClient);
    private readonly changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    proyectos: ListProyectoDTO[] = [];
    cargando: boolean = true;
    mensajeError: string = "";

    filtroNombre: string = '';
    filtroEstado: string = '';
    filtroCliente: string = '';
    private filtroTimer: ReturnType<typeof setTimeout> | null = null;

    ngOnInit(): void {
        this.cargarProyectos();
    }

    onFiltroTextoChange(): void {
        if (this.filtroTimer) clearTimeout(this.filtroTimer);
        this.filtroTimer = setTimeout(() => this.cargarProyectos(), 400);
    }

    onFiltroSelectChange(): void {
        this.cargarProyectos();
    }

    cargarProyectos(): void {
        this.cargando = true;
        this.mensajeError = '';

        this.proyectosApiClient.obtenerProyectos({
            nombre: this.filtroNombre || undefined,
            estado: this.filtroEstado || undefined,
            nombreCliente: this.filtroCliente || undefined
        }).subscribe({
            next: (data) => {
                this.proyectos = data;
                this.cargando = false;
                this.changeDetector.markForCheck();
            },
            error: (err) => {
                console.error('error proyectos', err);
                this.mensajeError = "No se pudieron cargar los proyectos";
                this.cargando = false;
                this.changeDetector.markForCheck();
            }
        });
    }

    exportarCSV(): void {
        this.proyectosApiClient.exportarCSV().subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'proyectos.csv';
                a.click();
                window.URL.revokeObjectURL(url);
            },
            error: (err) => {
                console.error('error exportar csv', err);
                this.mensajeError = 'No se pudo exportar el CSV';
                this.changeDetector.markForCheck();
            }
        });
    }
}
