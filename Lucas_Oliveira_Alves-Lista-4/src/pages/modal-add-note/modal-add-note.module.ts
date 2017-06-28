import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddNote } from './modal-add-note';

@NgModule({
  declarations: [
    ModalAddNote,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddNote),
  ],
  exports: [
    ModalAddNote
  ]
})
export class ModalAddNoteModule {}
