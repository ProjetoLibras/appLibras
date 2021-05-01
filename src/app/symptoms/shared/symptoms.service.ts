import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Symptoms } from './symptoms';
import { map } from 'rxjs/operators';
import { ScalePain } from 'src/app/scale-pain/shared/scale-pain';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  symptomSelected: Symptoms[] = []
  private attendCollection: AngularFirestoreCollection<ScalePain>;
  private symptomsCollection: AngularFirestoreCollection<Symptoms>;
  data: any;
  constructor(private afs: AngularFirestore,
    private storage: AngularFireStorage) {
    this.symptomsCollection = this.afs.collection<Symptoms>('symptoms');
    this.attendCollection = this.afs.collection<ScalePain>('attend');

  }

  getAll() { // buscar todos
    // return this.afs.collection('symptoms', ref => ref.orderBy('name','asc'))
    return this.afs.collection('symptoms')
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(s => {
            const id = s.payload.doc.id;
            const data = s.payload.doc.data() as Symptoms
            return { id, ...data };
          })
        })
      )
  }

  getById(id: string) { // buscar por Id
    return this.symptomsCollection.doc<Symptoms>(id).valueChanges();
  }


  delete(symptom: any) {
    const symptomIndex = this.symptomSelected.findIndex((value) => value.id == symptom.id)
    this.symptomSelected.splice(symptomIndex, 1);
  }

  save(id: string, symptom: string){
    this.symptomSelected.push({id:id, name:symptom});
  }


  addSymptom(id: string, symptom: any){
    symptom.forEach( (item, indice, array) => {
      // console.log(item, indice);
      this.attendCollection.doc<Symptoms>(id).collection('subSymptoms').add({id: item.id, name: item.name,});
    });
  }




}

