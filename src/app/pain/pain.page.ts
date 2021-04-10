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

  segmentChanged(event: any) {

    if (event.detail.value === 'frente') {

      this.lado = 'frente'
      console.log(this.lado);

    } else {
      this.lado = 'costas'
      console.log(this.lado);
    }

  }

}

