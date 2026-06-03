import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ListTareaDTO {
    id: number;
    descripcion: string;
    estado: string;
}

export interface ProyectoDTO {
    nombre: string;
    estado: string;
    cliente?: string;
    tareas: ListTareaDTO[];
}

@Injectable({ providedIn: 'root' })
export class ProyectoDetalleApiClient {

    private readonly client: HttpClient = inject(HttpClient);

    obtenerProyecto(id: number): Observable<ProyectoDTO> {
        return this.client.get<ProyectoDTO>(`/api/v1/proyectos/${id}`);
    }

    crearTarea(idProyecto: number, descripcion: string): Observable<{ id: number}> {
        return this.client.post<{ id: number }>(
            `/api/v1/proyectos/${idProyecto}/tareas`,
            { descripcion }
        );
    }

    updateTarea(idProyecto: number, idTarea: number, data: { descripcion: string, estado?: string }): Observable<void> {
        return this.client.put<void>(
            `/api/v1/proyectos/${idProyecto}/tareas/${idTarea}`,
            data
        );
    }

    updateProyecto(idProyecto: number, data: { nombre: string, estado: string, idCliente?: number }): Observable<void> {
        return this.client.put<void>(
            `/api/v1/proyectos/${idProyecto}`,
            data

        );
    }
}