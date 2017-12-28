import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { RestProvider } from '../../providers/rest/rest';
import { UserPage } from '../user/user';
import { UserdatalistPage } from '../userdatalist/userdatalist';
import { SettingsProvider } from '../../providers/settings/settings';

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
  selectedTheme: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public settings: SettingsProvider) {
    super();
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    // 关闭后的回调
    modal.onDidDismiss(() => {
      this.loadMorePage();
    });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
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

  goToDataList(type) {
    this.navCtrl.push(UserdatalistPage, { 'dataType': type });
  }

  goToUserPage() {
    this.navCtrl.push(UserPage);
  }

  toggleChangeTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

}
