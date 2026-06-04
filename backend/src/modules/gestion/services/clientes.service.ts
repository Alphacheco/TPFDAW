import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "../entities/cliente.entity";
import { CreateClienteDto } from "../dtos/input/create-cliente.dto";
import { EstadosClientesEnum } from "../enums/estados-clientes.enum";
import { UpdateClienteDto } from "../dtos/input/update-cliente.dto";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Repository } from "typeorm";
import { ListClienteDTO } from "../dtos/output/list-cliente.dto";
import { BadRequestException, forwardRef, Inject } from "@nestjs/common";
import { ProyectosService } from "./proyectos.service";

@Injectable()
export class ClientesService {

    constructor(@InjectRepository(Cliente) private readonly repository: Repository<Cliente>,
        @Inject(forwardRef(() => ProyectosService)) private readonly proyectosService: ProyectosService) { }

    async crearCliente(dto: CreateClienteDto): Promise<{ id: number }> {

        const cliente: Cliente = this.repository.create(dto);
        cliente.estado = EstadosClientesEnum.ACTIVO;
        await this.repository.save(cliente);
        return { id: cliente.id };
    }

    async actualizarCliente(id: number, dto: UpdateClienteDto): Promise<void> {

        const cliente: Cliente | null = await this.repository.findOneBy({ id });

        if (!cliente) {
            throw new BadRequestException('Cliente no encontrado');
        }

        const relacionadoConProyectos: boolean = await this.proyectosService.existeProyectoPorIdCliente(id);

        if (relacionadoConProyectos && dto.estado === EstadosClientesEnum.BAJA) {
            throw new BadRequestException('No se puede dar de baja un cliente con proyectos relacionados');
        }

        this.repository.merge(cliente, dto);
        await this.repository.save(cliente);
    }

    async eliminarCliente(id: number): Promise<void> {

        const cliente: Cliente | null = await this.repository.findOneBy({ id });

        if (!cliente) {
            throw new BadRequestException('Cliente no encontrado');
        }

        const relacionadoConProyectos: boolean = await this.proyectosService.existeProyectoPorIdCliente(id);

        if (relacionadoConProyectos) {
            throw new BadRequestException('No se puede dar de baja un cliente con proyectos relacionados');
        }

        cliente.estado = EstadosClientesEnum.BAJA;
        await this.repository.save(cliente);
    }

    async obtenerClientes(
        filters: { nombre?: string; estado?: EstadosClientesEnum }
    ): Promise<ListClienteDTO[]> {

        const qb = this.repository.createQueryBuilder('cliente');

        if (filters.nombre) {
            qb.andWhere('LOWER(cliente.nombre) LIKE LOWER(:nombre)', { nombre: `%${filters.nombre}%` });
        }
        if (filters.estado) {
            qb.andWhere('cliente.estado = :estado', { estado: filters.estado });
        }

        qb.orderBy('cliente.id', 'ASC');

        const clientes = await qb.getMany();

        return clientes.map(c => {
            const dto = new ListClienteDTO();
            dto.id = c.id;
            dto.nombre = c.nombre;
            dto.telefono = c.telefono;
            dto.email = c.email;
            dto.estado = c.estado;
            return dto;
        });
    }

    async existeClienteActivoPorId(id: number): Promise<boolean> {

        const existe: boolean = await this.repository.exists({ where: { id, estado: EstadosClientesEnum.ACTIVO } });
        return existe;
    }
}