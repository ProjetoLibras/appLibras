import { User } from './shared/user';
import { DashboardService } from './shared/dashboard.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage{
  username: string;
  userid: string;
  users: User;
  hasImg: boolean = false;

  constructor (
    private dashboardservice: DashboardService,
    private afa: AngularFireAuth){}

  ngOnInit() {
    this.users = new User();
    this.afa.authState.subscribe(user =>{
        this.userid = user.uid;
         this.username = user.displayName;
        // console.log(this.userid);
        // console.log(this.username)

        if(this.userid){
          const subscribe = this.dashboardservice.getById(this.userid).subscribe( (data: any) =>{
        subscribe.unsubscribe();
        console.log(data);
        //const { name, datanascimento, cartaosus, tiposanguineo, contato, email, comorbidades, filePath, imgUrl } = data;
        this.users.name = data.name == null ? "" : data.name;
        this.users.address= data.address == null ? "" : data.address;
        this.users.address_number = data.address_number == null ? "" : data.address_number;
        this.users.address_district = data.address_district == null ? "" : data.address_district;
        this.users.address_city = data.address_city == null ? "" : data.address_city;
        this.users.address_state = data.address_state == null ? "" : data.address_state;
        this.users.cartaosus = data.cartaosus == null ? "" : data.cartaosus;
        this.users.tiposanguineo = data.tiposanguineo == null ? "" : data.tiposanguineo;
        this.users.contato = data.contato == null ? "" : data.contato;
        this.users.email = data.email == null ? "" : data.email;
        this.users.comorbidades = data.comorbidades == null ? "" : data.comorbidades;
        this.users.filePath = data.filePath == null ? "" : data.filePath;
        this.users.imgUrl = data.imgUrl == null ? "" : data.imgUrl;
        this.hasImg = this.users.imgUrl == '' ? true : false;
      });
      }
    })
 }
}
