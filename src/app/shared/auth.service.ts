import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { UsersAgentesaude } from './../users/shared/users-agentesaude';
import { UsersPaciente } from './../users/shared/users-paciente';
import { Login } from './../users/shared/login';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: string;
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { }


  login(login: Login){
    return this.afa.signInWithEmailAndPassword(login.email, login.password)
  }

  logout(){
    this.afa.signOut();
    this.router.navigate(['/login']);
  }

  registerPaciente(user: UsersPaciente){
    this.afa.signOut();
    this.afa.createUserWithEmailAndPassword(user.email, user.password);


    // this.afa.onAuthStateChanged((users)=>{
    //   users.updateProfile({displayName: user.name, photoURL: ''});
    //   if(users){
    //     this.registerUserPaciente(user, users.uid);
    //   }
    // })
  }

  registerUserPaciente(user: UsersPaciente, id: string){
    const { name,
      email,
      cartaosus,
      faixaetaria,
      tiposanguineo,
      datanascimento,
      celular,
      comorbidades,
      zipcode,
      address,
      address_district,
      address_number,
      address_city,
      address_state,
      address_complement, } = user;
    this.afs.collection('users').doc(id).set(
      {
        name: name,
        email: email,
        cartaosus: cartaosus,
        faixaetaria: faixaetaria,
        tiposanguineo: tiposanguineo,
        datanascimento: datanascimento,
        celular: celular,
        comorbidades: comorbidades,
        zipcode: zipcode,
        address: address,
        address_district: address_district,
        address_number: address_number,
        address_city: address_city,
        address_state: address_state,
        address_complement: address_complement
      }
    )
  }

      registerAgente(user: UsersAgentesaude){
        this.afa.createUserWithEmailAndPassword(user.email, user.password);

        this.afa.onAuthStateChanged((userProfile)=>{
          userProfile.updateProfile({displayName: user.name, photoURL: ''});
          if(userProfile){
            this.registerAgentesaude(user, userProfile.uid);
          }
        })
      }

  registerAgentesaude(user: UsersAgentesaude, id: string){
            const { tipousuario, name, email, registro, estado, id_professional, professional  } = user;
        this.afs.collection('users').doc(id).set(
          {
            tipousuario: tipousuario,
            name: name,
            email: email,
            registro: registro,
            estado: estado,
            id_professional: id_professional,
            professional: professional,
          }
        )
      }

  resetPassword(login: Login){
    this.afa.sendPasswordResetEmail(login.email);
  }
}
