import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { UsersPaciente } from './../users/shared/users-paciente';
import { Login } from './../users/shared/login';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<UsersPaciente>;

  private user: string;
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.usersCollection = this.afs.collection<UsersPaciente>('users');

  }

  getById(id: string) { // buscar por Id
    return this.usersCollection.doc<UsersPaciente>(id).valueChanges();
  }
  login(login: Login){
    return this.afa.signInWithEmailAndPassword(login.email, login.password.toString())
  }

  logout(){
    this.afa.signOut();
    this.router.navigate(['/login']);
  }

  registerPaciente(user: UsersPaciente){
    this.afa.signOut();
    this.afa.createUserWithEmailAndPassword(user.email, user.password);


    this.afa.onAuthStateChanged((userProfile)=>{
      userProfile.updateProfile({displayName: user.name, photoURL: ''});
      if(userProfile){
        this.registerUserPaciente(user, userProfile.uid);
      }
    })
  }

  registerUserPaciente(user: UsersPaciente, id: string){
    const { name,
      email,
      cartaosus,
      faixaetaria,
      sexo,
      tiposanguineo,
      datanascimento,
      contato,
      comorbidades,
      zipcode,
      address,
      address_district,
      address_number,
      address_city,
      address_state,
      address_complement,
      tipousuario, } = user;
    this.afs.collection('users').doc(id).set(
      {
        name: name,
        email: email,
        cartaosus: cartaosus,
        faixaetaria: faixaetaria,
        sexo: sexo,
        tiposanguineo: tiposanguineo,
        datanascimento: datanascimento,
        contato: contato,
        comorbidades: comorbidades,
        zipcode: zipcode,
        address: address,
        address_district: address_district,
        address_number: address_number,
        address_city: address_city,
        address_state: address_state,
        address_complement: address_complement,
        tipousuario: tipousuario
      }
    )
  }

  resetPassword(login: Login){
    this.afa.sendPasswordResetEmail(login.email);
  }
}
