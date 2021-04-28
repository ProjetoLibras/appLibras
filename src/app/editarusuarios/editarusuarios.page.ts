import { UsersPaciente } from './../users/shared/users-paciente';
import { EditarusuariosService } from './shared/editarusuarios.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-editarusuarios',
  templateUrl: './editarusuarios.page.html',
  styleUrls: ['./editarusuarios.page.scss'],
})
export class EditarusuariosPage implements OnInit {

  username: string;
  userid: string;
  Users: UsersPaciente;
  private file: File = null;

  title: string;
  filePath: string = ''; // caminho do storage, a pasta que será gravada
  imgUrl: string = ''; // url da imagem, <img [src]="imgUrl">
  hasImg: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private afa: AngularFireAuth,
    private editarusuariosService: EditarusuariosService,
    private router: Router,
    private toast: ToastService

  ) { }

  ngOnInit() {
    this.Users = new UsersPaciente();
    this.afa.authState.subscribe(user =>{
        this.userid = user.uid;
         this.username = user.displayName;
        // console.log(this.userid);
        // console.log(this.username)

        //this.userid = this.activatedRoute.snapshot.params['id'];
        //this.userid ? this.title = "EDITAR Usuario";

        if(this.userid){
          const subscribe = this.editarusuariosService.getById(this.userid).subscribe( (data: any) =>{
        subscribe.unsubscribe();
        console.log(data);
        //const { name, datanascimento, cartaosus, tiposanguineo, contato, email, comorbidades, filePath, imgUrl } = data;
        this.Users.name = data.name == null ? "" : data.name;
        this.Users.address= data.address == null ? "" : data.address;
        this.Users.address_number = data.address_number == null ? "" : data.address_number;
        this.Users.address_district = data.address_district == null ? "" : data.address_district;
        this.Users.address_city = data.address_city == null ? "" : data.address_city;
        this.Users.address_state = data.address_state == null ? "" : data.address_state;
        this.Users.cartaosus = data.cartaosus == null ? "" : data.cartaosus;
        this.Users.tiposanguineo = data.tiposanguineo == null ? "" : data.tiposanguineo;
        this.Users.contato = data.contato == null ? "" : data.contato;
        this.Users.email = data.email == null ? "" : data.email;
        this.Users.faixaetaria = data.faixaetaria == null ? "" : data.faixaetaria;
        this.Users.sexo = data.sexo == null ? "" : data.sexo;
        this.Users.datanascimento = data.datanascimento == null ? "" : data.datanascimento;
        this.Users.zipcode = data.zipcode == null ? "" : data.zipcode;
        this.Users.address_complement = data.address_complement == null ? "" : data.address_complement;
        this.Users.comorbidades = data.comorbidades == null ? "" : data.comorbidades;
        this.Users.filePath = data.filePath == null ? "" : data.filePath;
        this.Users.imgUrl = data.imgUrl == null ? "" : data.imgUrl;
        this.hasImg = this.Users.imgUrl == '' ? false : true;
      });
      }
    })
 }

  upload(event: any){
    if(event.target.files.length){
      this.file = event.target.files[0];
    } else {
      this.file = null;
    }
  }

  async removerImg(id: string, filePath: string){
    try {
      await this.editarusuariosService.removerImg(id, filePath);
      this.Users.imgUrl = '';
      this.Users.filePath = '';
      this.hasImg = false;
    } catch (error) {
      this.toast.showMessageTop(error,'danger');
      console.log(error)
    }
 }

  async onSubmit(){
    // console.log(this.symptoms)
    if (this.userid){
    // update
    try {
      await this.editarusuariosService.updateusers(this.Users, this.userid, this.file);
      // mensagem OK
      this.toast.showMessageBottom('Usuario alterado com sucesso!!!','success')
      this.router.navigate(['/tabs/dashboard']);
    } catch (error) {
      // mensagem error
      this.toast.showMessageTop(error, 'danger');
      console.log(error);
    }
  }



  }

}
