import { BadRequestException, Body, Controller, NotImplementedException, Post } from "@nestjs/common";
import { LoginDto } from "../dtos/input/login.dto";
import { CreateUsuarioDto } from "../dtos/input/create-usuario.dto";
import { AuthService } from "../services/auth.service";
import { UsuariosService } from "../services/usuarios.service";

@Controller("auth")
export class AuthController{

    constructor(private readonly authService: AuthService,
        private readonly usuariosService: UsuariosService){}

    @Post("")
    async login(@Body() dto: LoginDto): Promise<{accessToken: string}>{
        return await this.authService.login(dto);
    }

    @Post("registro")
    async registro(@Body() dto: CreateUsuarioDto): Promise<{ id: number }> {
        return await this.usuariosService.crearUsuario(dto);
    }


}