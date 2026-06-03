import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioDTO {
    id: number;
    nombre: string;
    estado: string;
}

export interface CreateUsuarioDTO {
    nombre: string;
    clave: string;
}

export interface UpdateUsuarioDTO {
    nombre?: string;
    clave?: string;
    estado?: string;
}

@Injectable ({ providedIn: 'root'})
export class UsuariosApiClient {
    private apiUrl = '/api/v1';

    constructor(private http: HttpClient) {}

    deleteUsuario(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
    }

    getUsuarios(): Observable<UsuarioDTO[]> {
        return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuarios`);
    }

    createUsuario(dto: CreateUsuarioDTO): Observable<{ id: number }> {
        return this.http.post<{ id: number }>(`${this.apiUrl}/usuarios`, dto);
    }

    updateUsuario(id: number, dto: UpdateUsuarioDTO): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/usuarios/${id}`, dto);
    }

    getActiveUsuarios(): Observable<UsuarioDTO[]> {
        return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuarios?estado=ACTIVO`);
    }
}
