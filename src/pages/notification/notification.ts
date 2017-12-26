import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { DetailsPage } from '../details/details';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

  errorMessage: any;
  notificationList: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');

    this.storage.get('UserId').then(val => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getUserNotifications(val)
          .subscribe(
          n => {
            this.notificationList = n;
            console.log("note");
            console.log(n);
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error);
      }
    })
  }

  goToDetails(questionId) {
    this.navCtrl.push(DetailsPage, {id: questionId});    
  }

}
