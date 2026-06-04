import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ListProyectoDTO {
    id: number;
    nombre: string;
    estado: string;
    cliente?: {
        id: number;
        nombre: string;
        estado: string;
    };
}

@Injectable({ providedIn: 'root' })
export class ProyectosApiClient {
    private readonly client: HttpClient = inject(HttpClient);

    obtenerProyectos(params: { nombre?: string; estado?: string; nombreCliente?: string } = {}): Observable<ListProyectoDTO[]> {
        let httpParams = new HttpParams();
        if (params.nombre) httpParams = httpParams.set('nombre', params.nombre);
        if (params.estado) httpParams = httpParams.set('estado', params.estado);
        if (params.nombreCliente) httpParams = httpParams.set('nombreCliente', params.nombreCliente);
        return this.client.get<ListProyectoDTO[]>('/api/v1/proyectos', { params: httpParams });
    }

    obtenerProyecto(id: number): Observable<ListProyectoDTO> {
        return this.client.get<ListProyectoDTO>(`/api/v1/proyectos/${id}`);
    }

    crearProyecto(dto: { nombre: string; estado: string; idCliente?: number }): Observable<any> {
        return this.client.post('/api/v1/proyectos', dto);
    }

    actualizarProyecto(id: number, dto: { nombre: string; estado: string; idCliente?: number }): Observable<any> {
        return this.client.put(`/api/v1/proyectos/${id}`, dto);
    }

    exportarCSV(): Observable<Blob> {
        return this.client.get('/api/v1/proyectos/exportar', { responseType: 'blob' });
    }
}
