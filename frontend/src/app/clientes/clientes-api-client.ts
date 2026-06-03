import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import id from '@angular/common/locales/extra/id';

export interface ClienteDTO {
    id: number;
    nombre: string;
    estado: string;
}

export interface CreateClienteDTO {
    nombre: string;
}

export interface UpdateClienteDTO {
    nombre?: string;
    estado?: string;
}

@Injectable ({ providedIn: 'root'})
export class ClientesApiClient {
    private apiUrl = '/api/v1';

    constructor(private http: HttpClient) {}

    deleteCliente(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/clientes/${id}`);
    }

    getClientes(): Observable<ClienteDTO[]> {
        return this.http.get<ClienteDTO[]>(`${this.apiUrl}/clientes`);
    }

    createCliente(dto: CreateClienteDTO): Observable<{ id: number }> {
        return this.http.post<{ id: number }>(`${this.apiUrl}/clientes`, dto);
    }

    updateCliente(id: number, dto: UpdateClienteDTO): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/clientes/${id}`, dto);
    }

    getActiveClientes(): Observable<ClienteDTO[]> {
        return this.http.get<ClienteDTO[]>(`${this.apiUrl}/clientes?estado=ACTIVO`);
    }
}