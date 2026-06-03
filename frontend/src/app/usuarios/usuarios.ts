import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosApiClient, UsuarioDTO, CreateUsuarioDTO, UpdateUsuarioDTO } from './usuarios-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './usuarios.html',
    styleUrl: './usuarios.css'

})

export class UsuariosComponent {
    usuarios$: Observable<UsuarioDTO[]>;
    
    // Create form
    nuevoUsuarioNombre: string = '';
    nuevoUsuarioClave: string = '';
    showCreateForm: boolean = false;
    
    // Edit form
    editingUsuario: UsuarioDTO | null = null;
    editNombre: string = '';
    editClave: string = '';
    editEstado: string = '';

    constructor(private usuariosApi: UsuariosApiClient) {
        this.usuarios$ = this.usuariosApi.getUsuarios(); 
    }

    refreshUsuarios() {
        this.usuarios$ = this.usuariosApi.getUsuarios();
    }

    eliminarUsuario(id: number) {
        if (confirm('¿Está seguro de eliminar este usuario?')) {
            this.usuariosApi.deleteUsuario(id).subscribe(() => {
                this.refreshUsuarios();
            });
        }
    }

    crearUsuario() {
        if (!this.nuevoUsuarioNombre.trim() || !this.nuevoUsuarioClave.trim()) {
            alert('El nombre y la clave son requeridos');
            return;
        }
        
        const dto: CreateUsuarioDTO = { 
            nombre: this.nuevoUsuarioNombre,
            clave: this.nuevoUsuarioClave
        };
        this.usuariosApi.createUsuario(dto).subscribe(() => {
            this.nuevoUsuarioNombre = '';
            this.nuevoUsuarioClave = '';
            this.showCreateForm = false;
            this.refreshUsuarios();
        }, (error) => {
            alert(error.error?.message || 'Error al crear el usuario');
        });
    }

    iniciarEdicion(usuario: UsuarioDTO) {
        this.editingUsuario = usuario;
        this.editNombre = usuario.nombre;
        this.editEstado = usuario.estado;
        this.editClave = '';
    }

    cancelarEdicion() {
        this.editingUsuario = null;
        this.editNombre = '';
        this.editEstado = '';
        this.editClave = '';
    }

    guardarEdicion() {
        if (!this.editingUsuario) return;
        if (!this.editNombre.trim()) {
            alert('El nombre es requerido');
            return;
        }
        
        const dto: UpdateUsuarioDTO = {
            nombre: this.editNombre,
            estado: this.editEstado
        };
        
        if (this.editClave.trim()) {
            dto.clave = this.editClave;
        }
        
        this.usuariosApi.updateUsuario(this.editingUsuario.id, dto).subscribe(() => {
            this.cancelarEdicion();
            this.refreshUsuarios();
        }, (error) => {
            alert(error.error?.message || 'Error al actualizar el usuario');
        });
    }

    toggleCreateForm() {
        this.showCreateForm = !this.showCreateForm;
    }
}
