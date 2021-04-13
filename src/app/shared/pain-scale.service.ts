import { Injectable } from '@angular/core';
import { ScalePain } from './scale-pain';

@Injectable({
  providedIn: 'root'
})
export class PainScaleService {

  painScales: ScalePain[] = [
    { id: 1, scale: '', pain: '' },

  ]

  constructor() { }

  getAll(){
    return this.painScales;
  }

  getById(id: number){
    const painScale = this.painScales.find( (value) => value.id == id);
    return painScale;
  }

  save(scalePain: ScalePain){
    if (scalePain.id){
      const scalePainArr = this.getById(scalePain.id);
      scalePainArr.scale = scalePain.scale;
      scalePainArr.pain = scalePain.pain;
    } else {
      const lastId = this.painScales[this.painScales.length-1].id;
      scalePain.id = lastId + 1;
      this.painScales.push(scalePain);
    }
    console.log(this.painScales)
  }
}
