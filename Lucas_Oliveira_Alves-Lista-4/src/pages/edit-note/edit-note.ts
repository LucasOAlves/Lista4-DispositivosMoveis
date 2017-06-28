import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider'

/**
 * Generated class for the EditNote page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNote {

  public userLogged;
  public postId='';

  //public note = {title:'',content:'',color:''};
  public note;
  public notes= [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebase: FirebaseProvider, public viewCrtl: ViewController) {
    this.userLogged = this.firebase.auth().currentUser;
    //this.postId = this.navParams.get('postId');
    this.note = this.navParams.get('note');

    if(this.userLogged){
      if(this.postId!=''){
        this.getNoteOfUser(this.postId);
      }
    }
  }

  getNoteOfUser(index){
    /*let path = this.userLogged.uid + '/notes/'+this.postId+'/';
    this.firebase.database().ref(path).once('value', (snapshot) =>{
      this.notes.push(snapshot.val());
    });
    this.note.title = this.notes[0].title;
    this.note.content = this.notes[0].content;
    this.note.color = this.notes[0].color;*/
  }

  editNote(){
    /*let path = this.userLogged.uid + '/notes/'+this.postId;
    this.firebase.database().ref(path).update({
        title: this.note.title,
        content: this.note.content,
        color: this.note.color
    }).then(()=>{
      this.viewCrtl.dismiss();
    });*/
    let path = this.userLogged.uid + '/notes/'+this.note.postId;
    let obj = {
      title: this.note.title,
      content: this.note.content,
      color: this.note.color,
      postId: this.note.postId
    };
    this.firebase.database().ref(path).update(obj).then(()=>this.viewCrtl.dismiss());
  }


  removeNote(){
    let path = this.userLogged.uid + '/notes/'+this.postId;
    this.firebase.database().ref(path).remove().then(()=>{
      this.viewCrtl.dismiss();
    });
  }
  closeModal(){
    this.viewCrtl.dismiss('deleted:false');
  }

}
