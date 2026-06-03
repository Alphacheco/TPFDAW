import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesApiClient } from './clientes-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-clientes',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './clientes.html',

})

export class ClientesComponent {
    clientes$: Observable<any[]>;

    constructor(private clientesApi: ClientesApiClient) {
        this.clientes$ = this.clientesApi.getClientes(); 
    }

    eliminarCliente(id: number) {
        this.clientesApi.deleteCliente(id).subscribe(() => {
            this.clientes$ = this.clientesApi.getClientes();
        });
    }
}