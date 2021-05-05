import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../dashboard/shared/user';
import { Medicament } from './medicament';
import { ActivatedRoute } from '@angular/router';
import { Attend } from './attend';
import { MedicamentService } from './medicament.service';

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.page.html',
  styleUrls: ['./medicament.page.scss'],
})
export class MedicamentPage implements OnInit {
  attend: Attend;
  attendId: string;
  username: string;
  uId: string;
  users: User;
  medicaments: Medicament;
  medicament: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private medicamentService: MedicamentService,
    private afa: AngularFireAuth
  ) { }

  ngOnInit() {
    this.medicaments = new Medicament();

    this.attendId = this.activatedRoute.snapshot.params['id'];
    if (this.attendId) {
      const subscribe = this.medicamentService.getAllSubMedicament(this.attendId).subscribe((data: any) => {
        subscribe.unsubscribe();
        console.log(data)
        this.medicament = data;


      })

    }
  }

}
