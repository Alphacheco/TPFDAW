import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesApiClient, ListClienteDTO } from './clientes-api-client';
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-clientes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './clientes.html',
    styleUrl: './clientes.css'

})

export class ClientesComponent implements OnInit {
    private readonly clientesApi: ClientesApiClient = inject(ClientesApiClient);
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    clientes: ListClienteDTO[] = [];
    cargando: boolean = true;
    mensajeErrorCarga: string = '';
    mensajeErrorOperacion: string = '';

    nombreNuevo: string = '';
    telefonoNuevo: string = '';
    emailNuevo: string = '';
    clienteEditandoId: number | null = null;
    nombreEditando: string = '';
    telefonoEditando: string = '';
    emailEditando: string = '';
    estadoEditando: string = 'ACTIVO';

    ngOnInit(): void {
        this.cargarClientes();
    }

    cargarClientes(): void {
        this.cargando = true;
        this.mensajeErrorCarga = '';

        this.clientesApi.getClientes().subscribe({
            next: (data) => {
                this.clientes = data;
                this.cargando = false;
                this.changeDetectorRef.markForCheck();
            },
            error: (err) => {
                console.error('Error cargando clientes', err);
                this.mensajeErrorCarga = 'No se pudieron cargar los clientes';
                this.cargando = false;
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    crearCliente(): void {
        if (!this.nombreNuevo.trim() || !this.telefonoNuevo.trim() || !this.emailNuevo.trim()) {
            return;
        }

        this.mensajeErrorOperacion = '';

        this.clientesApi.crearCliente({
            nombre: this.nombreNuevo,
            telefono: this.telefonoNuevo,
            email: this.emailNuevo
        }).subscribe({
            next: () => {
                this.nombreNuevo = '';
                this.telefonoNuevo = '';
                this.emailNuevo = '';
                this.cargarClientes();
            },
            error: (err) => {
                console.error('Error creando cliente', err);
                this.mensajeErrorOperacion = this.obtenerMensajeError(err, 'No se pudo crear el cliente');
                this.changeDetectorRef.markForCheck();
            }
        });
    }

    empezarEdicion(cliente: ListClienteDTO): void {
        this.clienteEditandoId = cliente.id;
        this.nombreEditando = cliente.nombre;
        this.telefonoEditando = cliente.telefono ?? '';
        this.emailEditando = cliente.email ?? '';
        this.estadoEditando = cliente.estado;
    }

    cancelarEdicion(): void {
        this.clienteEditandoId = null;
        this.nombreEditando = '';
        this.telefonoEditando = '';
        this.emailEditando = '';
        this.estadoEditando = 'ACTIVO';

    }

    guardarEdicion(): void {
        if (this.clienteEditandoId === null || !this.nombreEditando.trim() || !this.telefonoEditando.trim() || !this.emailEditando.trim()) {
            return;
        }

        this.mensajeErrorOperacion = '';

        this.clientesApi.actualizarCliente(this.clienteEditandoId, {
            nombre: this.nombreEditando,
            telefono: this.telefonoEditando,
            email: this.emailEditando,
            estado: this.estadoEditando   
        }).subscribe({
            next: () => {
                this.cancelarEdicion();
                this.cargarClientes();
            },
            error: (err) => {
                console.error('Error actualizando cliente', err);
                this.mensajeErrorOperacion = this.obtenerMensajeError(err, 'No se pudo actualizar el cliente');
                this.changeDetectorRef.markForCheck();
            }
        });
    }

    eliminarCliente(id:number): void {
        const confirmado: boolean = window.confirm('¿Seguro que querés eliminar este cliente?');

        if (!confirmado) {
            return;
        }

        this.mensajeErrorOperacion = '';

        this.clientesApi.deleteCliente(id).subscribe({
            next: () => {
                this.cargarClientes();

            },
            error: (err) => {
                console.error('Error eliminando cliente', err);
                this.mensajeErrorOperacion = this.obtenerMensajeError(err, 'No se pudo eliminar el cliente');
                this.changeDetectorRef.markForCheck();
            }
        });
    }

    private obtenerMensajeError(err: any, fallback: string): string {
        return err?.error?.message || fallback;
    }
}