import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  username: string;
  userid: string;

  constructor(
    private router: Router,
    private afa: AngularFireAuth,
    private authService: AuthService,
    private toast: ToastService
  ){}



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    return this.afa.user.pipe( //pipeline de execução
      take(1), //pega 1 usuário
      map(user => !!user), // mapeamento do usuário
      tap(usuarioLogado =>{ // comparação do usuário
        if(!usuarioLogado){
          this.router.navigate(['/login']);
          this.toast.showMessageTop('Usuário não logado!!!', 'warning');
        }
        else {
          this.afa.authState.subscribe(user =>{
            if (user.uid) {
            this.authService.getById(user.uid).subscribe( (data: any) =>{
              if (data.tipousuario =='agentesaude'){
                this.router.navigate(['/login']);
                this.toast.showMessageTop('Usuário Agente de Saúde sem permissão!!!', 'danger');
              }
            })
          }
          })
        }

      })
    )


    true;
  }

}
