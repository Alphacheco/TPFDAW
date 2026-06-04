import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ListUsuarioDTO {
    id: number;
    nombre: string;
    estado: string;
}

@Injectable({ providedIn: "root" })
export class UsuariosApiClient {
    private readonly client: HttpClient = inject(HttpClient);

    obtenerUsuarios(params: { nombre?: string; estado?: string } = {}): Observable<ListUsuarioDTO[]> {
        let httpParams = new HttpParams();
        if (params.nombre) httpParams = httpParams.set('nombre', params.nombre);
        if (params.estado) httpParams = httpParams.set('estado', params.estado);
        return this.client.get<ListUsuarioDTO[]>("/api/v1/usuarios", { params: httpParams });
    }

    crearUsuario(dto: { nombre: string; clave: string; estado: string }): Observable<{ id: number }> {
        return this.client.post<{ id: number }>("/api/v1/usuarios", dto);
    }

    actualizarUsuario(id: number, dto: { nombre: string; estado: string; clave?: string }): Observable<void> {
        return this.client.put<void>(`/api/v1/usuarios/${id}`, dto);
    }
}
