import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "./auth-store";

export const authGuard: CanActivateFn = (route, state) => {
    const authStore = inject(AuthStore);
    const router = inject(Router);

    const token = authStore.obtenerToken();

    if (token && token.length > 0) {
        return true;
    } else {
        router.navigateByUrl('/login');
        return false;
    }
};
