import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pain',
  templateUrl: './pain.page.html',
  styleUrls: ['./pain.page.scss'],
})
export class PainPage implements OnInit {
  lado = 'frente';
  constructor() { }

  ngOnInit() {
  }
  pain(pain){
    console.log(pain)
  }

open(num){
    //abrir modal
    // document
    // .querySelector('.pains')
    // .classList
    // .remove('active')
    console.log(num)
}
close(){
    //fechar modal
    document
    .querySelector('.pains')
    .classList
    .add('active')
}


}

