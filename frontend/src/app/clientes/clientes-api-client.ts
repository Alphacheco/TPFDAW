import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import id from '@angular/common/locales/extra/id';

@Injectable ({ providedIn: 'root'})
export class ClientesApiClient {
    private apiUrl = '/api'; // Cambia si tu backend expone otra ruta base

    constructor(private http: HttpClient) {}

    deleteCliente(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/clientes/${id}`);
    }

    getClientes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/clientes`);
    }
    
}