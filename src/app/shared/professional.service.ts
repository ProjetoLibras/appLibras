import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Professional } from './professional';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private professionalCollection: AngularFirestoreCollection<Professional>;

  constructor(private afs: AngularFirestore){
      this.professionalCollection = this.afs.collection<Professional>('professional');
  }

   getAll(){ // buscar todos
      // return this.afs.collection('professional', ref => ref.orderBy('name','asc'))
      return this.afs.collection('professional')
        .snapshotChanges().pipe(
          map( changes => {
            return changes.map( p => {
              const id = p.payload.doc.id;
              const data = p.payload.doc.data() as Professional
              return { id, ...data };
            })
          })
        )
   }

   getProfessional(id: string){
    return this.professionalCollection.doc<Professional>(id).valueChanges();
  }
}
