import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProyectoDetalleApiClient, ProyectoDTO } from "./proyecto-detalle-api-client";

@Component({
    selector: "app-proyecto-detalle",
    standalone: true,
    templateUrl: "./proyecto-detalle.html",
    styleUrl: "./proyecto-detalle.css",
    imports: [CommonModule, FormsModule]
})

export class ProyectoDetalle {
    private readonly route: ActivatedRoute = inject(ActivatedRoute);
    private readonly proyectoDetalleApiClient: ProyectoDetalleApiClient = inject(ProyectoDetalleApiClient);
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);


    proyecto: ProyectoDTO | null = null;
    cargando: boolean = true;
    mensajeError: string = "";
    idProyecto: number = 0;
    nuevaDescripcion: string = "";
    tareaEditando: any = null;
    descripcionEditando: string = "";
    estadoEditando: string = "";
    editandoProyecto: boolean = false;
    nombreProyectoEdit: string = "";
    estadoProyectoEdit: string= "";
    idClienteProyectoEdit?: number;

    empezarEdicionProyecto() {
        if(!this.proyecto) return;
        this.editandoProyecto = true;
        this.nombreProyectoEdit = this.proyecto.nombre;
        this.estadoProyectoEdit = this.proyecto.estado;
       
    }

    cancelarEdicionProyecto() {
        this.editandoProyecto = false;
    }

    guardarEdicionProyecto() {
        this.proyectoDetalleApiClient.updateProyecto(this.idProyecto, {
            nombre: this.nombreProyectoEdit,
            estado: this.estadoProyectoEdit,
            
        }).subscribe({
            next: () => {
                this.editandoProyecto = false;
                this.recargarProyecto();
            },
            error: (err) => {
                console.error("error actualizando proyecto",err);
            }
        });
    }

    editarTarea(tarea: any) {
        this.tareaEditando = tarea;
        this.descripcionEditando = tarea.descripcion;
        this.estadoEditando = tarea.estado;
    }

    cancelarEdicion() {
        this.tareaEditando = null;
        this.descripcionEditando = "";
        this.estadoEditando = "";
    }

    ngOnInit(): void {
        this.idProyecto = Number(this.route.snapshot.paramMap.get("id"));
        this.recargarProyecto();
    }

    crearTarea(): void {
        if (!this.nuevaDescripcion.trim()) {
            return;
        }

        this.proyectoDetalleApiClient.crearTarea(this.idProyecto, this.nuevaDescripcion).subscribe({
            next: () => {
                this.nuevaDescripcion = "";
                this.recargarProyecto();

            },
            error: (err) => {
                console.error("error creando tarea", err);
            }
        })
    }
    recargarProyecto(): void {
        this.cargando = true;
        this.mensajeError="";
        
        this.proyectoDetalleApiClient.obtenerProyecto(this.idProyecto).subscribe({
            
            next: (data) => {
                console.log("proyecto recibido", data);
                this.proyecto = data;
                this.cargando = false;
                this.changeDetectorRef.detectChanges();
            },
            error: (err) => {
                console.error("error proyecto", err);
                this.mensajeError = "No se pudo cargar el proyecto";
                this.cargando = false;
                this.changeDetectorRef.detectChanges();
            }
        });
    }

    guardarEdicionTarea() {
        if(!this.tareaEditando) return;
        this.proyectoDetalleApiClient
            .updateTarea(this.idProyecto, this.tareaEditando.id, {
                descripcion: this.descripcionEditando,
                estado: this.estadoEditando
            })
            .subscribe({
                next: () => {
                    this.tareaEditando = null;
                    this.descripcionEditando = "";
                    this.estadoEditando = "";
                    this.recargarProyecto();
                },
                error: (err) => {
                    console.error("error actualizando tarea", err);
                }
            })
    }
}