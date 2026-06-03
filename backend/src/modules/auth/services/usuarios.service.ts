import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entitites/usuario.entity";
import { Repository } from "typeorm";
import { EstadosUsuariosEnum } from "../enums/estados-usuarios.enum";
import { CreateUsuarioDto } from "../dtos/input/create-usuario.dto";
import { UpdateUsuarioDto } from "../dtos/input/update-usuario.dto";
import { ListUsuarioDto } from "../dtos/output/list-usuario.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsuariosService {

    constructor(@InjectRepository(Usuario) private readonly usuariosRespository: Repository<Usuario>) { }

    async buscarUsuarioActivoPorNombre(nombre: string): Promise<Usuario | null> {

        return await this.usuariosRespository.findOneBy({ estado: EstadosUsuariosEnum.ACTIVO, nombre });

    }

    async obtenerUsuarios(): Promise<ListUsuarioDto[]> {
        const usuarios = await this.usuariosRespository.find({
            select: { id: true, nombre: true, estado: true },
            order: { id: "ASC" },
        });

        return usuarios.map((u) => ({
            id: u.id,
            nombre: u.nombre,
            estado: u.estado,
        }));
    }

    async crearUsuario(dto: CreateUsuarioDto): Promise<{ id: number }> {
        const existente = await this.usuariosRespository.findOneBy({ nombre: dto.nombre });

        if (existente) {
            throw new BadRequestException("Ya existe un usuario con ese nombre");
        }

        const hashedPassword = bcrypt.hashSync(dto.clave, 10);

        const usuario = this.usuariosRespository.create({
            nombre: dto.nombre,
            clave: hashedPassword,
            estado: dto.estado ?? EstadosUsuariosEnum.ACTIVO,
        });

        await this.usuariosRespository.save(usuario);

        return { id: usuario.id };
    }

    async actualizarUsuario(id: number, dto: UpdateUsuarioDto): Promise<void> {
        const usuario = await this.usuariosRespository.findOneBy({ id });

        if (!usuario) {
            throw new BadRequestException("Usuario no encontrado");
        }

        if (dto.nombre && dto.nombre !== usuario.nombre) {
            const existente = await this.usuariosRespository.findOneBy({ nombre: dto.nombre });
            if (existente) {
                throw new BadRequestException("Ya existe un usuario con ese nombre");
            }
        }

        if (dto.clave) {
            dto.clave = bcrypt.hashSync(dto.clave, 10);
        }

        this.usuariosRespository.merge(usuario, dto);
        await this.usuariosRespository.save(usuario);
    }
}