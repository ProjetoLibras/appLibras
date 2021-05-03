import { UserPiece } from './shared/user-piece';
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
  aId: string;
  userId: string;
  userPice: UserPiece;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private scalePainService: PainScaleService,
    private afa: AngularFireAuth) { }

  ngOnInit() {
    // chamando metodo para pegar id
    this.getId()
    // Instanciando a classe
    this.scalePain = new ScalePain();
    // Instanciando a classe
    this.userPice = new UserPiece;
    // pegar na rota o id passado
    this.humanBody = this.activatedRoute.snapshot.params['id'];

    // Pegando o array para mostrar no front end
    this.pains = this.scalePainService.painScales;

    this.save()
  }
  async getUserPiece() {
    const subscribe = await this.scalePainService.getUserForId(this.userId).subscribe((data: any) => {
      subscribe.unsubscribe();
      const { name, cartaosus } = data;
      this.userPice.name = name;
      this.userPice.cartaosus = cartaosus;
    })
  }
  getId() {
    // Pegar o id do usuario
    this.afa.authState.subscribe(user => {
      this.userId = user.uid;
      // chamando o metodo de pergar ususuario
      this.getUserPiece()
    })
  }
  // Salvando os dados no array
  save() {
    this.scalePain.pain = this.humanBody;
    this.scalePain.scale = this.scale;
    this.scalePainService.save(this.scalePain);
    // this.router.navigate(['/tabs/pain'])
  }

  // deleta dados do array
  remove(id: number) {
    this.scalePainService.delete(id)
  }

  finishing() {
    // Salvando os dados no array
    this.save();
    // passar o id e chamar metodo de gravar no banco
    this.aId = this.scalePainService.addAttend(this.userId, this.pains, this.userPice)

    //Excluir Array
    this.pains.length = 0;

    //MOSTRAR  ARRAY NO LOG SE FOI LIMPO
    console.log(this.pains)

 
    //DIRECIONAR PARA PÁGINA DE SYMPTOMS
    this.router.navigate(['/tabs/symptoms', this.aId]);
    console.log(this.aId)
  }
}


