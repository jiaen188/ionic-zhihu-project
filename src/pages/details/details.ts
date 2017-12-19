import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AnswerPage } from '../answer/answer';

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
  isFavourite: boolean;
  userId: string;
  isMyQuestion: boolean;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage,
  public modalCtrl: ModalController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }

  loadQuestion(id) {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
        var loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getQuestionWithUser(id, val)
          .subscribe(
          q => {
            loading.dismissAll();
            this.question = q;
            this.answers = q['Answers'];
            this.isFavourite = q['IsFavourite'];
            this.isMyQuestion = (q['OwnUserId'] == val);
          },
          error => this.errorMessage = <any>error);
      }
    });
  }

  saveFavourite() {
    var loading = super.showLoading(this.loadingCtrl, '请求中...');
    this.rest.saveFavourite(this.id, this.userId)
      .subscribe(
      f => {
        if (f['Status'] == 'OK') {
          loading.dismiss();
          super.showToast(this.toastCtrl, this.isFavourite ? '取消关注成功' : '关注问题成功');
          this.isFavourite = !this.isFavourite;
        }
      }
      )
  }

  showAnswerPage() {
    let modal = this.modalCtrl.create(AnswerPage, {id: this.id});
    // 关闭后的回调
    modal.onDidDismiss(() => {
      this.loadQuestion(this.id);
    });
    modal.present();
  }

}
