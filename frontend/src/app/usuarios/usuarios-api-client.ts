import { HttpClient } from "@angular/common/http";
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

    obtenerUsuarios(): Observable<ListUsuarioDTO[]> {
        return this.client.get<ListUsuarioDTO[]>("/api/v1/usuarios");
    }

    crearUsuario(dto: { nombre: string; clave: string; estado: string }): Observable<{ id: number }> {
        return this.client.post<{ id: number }>("/api/v1/usuarios", dto);
    }

    actualizarUsuario(id: number, dto: { nombre: string; estado: string; clave?: string }): Observable<void> {
        return this.client.put<void>(`/api/v1/usuarios/${id}`, dto);
    }
}
