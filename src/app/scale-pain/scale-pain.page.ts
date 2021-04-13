import { ScalePain } from './../shared/scale-pain';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PainScaleService } from '../shared/pain-scale.service';


@Component({
  selector: 'app-scale-pain',
  templateUrl: './scale-pain.page.html',
  styleUrls: ['./scale-pain.page.scss'],
})
export class ScalePainPage implements OnInit {
  humanBody: string;
  scalePain: ScalePain;
  scale: string

  scalePains: ScalePain;

// public painsScale = [
//   {id: 1, scale: '', pain: ''}
// ]
  // Exatrair o dados da variavel e colocar no array
  // save(){
  //   const lastId = this.painsScale[this.painsScale.length-1].id;
  //   this.painsScale.push({
  //     id: lastId + 1,
  //     pain: this.humanBody,
  //     scale: this.scales
  //   })
  //   console.log(this.painsScale)
  //   this.router.navigate(['/tabs/pain'])
  // }

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private scalePainService: PainScaleService) { }

  ngOnInit() {
    this.scalePain = new ScalePain();

    this.humanBody = this.activatedRoute.snapshot.params['id'];
  }
  save(){
    this.scalePain.pain = this.humanBody;
    this.scalePain.scale = this.scale;
    this.scalePainService.save(this.scalePain);
    this.router.navigate(['/tabs/pain'])
  }
}


