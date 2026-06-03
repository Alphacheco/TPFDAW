import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";
import { CreateUsuarioDto } from "../dtos/input/create-usuario.dto";
import { UpdateUsuarioDto } from "../dtos/input/update-usuario.dto";
import { ListUsuarioDto } from "../dtos/output/list-usuario.dto";
import { UsuariosService } from "../services/usuarios.service";

@Controller("usuarios")
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService) {}

    @ApiBearerAuth()
    @ApiOkResponse({ type: ListUsuarioDto, isArray: true })
    @UseGuards(AuthGuard)
    @Get()
    async obtenerUsuarios(): Promise<ListUsuarioDto[]> {
        return await this.usuariosService.obtenerUsuarios();
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
