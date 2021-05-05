import { ActivatedRoute, Router } from '@angular/router';
import { Medicament } from './medicament';
import { Component, OnInit } from '@angular/core';
import { MedicamentService } from './medicament.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastService } from '../shared/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.page.html',
  styleUrls: ['./medicament.page.scss'],
})
export class MedicamentPage implements OnInit {
  medicament: Observable<any[]>;
  private medicamentId: string = '';
  title: string;

  constructor(private activatedRoute: ActivatedRoute,
              private medicamentService: MedicamentService,
              private storage: AngularFireStorage,
              private router: Router,
              private toast: ToastService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.medicament = this.medicamentService.getAll();
  }

}
