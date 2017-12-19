import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage/dist/storage';
import { DetailsPage } from '../details/details';

/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {

  questions: string[];
  errorMessage: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoveryPage');
    this.getQuestions();
  }

  getQuestions() {
    var loading = super.showLoading(this.loadingCtrl, '数据加载中...');
    this.rest.getQuestions()
      .subscribe(
      q => {
        this.questions = q;
        loading.dismiss();
      },
      error => this.errorMessage = <any>error);
  }

  doRefresh(refresher) {
    this.getQuestions();
    refresher.complete();
  }  

  goToDetail(questionId) {
    this.navCtrl.push(DetailsPage, {id: questionId});
  }

}
