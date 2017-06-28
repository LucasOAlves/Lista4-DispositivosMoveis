import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider'
import { HomePage } from '../home/home';


/**
 * Generated class for the Notes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class Notes {

  //public notes={title:'', content:'', color:''}
  public notes=[];
  public userLogged;
  public postId;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public firebase: FirebaseProvider, public modalCrtl: ModalController) {
       this.getCurrentUser();
       if(this.userLogged){
          this.getNotesOfUser();
       }
  }

  getCurrentUser(){
    this.userLogged = this.firebase.auth().currentUser;
  }
  getNotesOfUser(){
    //Caminho ou referencia de onde queremos  recuperar os dados
    let path = this.userLogged.uid + '/notes';
    //Na referencia usamos o metodo on para esperar mudanças de valor
    this.firebase.database().ref(path).on('child_added', (snapshot) =>{
      //Então atribuimos o valor do snapshot  à lista de disciplinas
      this.notes.push(snapshot.val());
    });
    this.firebase.database().ref(path).on('child_changed', (snapshot) =>{
      for(let i=0;this.notes.length;i++){
        if(this.notes[i].postId == snapshot.val().postId){
          this.notes[i].title = snapshot.val().title;
          this.notes[i].content = snapshot.val().content;
          this.notes[i].color = snapshot.val().color;
          break;
        }
      }
    });
    this.firebase.database().ref(path).on('child_removed', (snapshot) =>{
      let index=0;
      for(let i=0;i<this.notes.length;i++){
        if(this.notes[i].postId == snapshot.val().postId){
          index = i;
          break;
        }
      }
      this.notes.splice(index,1);
    });
  }

  logout(){
    this.firebase.auth().signOut().then(()=>this.navCtrl.setRoot(HomePage));
  }

  addNote(){
    let modal = this.modalCrtl.create('ModalAddNote');
    modal.present();
  }

  editNote(note,i){
    /*let modal = this.modalCrtl.create('EditNote',{
      postId: postId
    });*/
    let modal = this.modalCrtl.create('EditNote',{
      note: note
    });
    modal.onDidDismiss((data)=>{
      if(data.deleted == 'true'){
        this.notes.splice(i,1);
      }
    });
    modal.present();
  }

}
