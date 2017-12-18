import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { QuestionPage } from '../question/question';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController) {

  }

  goToQuestion() {
    var modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

}
