import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Login } from './../users/shared/login';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../shared/toast.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: Login;
  private loading: any;

  constructor(private auth:AuthService,
    private toast: ToastService,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.login = new Login();
  }

  async signIn(){
    await this.presentLoading();

    try {
      await this.auth.login(this.login);
      this.toast.showMessageBottom('Usuário logado!!!', 'secondary');
      this.router.navigate(['tabs']);
    } catch (error) {
      // this.toast.showMessageTop(error,'danger');
      this.messageError(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async resetPassword(){
    await this.presentLoading();
    try {
      await this.auth.resetPassword(this.login);
      this.toast.showMessageTop('Envio do e-mail para recuperar senha com sucesso!','success');
    } catch (error) {
      this.messageError(error);
    } finally{
      this.loading.dismiss();
    }
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...'});
    return this.loading.present();
  }


  messageError(error:any){
    let message = '';
    if (error.code = 'auth/wrong-password') {
      message = 'A senha é inválida ou o usuário não possui uma senha.';
    } else if (error.code = 'auth/invalid-email') {
      message = 'O e-mail informado é inválido';
    } else if (error.code = 'auth/user-not-found') {
      message = 'O usuário/senha inválido(s)';
    } else {
      message = error;
    }

    this.toast.showMessageTop(message,'danger');

  }

}
