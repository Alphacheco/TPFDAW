import { InjectRepository } from "@nestjs/typeorm";
import { CreateProyectoDto } from "../dtos/input/create-proyecto.dto";
import { Proyecto } from "../entities/proyecto.entity";
import { Not, Repository } from "typeorm";
import { EstadosProyectosEnum } from "../enums/estados-proyectos.enum";
import { UpdateProyectoDto } from "../dtos/input/update-proyecto.dto";
import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { ListProyectoDTO } from "../dtos/output/list-proyecto.dto";
import { ProyectoDTO } from "../dtos/output/proyecto.dto";
import { ListTareaDTO } from "../dtos/output/list-tarea.dto";
import { ClientesService } from "./clientes.service";
import { ListClienteDTO } from "../dtos/output/list-cliente.dto";

@Injectable()
export class ProyectosService {

    constructor(@InjectRepository(Proyecto) private readonly repository: Repository<Proyecto>,
        @Inject(forwardRef(() => ClientesService)) private readonly clientesService: ClientesService) { }

    async crearProyecto(dto: CreateProyectoDto): Promise<{ id: number }> {

        const proyecto: Proyecto = this.repository.create({
            ...dto,
            estado: dto.estado as EstadosProyectosEnum
        })
        if (dto.idCliente) {

            const clienteActivo: boolean = await this.clientesService.existeClienteActivoPorId(dto.idCliente);

            if (!clienteActivo) {
                throw new BadRequestException('Se debe especificar un cliente activo para el proyecto');
            }
        }

        await this.repository.save(proyecto);
        return { id: proyecto.id };
    }

    async actualizarProyecto(id: number, dto: UpdateProyectoDto): Promise<void> {

        const proyecto: Proyecto | null = await this.repository.findOne({ where: { id }, relations: ['cliente'] });

        if (!proyecto) {
            throw new BadRequestException('Proyecto no encontrado');
        }

        if (dto.idCliente) {

            const clienteActivo: boolean = await this.clientesService.existeClienteActivoPorId(dto.idCliente);

            if (!clienteActivo) {
                throw new BadRequestException('Se debe especificar un cliente activo para el proyecto');
            }

        }

        this.repository.merge(proyecto, dto);

        await this.repository.save(proyecto);
    }

    async obtenerProyectos(
        filters: { nombre?: string; estado?: EstadosProyectosEnum; nombreCliente?: string }
    ): Promise<ListProyectoDTO[]> {

        const qb = this.repository.createQueryBuilder('proyecto')
            .leftJoinAndSelect('proyecto.cliente', 'cliente');

        if (filters.nombre) {
            qb.andWhere('LOWER(proyecto.nombre) LIKE LOWER(:nombre)', { nombre: `%${filters.nombre}%` });
        }
        if (filters.estado) {
            qb.andWhere('proyecto.estado = :estado', { estado: filters.estado });
        }
        if (filters.nombreCliente) {
            qb.andWhere('LOWER(cliente.nombre) LIKE LOWER(:nombreCliente)', { nombreCliente: `%${filters.nombreCliente}%` });
        }

        qb.orderBy('proyecto.id', 'ASC');

        const proyectos = await qb.getMany();

        return proyectos.map(p => {
            const dto = new ListProyectoDTO();
            dto.id = p.id;
            dto.nombre = p.nombre;
            dto.estado = p.estado;
            if (p.cliente) {
                dto.cliente = new ListClienteDTO();
                dto.cliente.id = p.cliente.id;
                dto.cliente.nombre = p.cliente.nombre;
                dto.cliente.estado = p.cliente.estado;
            }
            return dto;
        });

    }

    async obtenerProyecto(id: number): Promise<ProyectoDTO> {

        const proyecto: Proyecto | null = await this.repository.findOne({ where: { id }, relations: ['cliente', 'tareas'], order: { tareas: { id: 'ASC' } } });

        if (!proyecto) {
            throw new BadRequestException('Proyecto no encontrado');
        }

        const dto = new ProyectoDTO();
        dto.nombre = proyecto.nombre;
        dto.estado = proyecto.estado;
        if (proyecto.cliente) {
            dto.cliente = proyecto.cliente.nombre;
        }
        const tareas: ListTareaDTO[] = [];
        for (const t of proyecto.tareas) {
            const tareaDto = new ListTareaDTO();
            tareaDto.id = t.id;
            tareaDto.descripcion = t.descripcion;
            tareaDto.estado = t.estado;
            tareas.push(tareaDto);
        }

        dto.tareas = tareas;

        return dto;

    }

    async exportarCSV(): Promise<string> {

        const proyectos: Proyecto[] = await this.repository.find({ relations: ['cliente'], order: { id: 'ASC' } });

        const encabezado: string = 'id,nombre,estado,cliente\n';

        const filas: string[] = proyectos.map((proyecto) => {
            const nombreCliente: string = proyecto.cliente ? proyecto.cliente.nombre : 'Proyecto interno';
            return [
                proyecto.id.toString(),
                this.escaparCSV(proyecto.nombre),
                this.escaparCSV(proyecto.estado),
                this.escaparCSV(nombreCliente)
            ].join(',');
        });

        return encabezado + filas.join('\n');
    }

    private escaparCSV(valor: string): string {

        const valorNormalizado: string = (valor ?? '').replace(/\r?\n|\r/g, ' ');
        const valorEscapado: string = valorNormalizado.replace(/"/g, '""');
        return `"${valorEscapado}"`;
    }

    async existeProyectoPorIdCliente(idCliente: number): Promise<boolean> {

        const existe: boolean = await this.repository.exists({
            where: { cliente: { id: idCliente }, estado: Not(EstadosProyectosEnum.BAJA) }
        });

        return existe;
    }

}