import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { ScalePain } from './scale-pain';

@Injectable({
  providedIn: 'root'
})
export class PainScaleService {
  painScales: ScalePain[] = []
  private attendCollection: AngularFirestoreCollection<ScalePain>;

  constructor(
    private afs: AngularFirestore,
  ) {
      this.attendCollection = this.afs.collection<ScalePain>('attend');
    }

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
      if(this.painScales.length > 0 ){
        const lastId = this.painScales[this.painScales.length-1].id;
        scalePain.id = lastId + 1;
      }else{
        scalePain.id = 1;
      }
      this.painScales.push(scalePain);
    }
    // console.log(this.painScales)
  }

  delete(id: number){
    const painScaleIndex = this.painScales.findIndex( (value) => value.id == id)
    this.painScales.splice(painScaleIndex, 1);
  }

  addAttend(uId: string, scaleP: any){
    // console.log(scaleP)
    const aId = this.afs.createId()
    this.afs.collection('attend').doc(aId).set(
      {
        uId: uId,
        date: new Date(),
      }
    );
    scaleP.forEach( (item, indice, array) => {
      // console.log(item, indice);
      this.attendCollection.doc<ScalePain>(aId).collection('subAttend').add({id: item.id, pain: item.pain, scale: item.scale});
    });
  }
}
