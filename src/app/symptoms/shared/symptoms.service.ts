import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Symptoms } from './symptoms';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  private symptomsCollection: AngularFirestoreCollection<Symptoms>;

  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage){
      this.symptomsCollection = this.afs.collection<Symptoms>('symptoms');

  }

  getAll(){ // buscar todos
    // return this.afs.collection('symptoms', ref => ref.orderBy('name','asc'))
    return this.afs.collection('symptoms')
      .snapshotChanges().pipe(
        map( changes => {
          return changes.map( s => {
            const id = s.payload.doc.id;
            const data = s.payload.doc.data() as Symptoms
            return { id, ...data };
          })
        })
      )
 }

 getById(id: string){ // buscar por Id
    return this.symptomsCollection.doc<Symptoms>(id).valueChanges();
 }


 addSymptoms(symptoms: Symptoms, file: File){
    // 1 momento
    //this.afs.collection('symptoms').doc().set(Object.assign({}, symptoms))

    // return this.symptomsCollection.add(symptoms);

    // 2 momento
    // criar id
     const id = this.afs.createId();
     const { name, description } = symptoms;

    this.afs.collection('symptoms').doc(id).set(
      {
        name: name,
        description: description,
      }
    );
    if(file){
      this.uploadImg(id, file);
    }

 }

 updateSymptoms(symptoms: Symptoms, id: string, file: File){
    this.symptomsCollection.doc<Symptoms>(id).update(Object.assign({}, symptoms));
    if(file){
      this.uploadImg(id, file);
    }
 }

 deleteSymptoms(id: string, filePath: string){
    this.symptomsCollection.doc<Symptoms>(id).delete();
    if(filePath){
      this.removerImg(id, filePath, false);
    }

 }

 uploadImg(id: string, file: File){
  // /symptoms/id/file.name

   const filePath = `symptoms/${id}/${file.name}`;
   const ref = this.storage.ref(filePath);
   const taks = ref.put(file);
   taks.snapshotChanges().pipe(
     finalize( ()=> {
       ref.getDownloadURL().subscribe( (url: any) => {
         this.symptomsCollection.doc<Symptoms>(id).update({ imgUrl: url, filePath: filePath })
       })
     })
   ).subscribe();
}

removerImg(id: string, filePath: string, atualizarSymptoms: boolean = true){
   const ref = this.storage.ref(filePath);
   ref.delete();
   if(atualizarSymptoms){
     this.symptomsCollection.doc<Symptoms>(id).update({ imgUrl: '', filePath: ''});
   }
}


}

