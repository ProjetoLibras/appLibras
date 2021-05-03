import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../shared/alert.service';
import { ToastService } from '../shared/toast.service';
import { Symptoms } from './shared/symptoms';
import { SymptomsService } from './shared/symptoms.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})
export class SymptomsPage implements OnInit {
  symptom: Symptoms;
  symptomSelect: Symptoms[] = []
  symptomSelected: Symptoms[] = []
  aId: string;
  data: any;
  symptoms: Observable<any[]>;
  constructor(private symptomsService: SymptomsService,
    private toast: ToastService,
    private alert: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getAll();
    this.symptom = new Symptoms();
    // pegar o id do usuario
    this.aId = this.activatedRoute.snapshot.params['id'];
  }

  getAll() {
    this.symptoms = this.symptomsService.getAll();
  }

  onClick(id: string) {
    const subscribe = this.symptomsService.getById(id).subscribe((data: any) => {
      subscribe.unsubscribe();
      const { name, idname, description, imgUrl, filePath } = data;
      this.symptom.id = id;
      this.symptom.name = name;
      this.symptom.description = description;
      this.symptom = data;
      // service
      // this.save(id, this.symptom.name);
      this.symptomSelected.push({ id: id, name: this.symptom.name });
      console.log(this.symptomSelected)
    })

  }

  delete(symptom: any) {
    const symptomIndex = this.symptomSelected.findIndex((value) => value.id == symptom.id)
    this.symptomSelected.splice(symptomIndex, 1);
  }

  finishing() {
    this.symptomsService.addSymptom(this.aId, this.symptomSelected);

    //LIMPAR ARRAY
    this.symptomSelected.length = 0;

    //MOSTRAR  ARRAY NO LOG SE FOI LIMPO
    console.log(this.symptomSelected)

    //Mostrar Toast
    this.toast.showMessageBottom('Atendimento Finalizado', 'dark-green');


    //DIRECIONAR PARA PÁGINA DE SYMPTOMS
    this.router.navigate(['/tabs/pain']);
    

  }

}
