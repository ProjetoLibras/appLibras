import { CepService } from './../shared/cep.service';
import { ProfessionalService } from './../shared/professional.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersAgentesaude } from './../users/shared/users-agentesaude';
import { UsersPaciente } from './../users/shared/users-paciente';
import { ToastService } from './../shared/toast.service';
import { AuthService } from './../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ValidaCpfService } from './../shared/valida-cpf.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  usersPaciente: UsersPaciente;
  usersAgentesaude: UsersAgentesaude;
  tipousuario: string;
  email: string;
  password: string;
  user: string;
  professionals: any[] = [];

  professionalDescription: string;


  constructor(private auth:AuthService,
    private professionalService: ProfessionalService,
    private afa: AngularFireAuth,
    private cepService: CepService,
    private validaCPFService: ValidaCpfService,
    private toast: ToastService,
    private router: Router) { }

  ngOnInit() {
    this.usersPaciente = new UsersPaciente();
    this.usersAgentesaude = new UsersAgentesaude();
    this.professionalService.getAll().subscribe( (data:any) => {
      this.professionals = data;
    });
  }

  validaCPF(){
    if (this.validaCPFService.isValidCPF(this.password) == false) {
      this.toast.showMessageTop('CPF Inválido','danger');
    }
  }

  setProfessional(professional:any){
      if(professional){
        // console.log(professional);
        this.usersAgentesaude.professional = this.professionals.find(item => item.id === this.usersAgentesaude.id_professional).description
      } else {
        this.usersAgentesaude.professional = "";
      }
  }

  async registerPaciente(){
    this.usersPaciente.email = this.email;
    this.usersPaciente.password = this.password;
    // this.usersPaciente.tipousuario = this.tipousuario;

    try {
      await this.auth.registerPaciente(this.usersPaciente);
      this.toast.showMessageBottom('Usuário registrado com sucesso !!!', 'secondary');
      this.router.navigate(['login']);
    } catch (error) {
      this.toast.showMessageTop(error,'danger');
    }
  }

  getProfessional(id: string){
    const subscribe = this.professionalService.getProfessional(id).subscribe( (data: any) =>{
      subscribe.unsubscribe();
      this.usersAgentesaude.professional = data.description;
    })
  }

  async registerAgentesaude(){
    this.usersAgentesaude.email = this.email;
    this.usersAgentesaude.password = this.password;
    // this.usersAgentesaude.tipousuario = this.tipousuario;
    // this.getProfessional(this.usersAgentesaude.id_professional);

    try {
      await this.auth.registerAgente(this.usersAgentesaude);
      this.toast.showMessageBottom('Usuário registrado com sucesso !!!', 'dark-green');
      this.router.navigate(['login']);
    } catch (error) {
      this.toast.showMessageTop(error,'danger');
    }
  }

  async getCep(){
    try {
      const result = await this.cepService.getEndereco(this.usersPaciente.zipcode)
      this.popularDadosCep(result);
    } catch (error) {
      this.toast.showMessageBottom(error, 'danger');
    }
  }

  popularDadosCep(dados){
    const { cep, logradouro, complemento, bairro, localidade, uf } = dados ;
    // this.usersPaciente.address = dados.logradouro;
    this.usersPaciente.address = logradouro;
    this.usersPaciente.address_city = localidade;
    this.usersPaciente.address_district = bairro;
    this.usersPaciente.address_state = uf;
    this.usersPaciente.address_complement = complemento;
  }

}
