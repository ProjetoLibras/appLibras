import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { ScalePain } from './scale-pain';
import { UserPiece } from './user-piece';

@Injectable({
  providedIn: 'root'
})
export class PainScaleService {
  painScales: ScalePain[] = []
  private attendCollection: AngularFirestoreCollection<ScalePain>;
  private usersCollection: AngularFirestoreCollection<UserPiece>;
  constructor(
    private afs: AngularFirestore,
  ) {
      // Collection de atendimento
      this.attendCollection = this.afs.collection<ScalePain>('attend');
      // Collection de usuarios
      this.usersCollection = this.afs.collection<UserPiece>('users');
    }
  // Pegar todos
  getAll(){
    return this.painScales;
  }
  // pegar por id
  getById(id: number){
    const painScale = this.painScales.find( (value) => value.id == id);
    return painScale;
  }
  // Formatar a data
  dateFormat(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();

    let datefinally = diaF+"/"+mesF+"/"+anoF;

    return datefinally
  }
  // Pegar usuario por id
  getUserForId(id:string){
    return this.usersCollection.doc<UserPiece>(id).valueChanges();
  }
  // Savar ou dar push no array
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
  // Excluir no array
  delete(id: number){
    const painScaleIndex = this.painScales.findIndex( (value) => value.id == id)
    this.painScales.splice(painScaleIndex, 1);
  }
  // Adicionar novo
  addAttend(uId: string, scaleP: any, userPice: UserPiece){
    const { name, cartaosus } = userPice;
    const aId = this.afs.createId();
    this.afs.collection('attend').doc(aId).set(
      {
        uId: uId,
        name,
        cartaosus,
        date: this.dateFormat(),
        status: "opened"
      }
    );
    scaleP.forEach( (item, indice, array) => {
      // console.log(item, indice);
      this.attendCollection.doc<ScalePain>(aId).collection('subAttend').add({id: item.id, pain: item.pain, scale: item.scale});
    });
  }
}
