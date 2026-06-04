import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListUsuarioDTO, UsuariosApiClient } from "./usuarios-api-client";

@Component({
    selector: "app-usuarios",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./usuarios.html",
    styleUrl: "./usuarios.css"
})
export class UsuariosComponent implements OnInit {
    private readonly usuariosApiClient: UsuariosApiClient = inject(UsuariosApiClient);
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    usuarios: ListUsuarioDTO[] = [];
    cargando: boolean = true;
    mensajeErrorCarga: string = "";
    mensajeErrorOperacion: string = "";

    nombreNuevo: string = "";
    claveNueva: string = "";
    estadoNuevo: string = "ACTIVO";

    usuarioEditandoId: number | null = null;
    nombreEditando: string = "";
    claveEditando: string = "";
    estadoEditando: string = "ACTIVO";

    filtroNombre: string = '';
    filtroEstado: string = '';
    private filtroTimer: ReturnType<typeof setTimeout> | null = null;

    ngOnInit(): void {
        this.cargarUsuarios();
    }

    onFiltroTextoChange(): void {
        if (this.filtroTimer) clearTimeout(this.filtroTimer);
        this.filtroTimer = setTimeout(() => this.cargarUsuarios(), 400);
    }

    onFiltroSelectChange(): void {
        this.cargarUsuarios();
    }

    cargarUsuarios(): void {
        this.cargando = true;
        this.mensajeErrorCarga = "";

        this.usuariosApiClient.obtenerUsuarios({
            nombre: this.filtroNombre || undefined,
            estado: this.filtroEstado || undefined
        }).subscribe({
            next: (data) => {
                this.usuarios = data;
                this.cargando = false;
                this.changeDetectorRef.markForCheck();
            },
            error: (err) => {
                console.error("Error cargando usuarios", err);
                this.mensajeErrorCarga = "No se pudieron cargar los usuarios";
                this.cargando = false;
                this.changeDetectorRef.markForCheck();
            },
        });
    }

    crearUsuario(): void {
        if (!this.nombreNuevo.trim() || !this.claveNueva.trim()) {
            return;
        }

        this.mensajeErrorOperacion = "";

        this.usuariosApiClient
            .crearUsuario({
                nombre: this.nombreNuevo,
                clave: this.claveNueva,
                estado: this.estadoNuevo,
            })
            .subscribe({
                next: () => {
                    this.nombreNuevo = "";
                    this.claveNueva = "";
                    this.estadoNuevo = "ACTIVO";
                    this.cargarUsuarios();
                },
                error: (err) => {
                    console.error("Error creando usuario", err);
                    this.mensajeErrorOperacion = this.obtenerMensajeError(err, "No se pudo crear el usuario");
                    this.changeDetectorRef.markForCheck();
                },
            });
    }

    empezarEdicion(usuario: ListUsuarioDTO): void {
        this.usuarioEditandoId = usuario.id;
        this.nombreEditando = usuario.nombre;
        this.estadoEditando = usuario.estado;
        this.claveEditando = "";
    }

    cancelarEdicion(): void {
        this.usuarioEditandoId = null;
        this.nombreEditando = "";
        this.estadoEditando = "ACTIVO";
        this.claveEditando = "";
    }

    guardarEdicion(): void {
        if (this.usuarioEditandoId === null || !this.nombreEditando.trim()) {
            return;
        }

        this.mensajeErrorOperacion = "";

        const dto: { nombre: string; estado: string; clave?: string } = {
            nombre: this.nombreEditando,
            estado: this.estadoEditando,
        };

        if (this.claveEditando.trim()) {
            dto.clave = this.claveEditando;
        }

        this.usuariosApiClient.actualizarUsuario(this.usuarioEditandoId, dto).subscribe({
            next: () => {
                this.cancelarEdicion();
                this.cargarUsuarios();
            },
            error: (err) => {
                console.error("Error actualizando usuario", err);
                this.mensajeErrorOperacion = this.obtenerMensajeError(err, "No se pudo actualizar el usuario");
                this.changeDetectorRef.markForCheck();
            },
        });
    }

    private obtenerMensajeError(err: any, fallback: string): string {
        return err?.error?.message || fallback;
    }
}
