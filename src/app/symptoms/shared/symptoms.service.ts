import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Symptoms } from './symptoms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  symptomSelected: Symptoms[] = []
  private symptomsCollection: AngularFirestoreCollection<Symptoms>;

  constructor(private afs: AngularFirestore,
    private storage: AngularFireStorage) {
    this.symptomsCollection = this.afs.collection<Symptoms>('symptoms');

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
}

