import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import id from '@angular/common/locales/extra/id';

export interface ClienteDTO {
    id: number;
    nombre: string;
    estado: string;
}

@Injectable ({ providedIn: 'root'})
export class ClientesApiClient {
    private apiUrl = '/api';

    constructor(private http: HttpClient) {}

    deleteCliente(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/clientes/${id}`);
    }

    getClientes(): Observable<ClienteDTO[]> {
        return this.http.get<ClienteDTO[]>(`${this.apiUrl}/clientes`);
    }
    
}