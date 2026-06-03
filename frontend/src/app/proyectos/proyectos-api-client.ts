import {HttpClient} from"@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";


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

    obtenerProyectos(): Observable<ListProyectoDTO[]> {
        return this.client.get<ListProyectoDTO[]>('/api/v1/proyectos');
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
    exportasCSV() {
    return this.client.get('/api/v1/proyectos/exportar', { responseType: 'blob' });}
}