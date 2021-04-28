import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UsersPaciente } from 'src/app/users/shared/users-paciente';

@Injectable({
  providedIn: 'root'
})
export class EditarusuariosService {
  private usersCollections: AngularFirestoreCollection<UsersPaciente>;


  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage

  ) {
    this.usersCollections = this.afs.collection<UsersPaciente>('users');

   }
   getById(id: string){
    return this.usersCollections.doc<UsersPaciente>(id).valueChanges();
 }

 updateusers(User: UsersPaciente, id: string, file: File){
  this.usersCollections.doc<UsersPaciente>(id).update(Object.assign({}, User));

   if(file){
    this.uploadImg(id, file);
  }

 }

uploadImg(id: string, file: File){
  // /symptoms/id/file.name

  const filePath = `users/${id}/${file.name}`;
   const ref = this.storage.ref(filePath);
   const taks = ref.put(file);
   taks.snapshotChanges().pipe(
     finalize( ()=> {
       ref.getDownloadURL().subscribe( (url: any) => {
         this.usersCollections.doc<UsersPaciente>(id).update({ imgUrl: url, filePath: filePath })
       })
     })
   ).subscribe();
}

removerImg(id: string, filePath: string, atualizarusers: boolean = true){
  const ref = this.storage.ref(filePath);
  ref.delete();
  if(atualizarusers){
    this.usersCollections.doc<UsersPaciente>(id).update({ imgUrl: '', filePath: ''});
  }
}
}
