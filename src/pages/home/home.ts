import { Component } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { QuestionPage } from '../question/question';
import { BaseUI } from '../../common/baseui';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {

  feeds: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad(){
    console.log("entryLoading");
    this.getFeeds();
  }

  goToQuestion() {
    var modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

  goToChat() {
    this.selectTab(2);
  }

  /**
   * 选定指定的Tab
   * 
   * @param {number} index 
   * @memberof HomePage
   */
  selectTab(index: number) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
  }

  getFeeds() {
    var loading = super.showLoading(this.loadingCtrl, '数据加载中...');
    this.rest.getFeeds()
      .subscribe(
      f => {
        this.feeds = f;
        loading.dismiss();
      },
      error => this.errorMessage = <any>error);
  }

  goToDetails(questionId) {
    this.navCtrl.push(DetailsPage, {id: questionId});
  }

}
