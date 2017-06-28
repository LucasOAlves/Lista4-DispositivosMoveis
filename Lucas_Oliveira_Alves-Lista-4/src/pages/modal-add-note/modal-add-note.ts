import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider'


/**
 * Generated class for the ModalAddNote page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-add-note',
  templateUrl: 'modal-add-note.html',
})
export class ModalAddNote {

  note={title:'',content:'',color:''};
  public userLogged;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public modalCrtl: ModalController, public viewCrtl: ViewController, public firebase: FirebaseProvider) {
       this.userLogged = this.firebase.auth().currentUser;
  }

  addNewNote(){
    //Caminho ou referencia de onde queremos gravar os dados
    let postId = this.firebase.database().ref().child('/notes').push().key;
    let path = this.userLogged.uid + '/notes/' + postId;
    //O objeto que queros gravar
    let objct = {
      title: this.note.title,
      content: this.note.content,
      color: this.note.color,
      postId: postId
    };
    //Chamada da função que ira adicionar a nota no banco
    this.firebase.database().ref(path).set(objct);
    this.closeModal();
  }

  closeModal(){
    this.viewCrtl.dismiss();
  }

}
