import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { UsuarioService } from "./services/usuario/usuario.service";

export const CanActivateUsuarioLogadoNaoAdmin = () => {
  const router = inject(Router);

  if (UsuarioService.usuarioLogado && !UsuarioService.usuarioLogado.administrador) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}

export const CanActivateUsuarioAdminLogado = () => {
  const router = inject(Router);

  if (UsuarioService.usuarioLogado && UsuarioService.usuarioLogado.administrador) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}

export const CanActivateUsuarioLogado = () => {
  const router = inject(Router);

  if (UsuarioService.usuarioLogado) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
