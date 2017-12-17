import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { RestProvider } from '../../providers/rest/rest';
import { UserPage } from '../user/user';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;
  headface: string;
  userinfo: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    // 关闭后的回调
    modal.onDidDismiss(() => {
      this.loadMorePage();
    });
    modal.present();
  }

  ionViewDidEnter() {
    this.loadMorePage();
  }

  loadMorePage() {
    this.storage.get('UserId').then(val => {
      if (val != null) {
        // 加载用户数据
        var loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getUserInfo(val)
          .subscribe(
          userinfo => {
            this.userinfo = userinfo;
            this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf();
            this.notLogin = false;
            this.logined = true;
            loading.dismiss();
          }
          );
      } else {
        this.notLogin = true;
        this.logined = false;
      }
    })
  }

  goToUserPage() {
    this.navCtrl.push(UserPage);
  }

}
