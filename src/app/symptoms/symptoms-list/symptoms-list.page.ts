import { AlertService } from './../../shared/alert.service';
import { Component, OnInit } from '@angular/core';
import { SymptomsService } from './../shared/symptoms.service';
import { Observable } from 'rxjs';
import { ToastService } from './../../shared/toast.service';

@Component({
  selector: 'app-symptoms-list',
  templateUrl: './symptoms-list.page.html',
  styleUrls: ['./symptoms-list.page.scss'],
})
export class SymptomsListPage implements OnInit {
  symptoms: Observable<any[]>;
  symptomsId: string;
  constructor(private symptomsService:SymptomsService,
              private toast:ToastService,
              private alert:AlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.symptoms = this.symptomsService.getAll();
  }

  // aqui chama o alert pra confirmar a exclusão
  removeSymptom(symptom: any){

    this.alert.showConfirmarExclusão(symptom.name, ()=> this.remove(symptom) );
  }

  // aqui chama o servico passando (id) para o delete no banco
  remove(symptom: any){
    this.symptomsService.deleteSymptoms(symptom.id, symptom.filePath );
    try {
      this.toast.showMessageBottom('Sintoma excluído com sucesso!','success');
      this.getAll();
    } catch (error) {
      this.toast.showMessageTop(error,'danger')
    }

  }

}
