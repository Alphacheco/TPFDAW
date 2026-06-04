import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectosApiClient } from '../proyectos/proyectos-api-client';
import { ClientesApiClient, ListClienteDTO } from '../clientes/clientes-api-client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: "app-proyecto-editar",
    standalone: true,
    templateUrl: "./proyecto-editar.html",
    styleUrl: "./proyecto-editar.css",
    imports: [FormsModule]
})

export class ProyectoEditar {
    id!: number;
    nombre: string = "";
    estado: string = "ACTIVO";
    clientes: ListClienteDTO[] = [];
    idCliente?: number;

    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly proyectosApiClient = inject(ProyectosApiClient);
    private readonly clientesApiClient = inject(ClientesApiClient);

    ngOnInit() {

        this.id = Number(
            this.route.snapshot.paramMap.get('id')
        );

        this.proyectosApiClient
            .obtenerProyecto(this.id)
            .subscribe(proyecto => {

                this.nombre = proyecto.nombre;
                this.estado = proyecto.estado;

                if (proyecto.cliente?.id) {
                    this.idCliente = proyecto.cliente.id;
                }

            });

        this.clientesApiClient
            .getClientes({ estado: 'ACTIVO' })
            .subscribe(clientes => {
                this.clientes = clientes;
            });
    }

    guardar() {

        this.proyectosApiClient
            .actualizarProyecto(
                this.id,
                {
                    nombre: this.nombre,
                    estado: this.estado,
                    idCliente: this.idCliente
                }
            )
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/proyectos');
                },
                error: (err: unknown) => {
                    console.error(err);
                }
            });
    }}