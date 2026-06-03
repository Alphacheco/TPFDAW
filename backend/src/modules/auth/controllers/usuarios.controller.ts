import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateUsuarioDto } from "../dtos/input/create-usuario.dto";
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { ListUsuarioDTO } from "../dtos/output/list-usuario.dto";
import { UpdateUsuarioDto } from "../dtos/input/update-usuario.dto";
import { EstadosUsuariosEnum } from "../enums/estados-usuarios.enum";
import { UsuariosService } from "../services/usuarios.service";
import { AuthGuard } from "../guards/auth.guard";

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService) { }

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

    @ApiBearerAuth()
    @ApiOkResponse({ type: ListUsuarioDTO, isArray: true })
    @ApiQuery({
        name: 'estado',
        required: false,
        enum: EstadosUsuariosEnum
    })
    @UseGuards(AuthGuard)
    @Get()
    async obtenerUsuarios(@Query("estado") estado: EstadosUsuariosEnum): Promise<ListUsuarioDTO[]> {
        return await this.usuariosService.obtenerUsuarios(estado);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(":id")
    async eliminarUsuario(@Param("id") id: number): Promise<void> {
        await this.usuariosService.eliminarUsuario(id);
    }

}
