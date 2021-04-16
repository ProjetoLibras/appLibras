import { User } from './user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
 private usersCollections: AngularFirestoreCollection<User>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
   this.usersCollections = this.afs.collection<User>('users');
  }

  //getAll(){
   //return this.afs.collection('users').snapshotChanges().pipe(map(changes => {
     //return changes.map( u => {
     //  const id = u.payload.doc.id;
     //  const data = u.payload.doc.data() as Dashboard
     // return { id, ...data };
   // })}))
 // }

  getById(id: string){
    return this.usersCollections.doc<User>(id).valueChanges();
 }
}
