import { AngularFireAuth } from '@angular/fire/auth';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PainScaleService } from './shared/pain-scale.service';
import { ScalePain } from './shared/scale-pain';


@Component({
  selector: 'app-scale-pain',
  templateUrl: './scale-pain.page.html',
  styleUrls: ['./scale-pain.page.scss'],
})
export class ScalePainPage implements OnInit {
  humanBody: string;
  scalePain: ScalePain;
  scale: string;
  pains: any[];
  userId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private scalePainService: PainScaleService,
              private afa: AngularFireAuth) { }

  ngOnInit() {
    // Instanciando a classe
    this.scalePain = new ScalePain();
    // pegar na rota o id passado
    this.humanBody = this.activatedRoute.snapshot.params['id'];

    // Pegando o array para mostrar no front end
    this.pains = this.scalePainService.painScales;

    // Pegar o id do usuario
    this.afa.authState.subscribe(user => {
      this.userId = user.uid;
      // console.log(this.userid);
    })
    this.save()
  }
  // Salvando os dados no array
  save(){
    this.scalePain.pain = this.humanBody;
    this.scalePain.scale = this.scale;
    this.scalePainService.save(this.scalePain);
    // this.router.navigate(['/tabs/pain'])
  }

  // deleta dados do array
  remove(id: number){
    this.scalePainService.delete(id)
  }

  finishing(){
      // Salvando os dados no array
      this.save();
      // passar o id e chamar metodo de gravar no banco
      this.scalePainService.addAttend(this.userId, this.pains)
  }
}


