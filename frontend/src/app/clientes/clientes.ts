import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesApiClient, ClienteDTO, CreateClienteDTO, UpdateClienteDTO } from './clientes-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-clientes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './clientes.html',
    styleUrl: './clientes.css'

})

export class ClientesComponent {
    clientes$: Observable<ClienteDTO[]>;
    
    // Create form
    nuevoClienteNombre: string = '';
    showCreateForm: boolean = false;
    
    // Edit form
    editingCliente: ClienteDTO | null = null;
    editNombre: string = '';
    editEstado: string = '';

    constructor(private clientesApi: ClientesApiClient) {
        this.clientes$ = this.clientesApi.getClientes(); 
    }

    refreshClientes() {
        this.clientes$ = this.clientesApi.getClientes();
    }

    eliminarCliente(id: number) {
        if (confirm('¿Está seguro de eliminar este cliente?')) {
            this.clientesApi.deleteCliente(id).subscribe(() => {
                this.refreshClientes();
            });
        }
    }

    crearCliente() {
        if (!this.nuevoClienteNombre.trim()) {
            alert('El nombre es requerido');
            return;
        }
        
        const dto: CreateClienteDTO = { nombre: this.nuevoClienteNombre };
        this.clientesApi.createCliente(dto).subscribe(() => {
            this.nuevoClienteNombre = '';
            this.showCreateForm = false;
            this.refreshClientes();
        });
    }

    iniciarEdicion(cliente: ClienteDTO) {
        this.editingCliente = cliente;
        this.editNombre = cliente.nombre;
        this.editEstado = cliente.estado;
    }

    cancelarEdicion() {
        this.editingCliente = null;
        this.editNombre = '';
        this.editEstado = '';
    }

    guardarEdicion() {
        if (!this.editingCliente) return;
        if (!this.editNombre.trim()) {
            alert('El nombre es requerido');
            return;
        }
        
        const dto: UpdateClienteDTO = {
            nombre: this.editNombre,
            estado: this.editEstado
        };
        
        this.clientesApi.updateCliente(this.editingCliente.id, dto).subscribe(() => {
            this.cancelarEdicion();
            this.refreshClientes();
        }, (error) => {
            alert(error.error?.message || 'Error al actualizar el cliente');
        });
    }

    toggleCreateForm() {
        this.showCreateForm = !this.showCreateForm;
    }
}