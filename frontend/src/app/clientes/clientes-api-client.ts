import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ListClienteDTO {
    id: number;
    nombre: string;
    telefono: string | null;
    email: string | null;
    estado: string;
}

@Injectable({ providedIn: 'root' })
export class ClientesApiClient {
    private readonly client: HttpClient = inject(HttpClient);

    getClientes(params: { nombre?: string; estado?: string } = {}): Observable<ListClienteDTO[]> {
        let httpParams = new HttpParams();
        if (params.nombre) httpParams = httpParams.set('nombre', params.nombre);
        if (params.estado) httpParams = httpParams.set('estado', params.estado);
        return this.client.get<ListClienteDTO[]>('/api/v1/clientes', { params: httpParams });
    }

    crearCliente(dto: { nombre: string; telefono: string; email: string }): Observable<{ id: number }> {
        return this.client.post<{ id: number }>(`/api/v1/clientes`, dto);
    }

    actualizarCliente(id: number, dto: { nombre: string; telefono?: string; email?: string; estado: string }): Observable<void> {
        return this.client.put<void>(`/api/v1/clientes/${id}`, dto);
    }

    deleteCliente(id: number): Observable<void> {
        return this.client.delete<void>(`/api/v1/clientes/${id}`);
    }
}
