import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pain',
  templateUrl: './pain.page.html',
  styleUrls: ['./pain.page.scss'],
})
export class PainPage implements OnInit {
  lado = 'frente';
  constructor(private router: Router) { }

  ngOnInit() {
  }
  pain(pain){
    console.log(pain)
    this.router.navigate(['/scale-pain'])
  }

  segmentChanged(event: any) {

    if (event.detail.value === 'frente') {

      this.lado = 'frente'
      // console.log(this.lado);

    } else {
      this.lado = 'costas'
      // console.log(this.lado);
    }

  }

}

