import { Attendlist } from './attendlist';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Attend } from 'src/app/medicament/attend';

@Injectable({
  providedIn: 'root'
})
export class AttendlistService {
  private attendListCollection: AngularFirestoreCollection<Attendlist>;

  constructor(private afs: AngularFirestore) {
    this.attendListCollection = this.afs.collection<Attendlist>('attend');
  }

  getByUserAttend(idUser: string) {
    return this.afs.collection('attend', ref => ref.where('uId', '==', idUser))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(s => {
            const id = s.payload.doc.id;
            const data = s.payload.doc.data() as Attendlist
            return { id, ...data };
          })
        })
      )
  }
}
