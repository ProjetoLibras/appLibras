import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
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
        // else {
        //   //
        //   this.afa.authState.subscribe(user =>{
        //     this.userid = user.uid;
        //     this.username = user.displayName;
        //     console.log(this.userid);
        //     console.log(this.username)
        //   })
        // }

      })
    )


    true;
  }

}
