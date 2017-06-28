import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user = {email:'', password:''};
  constructor(public navCtrl: NavController, public firebase: FirebaseProvider) {

  }

  register(){
    //Checa se os dados não estão vazios
    if(this.user.email != '' && this.user.password!=''){
      //Tenta criar o cadastro
      this.firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
        //Retorna um erro se não conseguir criar o usuário
        .catch((error)=>{console.log(error.message)});
    }
  }
  login(){
    //Checa se os dados não estão vazios
    if(this.user.email != '' && this.user.password !=''){
      // Tenta logar com os dados do usuário
      this.firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      //Retorna um errro se nao consegur criar o usuario
      .catch((error)=>{console.log(error.message)});
    }
  }

}
