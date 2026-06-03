import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entitites/usuario.entity";
import { Repository } from "typeorm";
import { EstadosUsuariosEnum } from "../enums/estados-usuarios.enum";
import { CreateUsuarioDto } from "../dtos/input/create-usuario.dto";
import { UpdateUsuarioDto } from "../dtos/input/update-usuario.dto";
import { ListUsuarioDTO } from "../dtos/output/list-usuario.dto";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

    constructor(@InjectRepository(Usuario) private readonly usuariosRespository: Repository<Usuario>) { }

    async buscarUsuarioActivoPorNombre(nombre: string): Promise<Usuario | null> {

        return await this.usuariosRespository.findOneBy({ estado: EstadosUsuariosEnum.ACTIVO, nombre });

    }

    async crearUsuario(dto: CreateUsuarioDto): Promise<{ id: number }> {
        const existingUser = await this.usuariosRespository.findOneBy({ nombre: dto.nombre });
        if (existingUser) {
            throw new BadRequestException('Ya existe un usuario con ese nombre');
        }

        const hashedPassword = await bcrypt.hash(dto.clave, 10);
        
        const usuario: Usuario = this.usuariosRespository.create({
            nombre: dto.nombre,
            clave: hashedPassword,
            estado: EstadosUsuariosEnum.ACTIVO
        });
        
        await this.usuariosRespository.save(usuario);
        return { id: usuario.id };
    }

    async actualizarUsuario(id: number, dto: UpdateUsuarioDto): Promise<void> {
        const usuario: Usuario | null = await this.usuariosRespository.findOneBy({ id });

        if (!usuario) {
            throw new BadRequestException('Usuario no encontrado');
        }

        if (dto.nombre && dto.nombre !== usuario.nombre) {
            const existingUser = await this.usuariosRespository.findOneBy({ nombre: dto.nombre });
            if (existingUser) {
                throw new BadRequestException('Ya existe un usuario con ese nombre');
            }
        }

        if (dto.clave) {
            dto.clave = await bcrypt.hash(dto.clave, 10);
        }

        this.usuariosRespository.merge(usuario, dto);
        await this.usuariosRespository.save(usuario);
    }

    async obtenerUsuarios(estado?: EstadosUsuariosEnum): Promise<ListUsuarioDTO[]> {
        const whereCondition = estado ? { estado } : {};
        
        const usuarios: Usuario[] = await this.usuariosRespository.find({
            select: { id: true, nombre: true, estado: true },
            order: { id: 'ASC' },
            where: whereCondition
        });

        const dtoList: ListUsuarioDTO[] = [];

        for (const u of usuarios) {
            const dto = new ListUsuarioDTO();
            dto.id = u.id;
            dto.nombre = u.nombre;
            dto.estado = u.estado;
            dtoList.push(dto);
        }

        return dtoList;
    }

    async eliminarUsuario(id: number): Promise<void> {
        const usuario: Usuario | null = await this.usuariosRespository.findOneBy({ id });

        if (!usuario) {
            throw new BadRequestException('Usuario no encontrado');
        }

        await this.usuariosRespository.delete(id);
    }
}