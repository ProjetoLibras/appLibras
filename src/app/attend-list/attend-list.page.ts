import { AttendlistService } from './shared/attendlist.service';
import { Attendlist } from './shared/attendlist';
import { Component, OnInit } from '@angular/core';
import { User } from '../dashboard/shared/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attend-list',
  templateUrl: './attend-list.page.html',
  styleUrls: ['./attend-list.page.scss'],
})
export class AttendListPage implements OnInit {
  attendlist: Attendlist;
  attendId: string;
  attend: any[] = [];
  // attend: Observable<any[]>;
  username: string;
  uId: string;
  users: User;


  constructor(  private attendlistService: AttendlistService, private afa: AngularFireAuth) {

  }

  ngOnInit() {
    this.users = new User();

    this.afa.authState.subscribe(user =>{
        this.uId = user.uid;
        console.log(this.uId);
        const subscribe = this.attendlistService.getByUserAttend(this.uId).subscribe((data: any) => {
          subscribe.unsubscribe();
          // console.log(data);
          this.attend = data;
          // console.log(this.attend)
        })
    })

  }

}
