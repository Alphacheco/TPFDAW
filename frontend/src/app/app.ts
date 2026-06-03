import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthStore } from './auth/auth-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [MessageService]
})
export class App {

  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly router: Router = inject(Router);

  mostrarFooter(): boolean {
    return !this.router.url.startsWith('/login');
  }

  logout(): void {
    this.authStore.cerrarSesion();
  }

}
