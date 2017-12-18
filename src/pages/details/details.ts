import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {

  id: string;
  question: string[];
  answers: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }

  loadQuestion(id) {
    var loading = super.showLoading(this.loadingCtrl, '加载中...');
    this.rest.getQuestion(id)
      .subscribe(
      q => {
        this.question = q;
        console.log(q);
        this.answers = q['Answers'];
      },
      error => this.errorMessage = <any>error);
  }

}
