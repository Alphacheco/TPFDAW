import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { EstadosUsuariosEnum } from "../enums/estados-usuarios.enum";
import { AuthGuard } from "../guards/auth.guard";
import { CreateUsuarioDto } from "../dtos/input/create-usuario.dto";
import { UpdateUsuarioDto } from "../dtos/input/update-usuario.dto";
import { ListUsuarioDto } from "../dtos/output/list-usuario.dto";
import { UsuariosService } from "../services/usuarios.service";

@Controller("usuarios")
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService) {}

    @ApiBearerAuth()
    @ApiQuery({ name: 'nombre', required: false })
    @ApiQuery({ name: 'estado', required: false, enum: EstadosUsuariosEnum })
    @UseGuards(AuthGuard)
    @Get()
    async obtenerUsuarios(
        @Query('nombre') nombre?: string,
        @Query('estado') estado?: EstadosUsuariosEnum
    ): Promise<ListUsuarioDto[]> {
        return this.usuariosService.obtenerUsuarios({ nombre, estado });
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async crearUsuario(@Body() dto: CreateUsuarioDto): Promise<{ id: number }> {
        return await this.usuariosService.crearUsuario(dto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(":id")
    async actualizarUsuario(@Param("id") id: number, @Body() dto: UpdateUsuarioDto): Promise<void> {
        await this.usuariosService.actualizarUsuario(id, dto);
    }
}
