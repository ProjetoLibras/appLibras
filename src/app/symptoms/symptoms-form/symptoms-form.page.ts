import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Symptoms } from '../shared/symptoms';
import { SymptomsService } from './../shared/symptoms.service';
import { ToastService } from './../../shared/toast.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-symptoms-form',
  templateUrl: './symptoms-form.page.html',
  styleUrls: ['./symptoms-form.page.scss'],
})
export class SymptomsFormPage implements OnInit {
  symptoms: Symptoms;
  symptomsId: string = '';
  private file: File = null;

  title: string;
  filePath: string = ''; // caminho do storage, a pasta que será gravada
  imgUrl: string = ''; // url da imagem, <img [src]="imgUrl">
  hasImg: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private symptomsService: SymptomsService,
              private storage: AngularFireStorage,
              private router: Router,
              private toast: ToastService) { }

  ngOnInit() {
    this.symptoms = new Symptoms();
    this.symptoms.name = "";
    this.symptoms.description = "";

    this.symptomsId = this.activatedRoute.snapshot.params['id'];
    this.symptomsId ? this.title = "EDITAR Sintoma" : this.title = "NOVO Sintoma";

    if(this.symptomsId){
       const subscribe = this.symptomsService.getById(this.symptomsId).subscribe( (data: any) =>{
        subscribe.unsubscribe();
        const { name, description, imgUrl, filePath } = data;
        this.symptoms.name = name;
        this.symptoms.description = description;
        this.filePath = filePath;
        this.imgUrl = imgUrl;
        this.hasImg = this.imgUrl == '' ? false : true;
      })
    }

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
       await this.symptomsService.removerImg(id, filePath);
       this.imgUrl = '';
       this.filePath = '';
       this.hasImg = false;
     } catch (error) {
       this.toast.showMessageTop(error,'danger');
     }
  }

  async onSubmit(){
    // console.log(this.symptoms)

    if (this.symptomsId){
      // update
      try {
        await this.symptomsService.updateSymptoms(this.symptoms, this.symptomsId, this.file);
        // mensagem OK
        this.toast.showMessageBottom('Sintoma alterado com sucesso!!!','success')
        this.router.navigate(['/symptoms-list']);
      } catch (error) {
        // mensagem error
        this.toast.showMessageTop(error, 'danger');
        console.log(error);
      }

    } else {
      // add
      try {
        await this.symptomsService.addSymptoms(this.symptoms, this.file);
        // mensagem OK
        this.toast.showMessageBottom('Sintoma inserido com sucesso!!!','success')
        this.router.navigate(['/symptoms-list']);
      } catch (error) {
        // mensagem error
        this.toast.showMessageTop(error, 'danger');
        console.log(error);
      }

    }
  }

}
